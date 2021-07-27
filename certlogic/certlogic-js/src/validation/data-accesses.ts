import { CertLogicExpression } from "../typings"


const gatherFrom = (expr: CertLogicExpression): string[] => {
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).flatMap(gatherFrom)
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        const operator = keys[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return [ values ]
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = values
            return [ ...gatherFrom(guard), ...gatherFrom(then), ...gatherFrom(else_) ]
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return values.flatMap(gatherFrom)
        }
        if (operator === "!") {
            return gatherFrom(values[0])
        }
        if (operator === "plusTime") {
            return gatherFrom(values[0])
        }
        if (operator === "reduce") {
            return [ /* operand: */...gatherFrom(values[0]), /* initial: */...gatherFrom(values[2]) ]
        }
        throw new Error(`operator not recognised by fields gatherer ("gatherFields") in certlogic-js/validation/${__filename}: "${operator}"`)
    }
    return []
}


/**
 * Compute which data accesses can be performed by the given CertLogic expression.
 * @param expr A CertLogic expression.
 */
export const dataAccesses = (expr: CertLogicExpression) => [ ...new Set(gatherFrom(expr)) ].sort()

