import {CertLogicExpression, evaluate, isInt} from "certlogic-js"
import {boolsiness} from "certlogic-js/dist/internals"


export const hasConstantValue = (expr: CertLogicExpression): boolean => {
    if (typeof expr === "string" || isInt(expr) || typeof expr === "boolean") {
        return true
    }
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).every(hasConstantValue)
    }
    if (typeof expr === "object") {
        const operator = (Object.keys(expr))[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return false
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = values
            if (hasConstantValue(guard)) {
                const evalGuard = evaluate(guard, undefined)
                switch (boolsiness(evalGuard)) {
                    case true: return hasConstantValue(then)
                    case false: return hasConstantValue(else_)
                    default: return false   // <==> evaluation throws error
                }
            }
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return values.every(hasConstantValue)
        }
        if (operator === "!") {
            return hasConstantValue(values[0])
        }
        if (operator === "plusTime") {
            return hasConstantValue(values[0])
        }
        if (operator === "reduce") {
            return hasConstantValue(values[0]) && hasConstantValue(values[2])
        }
        if (operator === "extractFromUVCI") {
            return hasConstantValue(values[0])
        }
    }
    // fall-back:
    return false
}

