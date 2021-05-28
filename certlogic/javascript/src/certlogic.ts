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


const op2binOp: { [op: string]: (l: any, r: any) => any } = {
    "===": (l: any, r: any) => l === r,
    // no "and": handled separately
    "<": (l: number, r: number) => l < r,
    ">": (l: number, r: number) => l > r,
    "<=": (l: number, r: number) => l <= r,
    ">=": (l: number, r: number) => l >= r,
    "in": (l: string, r: any) => {
        if (!Array.isArray(r)) {
            throw new Error(`right-hand side of "in" operation must be an array`)
        }
        return r.indexOf(l) > -1
    },
    "+": (l: any, r: any) => l + r
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
            if (data === null) {
                return null
            }
            if (typeof args === "string") {
                if (args === "") {  // "it"
                    return data
                }
                return args.split(".").reduce((acc, current) => {
                    if (acc === null) {
                        return null
                    }
                    const index = parseInt(current, 10)
                    const value = isNaN(index) ? acc[current] : acc[index]
                    return value === undefined ? null : value
                }, data)
            }
            throw new Error(`not of the form { "var": "<path>" }`)
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = args
            const evalGuard = evaluate(guard, data)
            if (isTruthy(evalGuard)) {
                return evaluate(then, data)
            }
            if (isFalsy(evalGuard)) {
                return evaluate(else_, data)
            }
            throw new Error(`if-guard evaluates to something neither truthy, nor falsy: ${evalGuard}`)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+" ].indexOf(operator) > -1) {
            const evalArg = (index: number) => evaluate(args[index], data)
            const opFunc = op2binOp[operator]
            switch (operator) {
                case "===":
                case "in":
                case "+": return opFunc(evalArg(0), evalArg(1))
                case "and": return args.reduce((acc: any, current: CertLogicExpression) => acc && evaluate(current, data), true)
                case ">":
                case "<":
                case ">=":
                case "<=": {
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
        if (operator === "!") {
            const operand = evaluate(args[0], data)
            if (isFalsy(operand)) {
                return true
            }
            if (isTruthy(operand)) {
                return false
            }
            throw new Error(`operand of ! evaluates to something neither truthy, nor falsy: ${operand}`)
        }
        if (operator === "plusDays") {
            const dateStr = evaluate(args[0], data)
            const nDays = evaluate(args[1], data)
            const date = new Date(dateStr)
            date.setDate(date.getDate() + nDays)
            return date
        }
        if (operator === "reduce") {
            const evalOperand = evaluate(args[0], data)
            const evalInitial = () => evaluate(args[2], data)
            if (evalOperand === null) {
                return evalInitial()
            }
            if (!Array.isArray(evalOperand)) {
                throw new Error(`operand of reduce evaluated to a non-null non-array`)
            }
            return (evalOperand as any[])
                .reduce(
                    (accumulator, current) => evaluate(args[1], { accumulator, current /* (patch:) , data */ }),
                    evalInitial()
                )
        }
        throw new Error(`unrecognised operator: "${operator}"`)
    }
    throw new Error(`invalid CertLogic expression: ${expr}`)
}


// export const validate = (expr: any) => ???
// TODO  write validator that checks a given JSON value whether it's valid as a CertLogic expression, wrapping every value in an object which details issues, type, etc.

