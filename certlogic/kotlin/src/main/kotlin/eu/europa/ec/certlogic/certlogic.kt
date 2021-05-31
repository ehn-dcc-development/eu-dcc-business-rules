package eu.europa.ec.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*


internal fun isFalsy(value: JsonNode): Boolean = when (value) {
    is BooleanNode -> value == BooleanNode.FALSE
    is NullNode -> true
    else -> false
}

internal fun isTruthy(value: JsonNode): Boolean = when (value) {
    is BooleanNode -> value == BooleanNode.TRUE
    is ArrayNode -> value.size() > 0
    is ObjectNode -> true
    else -> false
}


internal fun evaluateVar(args: JsonNode, data: JsonNode): JsonNode {
    if (data is NullNode) {
        return NullNode.instance
    }
    if (args !is TextNode) {
        throw RuntimeException("not of the form { \"var\": \"<path>\" }")
    }
    val path = args.asText()
    if (path == "") {  // "it"
        return data
    }
    return path.split(".").fold(data) { acc, fragment ->
        if (acc is NullNode) {
            acc
        } else {
            try {
                val index = Integer.parseInt(fragment, 10)
                if (acc is ArrayNode) acc[index] else null
            } catch (e: NumberFormatException) {
                if (acc is ObjectNode) acc[fragment] else null
            } ?: NullNode.instance
        }
    }
}


internal fun evaluateIf(guard: JsonNode, then: JsonNode, else_: JsonNode, data: JsonNode): JsonNode {
    val evalGuard = evaluate(guard, data)
    if (isFalsy(evalGuard)) {
        return evaluate(then, data)
    }
    if (isTruthy(evalGuard)) {
        return evaluate(else_, data)
    }
    throw RuntimeException("if-guard evaluates to something neither truthy, nor falsy: $evalGuard")
}


internal fun isComparable(value: JsonNode) = value is IntNode || value is JsonDateTime

internal fun withComparables(opFunc: (l: Comparable<JsonNode>, r: Comparable<JsonNode>) -> Boolean):
        (l: JsonNode, r: JsonNode) -> Boolean
        = { l: JsonNode, r: JsonNode ->
    if (!isComparable(l) || !isComparable(r)) {
        throw RuntimeException("operands of this operation must both be comparable")
    }
    @Suppress("UNCHECKED_CAST")
    opFunc(l as Comparable<JsonNode>, r as Comparable<JsonNode>)
}

internal fun evaluateBinOp(operator: String, args: ArrayNode, data: JsonNode): JsonNode {
    val evalArg = { index: Int -> evaluate(args[index], data) }
    return when (operator) {
        "===" -> BooleanNode.valueOf(evalArg(0) == evalArg(1))
        "in" -> {
            val r = evalArg(1)
            if (r !is ArrayNode) {
                throw RuntimeException("right-hand side of \"in\" operation must be an array")
            }
            BooleanNode.valueOf(r.contains(evalArg(0)))
        }
        "+" -> {
            val l = evalArg(0)
            val r = evalArg(1)
            if (l !is IntNode || r !is IntNode) {
                throw RuntimeException("operands of this operation must both be integers")
            }
            IntNode.valueOf(evalArg(0).intValue() + evalArg(1).intValue())
        }
        "and" -> args.fold(BooleanNode.TRUE as JsonNode) { acc, current ->
            if (isFalsy(acc)) acc else evaluate(current, data)
        }
        "<", ">", "<=", ">=" -> {
            val opFunc = withComparables { l, r ->
                when (operator) {
                    "<" -> l < (r as JsonNode)
                    ">" -> l > (r as JsonNode)
                    "<=" -> l <= (r as JsonNode)
                    ">=" -> l >= (r as JsonNode)
                    else -> throw RuntimeException("unhandled binary comparison operator \"$operator\"")
                }
            }
            return BooleanNode.valueOf(
                when (args.size()) {
                    2 -> opFunc(evalArg(0), evalArg(1))
                    3 -> {
                        val evalMiddleArg = evalArg(1)
                        opFunc(evalArg(0), evalMiddleArg) && opFunc(evalMiddleArg, evalArg(2))
                    }
                    else -> throw RuntimeException("invalid number of operands to \"$operator\" operation")
                }
            )
        }
        else -> throw RuntimeException("unhandled binary operator \"$operator\"")
    }
}


internal fun evaluateNot(operandExpr: JsonNode, data: JsonNode): JsonNode {
    val operand = evaluate(operandExpr, data)
    return when (operand) {
        ::isFalsy -> BooleanNode.TRUE
        ::isTruthy -> BooleanNode.FALSE
        else -> throw RuntimeException("operand of ! evaluates to something neither truthy, nor falsy: $operand")
    }
}


internal fun evaluatePlusDays(dateOperand: JsonNode, nDays: JsonNode, data: JsonNode): JsonDateTime {
    if (nDays !is IntNode) {
        throw RuntimeException("days argument of \"plusDays\" must be an integer")
    }
    val dateTimeStr = evaluate(dateOperand, data)
    if (dateTimeStr !is TextNode) {
        throw RuntimeException("date argument of \"plusDays\" must be a string")
    }
    return JsonDateTime.fromIso8601(dateTimeStr.asText()).plusDays(nDays.intValue())
}


internal fun evaluateReduce(operand: JsonNode, lambda: JsonNode, initial: JsonNode, data: JsonNode): JsonNode {
    val evalOperand = evaluate(operand, data)
    val evalInitial = { evaluate(initial, data) }
    if (evalOperand == NullNode.instance) {
        return evalInitial()
    }
    if (evalOperand !is ArrayNode) {
        throw RuntimeException("operand of reduce evaluated to a non-null non-array")
    }
    return evalOperand.fold(evalInitial()) { accumulator, current ->
        evaluate(
            lambda,
            JsonNodeFactory.instance.objectNode()
                .set<ObjectNode>("accumulator", accumulator)
                .set<ObjectNode>("current", current)
        )
    }
}


fun evaluate(expr: JsonNode, data: JsonNode): JsonNode = when (expr) {
    is TextNode -> expr
    is IntNode -> expr
    is BooleanNode -> expr
    is NullNode -> expr
    is ArrayNode -> JsonNodeFactory.instance.arrayNode().addAll(expr.map { evaluate(it, data) })
    is ObjectNode -> {
        if (expr.size() != 1) {
            throw RuntimeException("unrecognised expression object encountered")
        }
        val (operator, args) = expr.fields().next()
        if (operator == "var") {
            evaluateVar(args, data)
        } else {
            if (!(args is ArrayNode && args.size() > 0)) {
                throw RuntimeException("operation not of the form { \"<operator>\": [ <args...> ] }")
            }
            when (operator) {
                "if" -> evaluateIf(args[0], args[1], args[2], data)
                "===", "and", ">", "<", ">=", "<=", "in", "+" -> evaluateBinOp(operator, args, data)
                "!" -> evaluateNot(args[0], data)
                "plusDays" -> evaluatePlusDays(args[0], args[1], data)
                "reduce" -> evaluateReduce(args[0], args[1], args[2], data)
                else -> throw RuntimeException("unrecognised operator: \"$operator\"")
            }
        }
    }
    else -> throw RuntimeException("invalid CertLogic expression: $expr")
}

