import { isInt } from "certlogic-js"

import { ValidationError } from "./typings"


const validateVar = (expr: any, args: any): ValidationError[] => {
    if (typeof args !== "string") {
        return [ { expr, message: `not of the form { "var": "<path>" }` } ]
    }
    const path = args
    return (path === "" || path.match(/^((\w[\w\d-]*)|\d+)(\.((\w[\w\d-]*)|\d+))*$/))
        ? []
        : [ { expr, message: `data access path doesn't have a valid format: ${path}` } ]
}


const validateIf = (expr: any, args: any[]): ValidationError[] => {
    const errors = []
    if (args.length !== 3) {
        errors.push({ expr, message: `an "if"-operation must have exactly 3 values/operands, but it has ${args.length}` })
    }
    errors.push(...args.slice(0, 3).flatMap(validate))
    return errors
}

const validateBinOp = (expr: any, operator: string, args: any[]): ValidationError[] => {
    const errors = []
    let maxOperands = 2
    switch (operator) {
        case "and": {
            if (args.length < 2) {
                errors.push({ expr, message: `an "and" operation must have at least 2 operands, but it has ${args.length}` })
            }
            break
        }
        case "<":
        case ">":
        case "<=":
        case ">=": {
            maxOperands = 3
            if (args.length < 2 || args.length > 3) {
                errors.push({ expr, message: `an operation with operator "${operator}" must have 2 or 3 operands, but it has ${args.length}` })
            }
            break
        }
        default: {
            if (args.length !== 2) {
                errors.push({ expr, message: `an operation with operator "${operator}" must have 2 operands, but it has ${args.length}` })
            }
            break
        }
    }
    errors.push(...args.slice(0, maxOperands).flatMap(validate))
    return errors
}

const validateNot = (expr: any, args: any[]): ValidationError[] => {
    return args.length === 1
        ? validate(args[0])
        : [ { expr, message: `a !-operation (logical not/negation) must have exactly 1 operand, but it has ${args.length}` } ]
}

const validatePlusTime = (expr: any, args: any[]): ValidationError[] => {
    const errors = []
    if (args.length !== 3) {
        errors.push({ expr, message: `a "plusTime"-operation must have exactly 3 values/operands, but it has ${args.length}` })
    }
    if (args[0] !== undefined) {
        errors.push(...validate(args[0]))
    }
    if (args[1] !== undefined && !isInt(args[1])) {
        errors.push({ expr, message: `"amount" argument (#2) of "plusTime" must be an integer, but it is: ${args[1]}` })
    }
    if (args[2] !== undefined && [ "day", "hour" ].indexOf(args[2]) === -1) {
        throw new Error(`"unit" argument (#3) of "plusTime" must be a string 'day' or 'hour', but it is: ${args[2]}`)
    }
    return errors
}

const validateReduce = (expr: any, args: any[]): ValidationError[] => {
    const errors = []
    if (args.length !== 3) {
        errors.push({ expr, message: `a "reduce"-operation must have exactly 3 values/operands, but it has ${args.length}` })
    }
    errors.push(...args.slice(0, 3).flatMap(validate))
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
        const args = (expr as any)[operator]
        if (operator === "var") {
            return validateVar(expr, args)
        }
        if (!(Array.isArray(args) && args.length > 0)) {
            return withError(`operation not of the form { "<operator>": [ <args...> ] }`)
        }
        if (operator === "if") {
            return validateIf(expr, args)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+" ].indexOf(operator) > -1) {
            return validateBinOp(expr, operator, args)
        }
        if (operator === "!") {
            return validateNot(expr, args)
        }
        if (operator === "plusTime") {
            return validatePlusTime(expr, args)
        }
        if (operator === "reduce") {
            return validateReduce(expr, args)
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

