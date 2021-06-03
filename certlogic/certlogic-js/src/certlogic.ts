/*
 * CertLogic is specified subset of JsonLogic, where necessary extended with custom operations - e.g. for correct handling of dates.
 */

/**
 * Type definition for CertLogic expressions.
 */
export type CertLogicExpression =
    | { "var": string }
    | { "if": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "===": [ CertLogicExpression, CertLogicExpression ] }
    | { "and": CertLogicExpression[] }
    | { "<": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "<=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "in": [ CertLogicExpression, CertLogicExpression ] }
    | { "+": [ CertLogicExpression, CertLogicExpression ] }
    | { "!": [ CertLogicExpression ] }
    | { "plusTime": [ CertLogicExpression, number, TimeUnit ] }
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | boolean
    | number    // ...which should be an integer...
    | string
    | null
    | CertLogicExpression[]

export type TimeUnit = "day" | "hour"

/**
 * @returns whether the given `value` is considered *falsy* by CertLogic.
 * Note: the notions of both falsy and truthy are narrower than those of JavaScript, and even of JsonLogic.
 * Truthy and falsy values can be used for conditional logic, e.g. the guard of an `if`-expression.
 * Values that are neither truthy nor falsy (many of which exist) can't be used for that.
 */
export const isFalsy = (value: any) => value === false || value === null
/**
 * @returns whether the given `value` is considered *truthy* by CertLogic.
 * @see isFalsy
 */
export const isTruthy = (value: any) => value === true || (Array.isArray(value) ? value.length > 0 : (typeof value === "object" && value !== null))


const isInt = (value: any): value is number => typeof value === "number" && Number.isInteger(value)
const isDate = (value: any): value is Date => typeof value === "object" && "toISOString" in value


const evaluateVar = (args: any, data: any): any => {
    if (data === null) {
        return null
    }
    if (typeof args !== "string") {
        throw new Error(`not of the form { "var": "<path>" }`)
    }
    const path = args
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

const compare = (operator: ComparisonOperator, args: Comparable[]): boolean => {
    const compFunc = compareFunctionFor(operator)
    switch (args.length) {
        case 2: return compFunc(args[0], args[1])
        case 3: return compFunc(args[0], args[1]) && compFunc(args[1], args[2]!)
        default: throw new Error(`invalid number of operands to a "${operator}" operation`)
    }
}

const evaluateBinOp = (operator: string, args: CertLogicExpression[], data: any): any => {
    switch (operator) {
        case "and": {
            if (args.length < 2) throw new Error(`an \"and\" operation must have at least 2 operands`)
            break
        }
        case "<":
        case ">":
        case "<=":
        case ">=": {
            if (args.length < 2 || args.length > 3) throw new Error(`an operation with operator \"$operator\" must have 2 or 3 operands`)
            break
        }
        default: {
            if (args.length !== 2) throw new Error(`an operation with operator \"$operator\" must have 2 operands`)
            break
        }
    }
    const evalArgs = args.map((arg) => evaluate(arg, data))
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
        case "and": return args.reduce(
            (acc: any, current: CertLogicExpression) => isFalsy(acc) ? acc : evaluate(current, data),
            true
        )
        case "<":
        case ">":
        case "<=":
        case ">=": {
            if (isInt(evalArgs[0])) {
                if (evalArgs.some((arg) => !isInt(arg))) {
                    throw new Error(`all operands must have the same type`)
                }
            }
            if (isDate(evalArgs[0])) {
                if (evalArgs.some((arg) => !isDate(arg))) {
                    throw new Error(`all operands must have the same type`)
                }
            }
            return compare(operator, evalArgs)
        }
        default: throw new Error(`unhandled binary operator "${operator}"`)
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


export const plusTime = (dateTimeStr: string, amount: number, unit: TimeUnit): Date => {
    const dateTime = new Date(dateTimeStr)
    if (unit === "day") {
        dateTime.setDate(dateTime.getDate() + amount)
    } else if (unit === "hour") {
        dateTime.setHours(dateTime.getHours() + amount)
    }
    return dateTime
}

const evaluatePlusTime = (dateOperand: CertLogicExpression, amount: CertLogicExpression, unit: TimeUnit, data: any): Date => {
    if (!isInt(amount)) {
        throw new Error(`"amount" argument (#2) of "plusTime" must be an integer`)
    }
    if ([ "day", "hour" ].indexOf(unit) === -1) {
        throw new Error(`"unit" argument (#3) of "plusTime" must be a string 'day' or 'hour'`)
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
    if (typeof expr === "string" || isInt(expr) || typeof expr === "boolean" || expr === null) {
        return expr
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
        const args = (expr as any)[operator]
        if (operator === "var") {
            return evaluateVar(args, data)
        }
        if (!(Array.isArray(args) && args.length > 0)) {
            throw new Error(`operation not of the form { "<operator>": [ <args...> ] }`)
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = args
            return evaluateIf(guard, then, else_, data)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+" ].indexOf(operator) > -1) {
            return evaluateBinOp(operator, args, data)
        }
        if (operator === "!") {
            return evaluateNot(args[0], data)
        }
        if (operator === "plusTime") {
            return evaluatePlusTime(args[0], args[1], args[2], data)
        }
        if (operator === "reduce") {
            return evaluateReduce(args[0], args[1], args[2], data)
        }
        throw new Error(`unrecognised operator: "${operator}"`)
    }
    throw new Error(`invalid CertLogic expression: ${expr}`)
}

