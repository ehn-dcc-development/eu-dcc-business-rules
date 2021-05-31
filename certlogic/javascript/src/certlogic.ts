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
    | { "plusDays": [ CertLogicExpression, CertLogicExpression ] }
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | boolean
    | number    // ...which should be an integer...
    | string
    | null
    | CertLogicExpression[]


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

const isDate = (value: any): value is Date => typeof value === "object" && "toISOString" in value
const isComparable = (value: any): value is Comparable => typeof value === "number" || isDate(value)

const withComparables = (opFunc: (l: Comparable, r: Comparable) => boolean) => (l: any, r: any) => {
    if (!isComparable(l) || !isComparable(r)) {
        throw new Error(`operands of this operation must both be comparable`)
    }
    return opFunc(l, r)
}

const op2binOp: { [op: string]: (l: any, r: any) => boolean } = {
    "<": withComparables((l, r) => l < r),
    ">": withComparables((l, r) => l > r),
    "<=": withComparables((l, r) => l <= r),
    ">=": withComparables((l, r) => l >= r),
}

const evaluateBinOp = (operator: string, args: CertLogicExpression[], data: any): any => {
    const evalArg = (index: number) => evaluate(args[index], data)
    switch (operator) {
        case "===": return evalArg(0) === evalArg(1)
        case "in": {
            const r = evalArg(1)
            if (!Array.isArray(r)) {
                throw new Error(`right-hand side of "in" operation must be an array`)
            }
            return r.indexOf(evalArg(0)) > -1
        }
        case "+": {
            const l = evalArg(0)
            const r = evalArg(1)
            if (typeof l !== "number" || typeof r !== "number") {
                throw new Error(`operands of this operation must both be numbers`)
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
            const opFunc = op2binOp[operator]
            if (args.length === 2) {
                return opFunc(evalArg(0), evalArg(1))
            } else if (args.length === 3) {
                const evalMiddleArg = evalArg(1)
                return opFunc(evalArg(0), evalMiddleArg) && opFunc(evalMiddleArg, evalArg(2))
            }
            throw new Error(`invalid number of operands to "${operator}" operation`)
        }
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


const evaluatePlusDays = (dateOperand: CertLogicExpression, nDays: number, data: any): Date => {
    const date = new Date(evaluate(dateOperand, data))
    date.setDate(date.getDate() + nDays)
    return date
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
    if (typeof expr === "string" || typeof expr === "number" || typeof expr === "boolean" || expr === null) {
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
        if (operator === "plusDays") {
            return evaluatePlusDays(args[0], args[1], data)
        }
        if (operator === "reduce") {
            return evaluateReduce(args[0], args[1], args[2], data)
        }
        throw new Error(`unrecognised operator: "${operator}"`)
    }
    throw new Error(`invalid CertLogic expression: ${expr}`)
}

