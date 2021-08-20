import { CertLogicExpression, CertLogicOperation } from "../typings"


const gatherFrom = (expr: CertLogicExpression, parent?: CertLogicExpression): DataAccessWithContext[] => {
    const recurse = (subExpr: CertLogicExpression) => gatherFrom(subExpr, expr || subExpr)
    if (Array.isArray(expr)) {
        return (expr as CertLogicExpression[]).flatMap(recurse)
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        const operator = keys[0]
        const values = (expr as any)[operator]
        switch (operator) {

            case "var": return [ { path: values, context: parent ?? expr } ]
            case "if": return values.slice(0, 3).flatMap(recurse)    // guard, then, else

            // all infixes:
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
            case "not-before": return values.flatMap(recurse)

            case "!": return recurse(values[0])
            case "plusTime": return recurse(values[0])
            case "reduce": return [ /* operand: */values[0], /* initial: */values[2] ].flatMap(recurse)
            case "extractFromUVCI": return [ /* operand: */values[0], /* index: */values[1] ].flatMap(recurse)

            default:
                throw new Error(`operator not recognised by fields gatherer ("gatherFrom") in certlogic-js/validation/${__filename}: "${operator}"`)
        }
    }
    return []
}


/**
 * Compute which data accesses can be performed by the given CertLogic expression.
 * @param expr A CertLogic expression.
 */
export const dataAccesses = (expr: CertLogicExpression) => [ ...new Set(gatherFrom(expr).map((dataAccess) => dataAccess.path)) ].sort()


type DataAccessWithContext = {
    path: string
    context: CertLogicExpression
}

/**
 * A map with paths accessed as keys,
 * and for each path an array of CertLogic expressions "triggering" the access.
 * Example:
<pre>
 {
    "extractFromUVCI": [
        { "var": "ci" },
        1
    ]
 }
</pre>
 * produces
<pre>
 { "ci": [ <the entire expression above> ] }
</pre>
 */
export type DataAccessesWithContext = { [path: string]: CertLogicExpression[] }

/**
 * Compute which data accesses can be performed by the given CertLogic expression,
 * including in which contexts that would then happen.
 * The context consists of the CertLogic expression with an operand that performs the data access (= "`var`" operation),
 * or that "`var`" operation when its the entire expression.
 * @param expr A CertLogic expression.
 */
export const dataAccessesWithContext = (expr: CertLogicExpression): DataAccessesWithContext => {
    const map: DataAccessesWithContext = {}
    gatherFrom(expr).forEach(({ path, context }) => {
        if (!(path in map)) {
            map[path] = []
        }
        map[path].push(context)
    })
    return map
}

