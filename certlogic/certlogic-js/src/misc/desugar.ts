import { CertLogicExpression, CertLogicOperation } from "../typings"

const not = (expr: CertLogicExpression): CertLogicExpression => ({ "!": [ expr ] })

/**
 * Desugars the given “extended” CertLogic expression to an “official” CertLogic expression.
 * That means:
 *  * any `or` operation is rephrased in terms of `and` and `not` operations using [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws)
 */
export const desugar = (expr: any): CertLogicExpression => {
    if (Array.isArray(expr)) {
        return expr.map(desugar)
    }
    if (typeof expr === "object" && Object.entries(expr).length === 1) {
        const [ operator, operands ] = Object.entries(expr)[0]
        switch (operator) {
            case "or": return not({
                "and": (operands as any[]).map((operand: CertLogicExpression) => not(desugar(operand)))
            })
            case "var": return expr
            default: return { [operator]: (operands as any[]).map(desugar) } as CertLogicOperation
        }
    }
    return expr
}

