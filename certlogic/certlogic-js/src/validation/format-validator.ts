import { isInt } from "../internals"

import { ValidationError } from "./typings"


const validateVar = (expr: any, values: any): ValidationError[] => {
    if (typeof values !== "string") {
        return [ { expr, message: `not of the form { "var": "<path>" }` } ]
    }
    const path = values
    return (path === "" || path.match(/^([^\.]+?)(\.[^\.]+?)*$/))
        ? []
        : [ { expr, message: `data access path doesn't have a valid format: ${path}` } ]
}


const validateIf = (expr: any, values: any[]): ValidationError[] => {
    const errors = []
    if (values.length !== 3) {
        errors.push({ expr, message: `an "if"-operation must have exactly 3 values/operands, but it has ${values.length}` })
    }
    errors.push(...values.slice(0, 3).flatMap(validate))
    return errors
}

const validateInfix = (expr: any, operator: string, values: any[]): ValidationError[] => {
    const errors = []
    let maxOperands = values.length
    switch (operator) {
        case "and": {
            if (values.length < 2) {
                errors.push({ expr, message: `an "and" operation must have at least 2 operands, but it has ${values.length}` })
            }
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
            maxOperands = 3
            if (values.length < 2 || values.length > 3) {
                errors.push({ expr, message: `an operation with operator "${operator}" must have 2 or 3 operands, but it has ${values.length}` })
            }
            break
        }
        default: {
            maxOperands = 2
            if (values.length !== 2) {
                errors.push({ expr, message: `an operation with operator "${operator}" must have 2 operands, but it has ${values.length}` })
            }
            break
        }
    }
    errors.push(...values.slice(0, maxOperands).flatMap(validate))
    return errors
}

const validateNot = (expr: any, values: any[]): ValidationError[] => {
    return values.length === 1
        ? validate(values[0])
        : [ { expr, message: `a !-operation (logical not/negation) must have exactly 1 operand, but it has ${values.length}` } ]
}

const validatePlusTime = (expr: any, values: any[]): ValidationError[] => {
    const errors = []
    if (values.length !== 3) {
        errors.push({ expr, message: `a "plusTime"-operation must have exactly 3 values/operands, but it has ${values.length}` })
    }
    if (values[0] !== undefined) {
        errors.push(...validate(values[0]))
    }
    if (values[1] !== undefined && !isInt(values[1])) {
        errors.push({ expr, message: `"amount" argument (#2) of "plusTime" must be an integer, but it is: ${values[1]}` })
    }
    if (values[2] !== undefined && [ "year", "month", "day", "hour" ].indexOf(values[2]) === -1) {  // FIXME  should be able to use certlogic-js.timeUnits!
        throw new Error(`"unit" argument (#3) of "plusTime" must be a string 'day' or 'hour', but it is: ${values[2]}`)
    }
    return errors
}

const validateReduce = (expr: any, values: any[]): ValidationError[] => {
    const errors = []
    if (values.length !== 3) {
        errors.push({ expr, message: `a "reduce"-operation must have exactly 3 values/operands, but it has ${values.length}` })
    }
    errors.push(...values.slice(0, 3).flatMap(validate))
    return errors
}

const validate = (expr: any): ValidationError[] => {
    const withError = (message: string): ValidationError[] => [ { expr, message } ]
    if (typeof expr === "string" || isInt(expr) || typeof expr === "boolean") {
        return []
    }
    if (typeof expr === "number") {
        return withError(`${expr} is a non-integer number`)
    }
    if (expr === null) {
        return withError(`invalid CertLogic expression`)
    }
    if (Array.isArray(expr)) {
        return (expr as any[]).flatMap(validate)
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        if (keys.length !== 1) {
            return withError(`expression object must have exactly one key, but it has ${keys.length}`)
        }
        const operator = keys[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return validateVar(expr, values)
        }
        if (!(Array.isArray(values) && values.length > 0)) {
            return withError(`operation not of the form { "<operator>": [ <values...> ] }`)
        }
        if (operator === "if") {
            return validateIf(expr, values)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return validateInfix(expr, operator, values)
        }
        if (operator === "!") {
            return validateNot(expr, values)
        }
        if (operator === "plusTime") {
            return validatePlusTime(expr, values)
        }
        if (operator === "reduce") {
            return validateReduce(expr, values)
        }
        return withError(`unrecognised operator: "${operator}"`)
    }
    return withError(`invalid CertLogic expression`)
}


/**
 * Validates the given JSON as a CertLogic expression in terms of its format.
 * This is similar to validating the JSON against a JSON Schema,
 * but this validation gives better, more accurate feedback.
 */
export const validateFormat = validate

