import { CertLogicExpression, CertLogicOperation } from "../typings"
import { if_ } from "../factories"


export const or_ = (operands: CertLogicExpression[]): CertLogicExpression => {
    switch (operands.length) {
        case 0: return true
        case 1: return operands[0]
        default: {
            const [head, ...rest] = operands
            return if_(head, head, or_(rest))
        }
    }
}


/**
 * Desugars the given “extended” CertLogic expression to an “official” CertLogic expression.
 * That means:
 *      any `or` operation is rephrased in terms of `if` operations using the equivalence: `desugar(P or Q) === if(P, P, desugar(Q))`.
 * In other words: the first truthy operand is returned, or the last operand (which is then falsy).
 * This is semantically in line with the `and` operation.
 */
export const desugar = (expr: any): CertLogicExpression => {
    if (Array.isArray(expr)) {
        return expr.map(desugar)
    }
    if (typeof expr === "object" && Object.entries(expr).length === 1) {
        const [ operator, operands ] = Object.entries(expr)[0] as [ string, CertLogicExpression[] ]
        switch (operator) {
            case "or": return or_(operands.map(desugar))
            case "var": return expr
            default: return { [operator]: operands.map(desugar) } as CertLogicOperation
        }
    }
    return expr
}

