import { CertLogicExpression } from "certlogic-js"


const gatherFields = (expr: CertLogicExpression): string[] => {
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).flatMap(gatherFields)
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
            return [ ...gatherFields(guard), ...gatherFields(then), ...gatherFields(else_) ]
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return values.flatMap(gatherFields)
        }
        if (operator === "!") {
            return gatherFields(values[0])
        }
        if (operator === "plusTime") {
            return gatherFields(values[0])
        }
        if (operator === "reduce") {
            return [ /* operand: */...gatherFields(values[0]), /* initial: */...gatherFields(values[2]) ]
        }
        throw new Error(`operator not recognised by fields gatherer ("gatherFields") in certlogic-validation/${__filename}: "${operator}"`)
    }
    return []
}


export const affectedFields = (expr: CertLogicExpression) => [ ...new Set(gatherFields(expr)) ].sort()

