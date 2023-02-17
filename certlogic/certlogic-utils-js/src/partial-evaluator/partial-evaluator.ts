import {access} from "certlogic-js/dist/internals"

import {
    areEqual,
    compare,
    extBoolsiness,
    isCertLogicLiteral,
    isConstant
} from "./helpers"
import {CLExtExpr, CLUnknown, CLWrapped, wrapData} from "./extended-types"


const evaluateIf = (guard: CLExtExpr, then: CLExtExpr, else_: CLExtExpr, data: unknown): CLExtExpr => {
    const evalGuard = evaluate(guard, data)
    const evalThen = evaluate(then, data)
    const evalElse = evaluate(else_, data)
    switch (extBoolsiness(evalGuard)) {
        case true: return evalThen
        case false: return evalElse
        case undefined: return evalThen === true && evalElse === true
            ? true
            : { "if": [evalGuard, evalThen, evalElse] }
    }
    // TODO  many more cases are reducible!
}


const evaluateInfix = (operator: string, operands: CLExtExpr[], data: unknown): CLExtExpr => {
    const evalOperands = operands.map((arg) => evaluate(arg, data))
    const reducedCLExtExpr = { [operator]: evalOperands }
    // really use the operator to determine whether the evaluation can already be concluded, even if not all operands are constant or transformable back:
    switch (operator) {
        case "===":
        {
            const eq = areEqual(evalOperands[0], evalOperands[1])
            return eq === undefined
                ? { "===": [evalOperands[0], evalOperands[1]] }
                : eq
        }
        case "in":
        {
            const [l, items] = evalOperands
            if (!Array.isArray(items)) {
                throw new Error(`right-hand side of an "in" operation must be an array`)
            }
            const equalities = items.map((item) => areEqual(l, item))
            if (equalities.some((eq) => eq === true)) {
                return true
            }
            if (equalities.every((eq) => eq === false)) {
                return false
            }
            return { "in": [l, items.filter((_, index) => equalities[index] === undefined)] }
        }
        case "and":
        {
            const firstFalsy = evalOperands.find((operand) => extBoolsiness(operand) === false)
            if (firstFalsy !== undefined) {
                return firstFalsy
            }
            const unknowns = evalOperands.filter((operand) => extBoolsiness(operand) === undefined)
            switch (unknowns.length) {
                case 0: return true
                case 1: return unknowns[0]
                default: return { "and": unknowns }
            }
        }
        case ">":
        case "<":
        case ">=":
        case "<=":
        {
            const result = compare(operator, evalOperands[0], evalOperands[1])
            return result === undefined ? { [operator]: evalOperands } : result
        }
        case "+":
        {
            const [l, r] = evalOperands
            if (isCertLogicLiteral(l) && isCertLogicLiteral(r)) {
                // TODO  more validation
                return (l as number) + (r as number)
            }
            return reducedCLExtExpr
        }
        default:
        {
            // console.warn(`infix operator "${operator} not handled`)
            return reducedCLExtExpr
        }
    }
}


const evaluateNot = (operandExpr: CLExtExpr, data: unknown): CLExtExpr => {
    const evalOperand = evaluate(operandExpr, data)
    if (isConstant(evalOperand)) {
        const boolsiness = extBoolsiness(evalOperand)
        switch (boolsiness) {
            case true: return false
            case false: return true
            case undefined: throw new Error(`operand of ! evaluates to something neither truthy, nor falsy: ${evalOperand}`)
        }
    }
    return { "!": [evalOperand] }
}


// TODO  wrap a Date specifically, including its source
const evaluatePlusTime = (dateOperand: CLExtExpr, amount: CLExtExpr, unit: CLExtExpr, data: unknown): CLExtExpr => {
    const dateTimeStr = evaluate(dateOperand, data)
    return { "plusTime": [dateTimeStr, amount, unit] }
}


const evaluateReduce = (operand: CLExtExpr, lambda: CLExtExpr, initial: CLExtExpr, data: unknown): CLExtExpr => {
    const evalOperand = evaluate(operand, data)
    const evalInitial = evaluate(initial, data)
    if (evalOperand instanceof CLWrapped && evalOperand.value === null) {
        return evalInitial
    }
    if (!(Array.isArray(evalOperand))) {
        throw new Error(`operand of reduce evaluated to a non-null non-array`)
    }
    // even if neither are constant, the evaluation result could be constant, so check afterwards:
    const evaluation = (evalOperand as CLExtExpr[]) // (help type checking with an explicit cast)
        .reduce(
            (accumulator, current) =>
                evaluate(lambda, { accumulator, current /* (patch:) , data */ }),
            evalInitial
        )
    if (isConstant(evaluation)) {
        return evaluation
    }
    return { "reduce": [evalOperand, lambda, evalInitial] }
}


const evaluateExtractFromUVCI = (operand: CLExtExpr, index: CLExtExpr, data: unknown): CLExtExpr => {
    const evalOperand = evaluate(operand, data)
    if (!(typeof evalOperand === "string" || (evalOperand instanceof CLWrapped && evalOperand.value === null))) {
        throw new Error(`"UVCI" argument (#1) of "extractFromUVCI" must be either a string or null`)
    }
    return { "extractFromUVCI": [evalOperand, index] }
}


// TODO  wrap a Date specifically, including its source
const evaluateDccDateOfBirth = (operand: CLExtExpr, data: unknown): CLExtExpr => {
    const evalOperand = evaluate(operand, data)
    if (!(typeof evalOperand === "string")) {
        throw new Error(`operand of "dccDateOfBirth" must be a string`)
    }
    return { "dccDateOfBirth": [operand] }
}


const evaluate = (expr: CLExtExpr, data: unknown): CLExtExpr => {
    if (isCertLogicLiteral(expr) || expr instanceof CLUnknown || expr instanceof CLWrapped) {
        return expr
    }
    if (Array.isArray(expr)) {
        return expr.map((item) => evaluate(item, data))
    }
    if (typeof expr === "object") {
        const [operator, operands] = Object.entries(expr)[0]
        if (operator === "var") {
            const value = access(data, operands as string)
            if (value instanceof CLUnknown) {
                return expr
            }
            return wrapData(value)
        }
        switch (operator) {
            case "if": return evaluateIf(operands[0], operands[1], operands[2], data)
            case "===":
            case "and":
            case ">":
            case "<":
            case ">=":
            case "<=":
            case "in":
            case "+":
            case "after":
            case "before":
            case "not-after":
            case "not-before":
                return evaluateInfix(operator, operands, data)
            case "!": return evaluateNot(operands[0], data)
            case "plusTime": return evaluatePlusTime(operands[0], operands[1], operands[2], data)
            case "reduce": return evaluateReduce(operands[0], operands[1], operands[2], data)
            case "extractFromUVCI": return evaluateExtractFromUVCI(operands[0], operands[1], data)
            case "dccDateOfBirth": return evaluateDccDateOfBirth(operands[0], data)
        }
    }
    throw new Error(`can't handle this CLExtExpr: ${JSON.stringify(expr, null, 2)}`)
}

export const evaluatePartially = evaluate

