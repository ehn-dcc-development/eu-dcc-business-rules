import { CertLogicExpression, TimeUnit, timeUnits } from "./typings"
import { isDate, isFalsy, isInt, isTruthy, plusTime } from "./internals"


const evaluateVar = (value: any, data: any): any => {
    if (typeof value !== "string") {
        throw new Error(`not of the form { "var": "<path>" }`)
    }
    const path = value
    if (path === "") {  // "it"
        return data
    }
    return path.split(".").reduce((acc, fragment) => {
        if (acc === null) {
            return null
        }
        const index = parseInt(fragment, 10)
        const value = isNaN(index) ? acc[fragment] : acc[index]
        return value === undefined ? null : value
    }, data)
}


const evaluateIf = (guard: CertLogicExpression, then: CertLogicExpression, else_: CertLogicExpression, data: any): any => {
    if (guard === undefined) {
        throw new Error(`an if-operation must have a guard (argument #1)`)
    }
    if (then === undefined) {
        throw new Error(`an if-operation must have a then (argument #2)`)
    }
    if (else_ === undefined) {
        throw new Error(`an if-operation must have an else (argument #3)`)
    }
    const evalGuard = evaluate(guard, data)
    if (isTruthy(evalGuard)) {
        return evaluate(then, data)
    }
    if (isFalsy(evalGuard)) {
        return evaluate(else_, data)
    }
    throw new Error(`if-guard evaluates to something neither truthy, nor falsy: ${evalGuard}`)
}


type Comparable = number | Date

type ComparisonOperator = "<" | ">" | "<=" | ">="
const compareFunctionFor = (operator: ComparisonOperator) => (l: Comparable, r: Comparable): boolean => {
    switch (operator) {
        case "<": return l < r
        case ">": return l > r
        case "<=": return l <= r
        case ">=": return l >= r
    }
}

const compare = (operator: ComparisonOperator, values: Comparable[]): boolean => {
    const compFunc = compareFunctionFor(operator)
    switch (values.length) {
        case 2: return compFunc(values[0], values[1])
        case 3: return compFunc(values[0], values[1]) && compFunc(values[1], values[2]!)
        default: throw new Error(`invalid number of operands to a "${operator}" operation`)
    }
}

type DateTimeComparisonOperator = "after" | "before" | "not-after" | "not-before"
const comparisonOperatorForDateTimeComparison = (operator: DateTimeComparisonOperator) => {
    switch (operator) {
        case "after": return ">"
        case "before": return "<"
        case "not-after": return "<="
        case "not-before": return ">="
    }
}

const evaluateInfix = (operator: string, values: CertLogicExpression[], data: any): any => {
    switch (operator) {
        case "and": {
            if (values.length < 2) throw new Error(`an "and" operation must have at least 2 operands`)
            break
        }
        case "<":
        case ">":
        case "<=":
        case ">=":
        case "after":
        case "before":
        case "not-after":
        case "not-before": {
            if (values.length < 2 || values.length > 3) throw new Error(`an operation with operator "${operator}" must have 2 or 3 operands`)
            break
        }
        default: {
            if (values.length !== 2) throw new Error(`an operation with operator "${operator}" must have 2 operands`)
            break
        }
    }
    const evalArgs = values.map((arg) => evaluate(arg, data))
    switch (operator) {
        case "===": return evalArgs[0] === evalArgs[1]
        case "in": {
            const r = evalArgs[1]
            if (!Array.isArray(r)) {
                throw new Error(`right-hand side of an "in" operation must be an array`)
            }
            return r.indexOf(evalArgs[0]) > -1
        }
        case "+": {
            const l = evalArgs[0]
            const r = evalArgs[1]
            if (!isInt(l) || !isInt(r)) {
                throw new Error(`operands of this operation must both be integers`)
            }
            return l + r
        }
        case "and": return values.reduce(
            (acc: any, current: CertLogicExpression) => {
                if (isFalsy(acc)) {
                    return acc
                }
                if (isTruthy(acc)) {
                    return evaluate(current, data)
                }
                throw new Error(`all operands of an "and" operation must be either truthy or falsy`)
            },
            true
        )
        case "<":
        case ">":
        case "<=":
        case ">=": {
            if (!evalArgs.every(isInt)) {
                throw new Error(`all operands of a comparison operation must be of integer type`)
            }
            return compare(operator, evalArgs)
        }
        case "after":
        case "before":
        case "not-after":
        case "not-before": {
            if (!evalArgs.every(isDate)) {
                throw new Error(`all operands of a date-time comparison must be date-times`)
            }
            return compare(comparisonOperatorForDateTimeComparison(operator), evalArgs)
        }
        default: throw new Error(`unhandled infix operator "${operator}"`)
    }
}


const evaluateNot = (operandExpr: CertLogicExpression, data: any): any => {
    const operand = evaluate(operandExpr, data)
    if (isFalsy(operand)) {
        return true
    }
    if (isTruthy(operand)) {
        return false
    }
    throw new Error(`operand of ! evaluates to something neither truthy, nor falsy: ${operand}`)
}


const evaluatePlusTime = (dateOperand: CertLogicExpression, amount: CertLogicExpression, unit: TimeUnit, data: any): Date => {
    if (!isInt(amount)) {
        throw new Error(`"amount" argument (#2) of "plusTime" must be an integer`)
    }
    if (timeUnits.indexOf(unit) === -1) {
        throw new Error(`"unit" argument (#3) of "plusTime" must be a string with one of the time units: ${timeUnits.join(", ")}`)
    }
    const dateTimeStr = evaluate(dateOperand, data)
    if (typeof dateTimeStr !== "string") {
        throw new Error(`date argument of "plusTime" must be a string`)
    }
    return plusTime(dateTimeStr, amount, unit)
}


const evaluateReduce = (operand: CertLogicExpression, lambda: CertLogicExpression, initial: CertLogicExpression, data: any): any => {
    const evalOperand = evaluate(operand, data)
    const evalInitial = () => evaluate(initial, data)
    if (evalOperand === null) {
        return evalInitial()
    }
    if (!Array.isArray(evalOperand)) {
        throw new Error(`operand of reduce evaluated to a non-null non-array`)
    }
    return (evalOperand as any[])
        .reduce(
            (accumulator, current) => evaluate(lambda, { accumulator, current /* (patch:) , data */ }),
            evalInitial()
        )
}


export const evaluate = (expr: CertLogicExpression, data: any): any => {
    if (typeof expr === "string" || isInt(expr) || typeof expr === "boolean") {
        return expr
    }
    if (expr === null) {
        throw new Error(`invalid CertLogic expression: ${expr}`)
    }
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).map((item) => evaluate(item, data))
    }
    if (typeof expr === "object") { // That includes Date objects, but those have no keys, so are returned as-is.
        const keys = Object.keys(expr)
        if (keys.length !== 1) {
            throw new Error(`unrecognised expression object encountered`)
        }
        const operator = keys[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return evaluateVar(values, data)
        }
        if (!(Array.isArray(values) && values.length > 0)) {
            throw new Error(`operation not of the form { "<operator>": [ <values...> ] }`)
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = values
            return evaluateIf(guard, then, else_, data)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return evaluateInfix(operator, values, data)
        }
        if (operator === "!") {
            return evaluateNot(values[0], data)
        }
        if (operator === "plusTime") {
            return evaluatePlusTime(values[0], values[1], values[2], data)
        }
        if (operator === "reduce") {
            return evaluateReduce(values[0], values[1], values[2], data)
        }
        throw new Error(`unrecognised operator: "${operator}"`)
    }
    throw new Error(`invalid CertLogic expression: ${expr}`)
}

