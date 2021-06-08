import { CertLogicExpression } from "certlogic-js"


const gatherFieldsVar = (path: string): string[] => {
    const match = path.match(/\.?(\w+?)$/)
    return match ? [ match.groups![0] ] : []
}


const gatherFields = (expr: CertLogicExpression): string[] => {
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).flatMap(gatherFields)
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        const operator = keys[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return gatherFieldsVar(values as string)
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = values
            return [ ...gatherFields(guard), ...gatherFields(then), ...gatherFields(else_) ]
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+" ].indexOf(operator) > -1) {
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
    }
    return []
}


export const affectedFields = (expr: CertLogicExpression) => new Set(gatherFields(expr))

