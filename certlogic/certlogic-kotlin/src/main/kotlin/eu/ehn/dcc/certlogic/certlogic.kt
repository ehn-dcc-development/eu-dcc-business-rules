package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*


internal fun evaluateVar(args: JsonNode, data: JsonNode): JsonNode {
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
    return when (boolsiness(evalGuard)) {
        true -> evaluate(then, data)
        false -> evaluate(else_, data)
        null -> throw RuntimeException("if-guard evaluates to something neither truthy, nor falsy: $evalGuard")
    }
}


internal fun evaluateInfix(operator: String, args: ArrayNode, data: JsonNode): JsonNode {
    when (operator) {
        "and" -> if (args.size() < 2) throw RuntimeException("an \"and\" operation must have at least 2 operands")
        "<", ">", "<=", ">=", "after", "before", "not-after", "not-before" -> if (args.size() < 2 || args.size() > 3) throw RuntimeException("an operation with operator \"$operator\" must have 2 or 3 operands")
        else -> if (args.size() != 2) throw RuntimeException("an operation with operator \"$operator\" must have 2 operands")
    }
    val evalArgs = args.map { arg -> evaluate(arg, data) }
    return when (operator) {
        "===" -> BooleanNode.valueOf(evalArgs[0] == evalArgs[1])
        "in" -> {
            val r = evalArgs[1]
            if (r !is ArrayNode) {
                throw RuntimeException("right-hand side of an \"in\" operation must be an array")
            }
            BooleanNode.valueOf(r.contains(evalArgs[0]))
        }
        "+" -> {
            val l = evalArgs[0]
            val r = evalArgs[1]
            if (l !is IntNode || r !is IntNode) {
                throw RuntimeException("operands of a "+" operator must both be integers")
            }
            IntNode.valueOf(evalArgs[0].intValue() + evalArgs[1].intValue())
        }
        "and" -> args.fold(BooleanNode.TRUE as JsonNode) { acc, current ->
            when (boolsiness(acc)) {
                false -> acc
                true -> evaluate(current, data)
                null -> throw RuntimeException("all operands of an \"and\" operation must be either truthy or falsy")
            }
        }
        "<", ">", "<=", ">=" -> {
            if (!evalArgs.all { it is IntNode }) {
                throw RuntimeException("all operands of a comparison operator must be of integer type")
            }
            BooleanNode.valueOf(
                compare(operator, evalArgs.map { (it as IntNode).intValue() })
            )
        }
        "after", "before", "not-after", "not-before" -> {
            if (!evalArgs.all { it is JsonDateTime }) {
                throw RuntimeException("all operands of a date-time comparsion must be date-times")
            }
            BooleanNode.valueOf(
                compare(comparisonOperatorForDateTimeComparison(operator), evalArgs.map { (it as JsonDateTime).temporalValue() })
           )
        }
        else -> throw RuntimeException("unhandled infix operator \"$operator\"")
    }
}


internal fun evaluateNot(operandExpr: JsonNode, data: JsonNode): JsonNode {
    val operand = evaluate(operandExpr, data)
    return when (boolsiness(operand)) {
        false -> BooleanNode.TRUE
        true -> BooleanNode.FALSE
        null -> throw RuntimeException("operand of ! evaluates to something neither truthy, nor falsy: $operand")
    }
}


private fun isTimeUnit(unit: JsonNode): Boolean {
    if (unit !is TextNode) return false
    return try {
        TimeUnit.valueOf(unit.textValue())
        true
    } catch (iae: IllegalArgumentException) {
        false
    }
}

internal fun evaluatePlusTime(dateOperand: JsonNode, amount: JsonNode, unit: JsonNode, data: JsonNode): JsonDateTime {
    if (amount !is IntNode) {
        throw RuntimeException("\"amount\" argument (#2) of \"plusTime\" must be an integer")
    }
    if (!isTimeUnit(unit)) {
        throw RuntimeException("\"unit\" argument (#3) of \"plusTime\" must be a string with one of the time units: ${TimeUnit.values().map { it.toString() }}")
    }
    val timeUnit = TimeUnit.valueOf(unit.textValue())
    val dateTimeStr = evaluate(dateOperand, data)
    if (dateTimeStr !is TextNode) {
        throw RuntimeException("date argument (#1) of \"plusTime\" must be a string")
    }
    return JsonDateTime.fromString(dateTimeStr.asText()).plusTime(amount.intValue(), timeUnit)
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


internal fun evaluateExtractFromUVCI(operand: JsonNode, index: JsonNode, data: JsonNode): JsonNode {
    val evalOperand = evaluate(operand, data)
    if (!(evalOperand is NullNode || evalOperand is TextNode)) {
        throw RuntimeException("\"UVCI\" argument (#1) of \"extractFromUVCI\" must be either a string or null")
    }
    if (index !is IntNode) {
        throw RuntimeException("\"index\" argument (#2) of \"extractFromUVCI\" must be an integer")
    }
    val result = extractFromUVCI(if (evalOperand is TextNode) evalOperand.asText() else null, index.intValue())
    return if (result == null) NullNode.instance else TextNode.valueOf(result)
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
                "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" -> evaluateInfix(operator, args, data)
                "!" -> evaluateNot(args[0], data)
                "plusTime" -> evaluatePlusTime(args[0], args[1], args[2], data)
                "reduce" -> evaluateReduce(args[0], args[1], args[2], data)
                "extractFromUVCI" -> evaluateExtractFromUVCI(args[0], args[1], data)
                else -> throw RuntimeException("unrecognised operator: \"$operator\"")
            }
        }
    }
    else -> throw RuntimeException("invalid CertLogic expression: $expr")
}

