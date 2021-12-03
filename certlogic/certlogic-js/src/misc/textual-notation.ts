import { CertLogicExpression } from "../typings"


/**
 * Render the given CertLogic expression with a textual notation that's more compact than the JSON.
 * The text returned is a single-line string.
 *
 * Note that this notation isn't specified (at this time).
 * A CertLogic expression essentially is an AST, so it doesn't require to have the notion of operator precedence/priority.
 * For those reasons, the textual notation typically comes with plenty of pairs of parentheses that often would be superfluous in languages having a specified textual notation.
 */
export const renderAsCompactText = (expr: CertLogicExpression): string => {
    if (Array.isArray(expr)) {
        return `[ ${expr.map(renderAsCompactText).join(", ")} ]`
    }
    if (typeof expr === "object" && Object.entries(expr).length === 1) {
        const [ operator, operands ] = Object.entries(expr)[0]
        switch (operator) {
            case "var": return `/${operands}`
            case "if": return `if (${renderAsCompactText(operands[0])}) then (${renderAsCompactText(operands[1])}) else (${renderAsCompactText(operands[2])})`
            case "===":
            case "and":
            case ">":
            case "<":
            case ">=":
            case "<=":
            case "in":
            case "+":
            case "after":
            case "before":
            case "not-after":
            case "not-before":
                return operands.map(renderAsCompactText).map((r: CertLogicExpression) => `(${r})`).join(` ${operator} `)
            case "!": return `not (${renderAsCompactText(operands[0])})`
            case "plusTime": return `(${renderAsCompactText(operands[0])}) ${operands[1] >= 0 ? "+" : ""}${operands[1]} ${operands[2]}${Math.abs(operands[1]) === 1 ? "" : "s"}`
            case "reduce": return `(${renderAsCompactText(operands[0])}).reduce((current, accumulator) → ${renderAsCompactText(operands[1])}, ${renderAsCompactText(operands[2])})`
            case "extractFromUVCI": return `extract fragment ${operands[1]} from UVCI (${renderAsCompactText(operands[0])})`
        }
    }
    // ultimate fall-back:
    return JSON.stringify(expr, null, 2)
}

