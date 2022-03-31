package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.ArrayNode
import com.fasterxml.jackson.databind.node.ObjectNode

private data class DataAccessWithContext (
    val path: String,
    val context: JsonNode
)

private fun JsonNode.asIterable() = if (this is ArrayNode) this.toList() else emptyList()

private fun JsonNode.at(vararg indices: Int): List<JsonNode> =
    indices.filter { index -> 0 <= index && index < this.size() }.map { index -> this[index] }

private fun gatherFrom(expr: JsonNode?, parent: JsonNode?): Iterable<DataAccessWithContext> {
    val recurse = { subExpr: JsonNode -> gatherFrom(subExpr, expr) }
    if (expr is ArrayNode) {
        return expr.toList().flatMap(recurse)
    }
    if (expr is ObjectNode) {
        val (operator, values) = expr.fields().next()
        return when (operator) {

            "var" -> listOf(DataAccessWithContext(values.textValue(), parent ?: expr))
            "if" -> values.at(0, 1, 2).flatMap(recurse)   // 0: guard, 1: then, 2: else

            // all infixes:
            "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" -> values.asIterable().flatMap(recurse)

            "!" -> values.at(0).flatMap(recurse)    // 0: operand
            "plusTime" -> values.at(0).flatMap(recurse) // 0: operand
            "reduce" -> values.at(0, 2).flatMap(recurse)    // 0: operand, 2: initial
            "extractFromUVCI" -> values.at(0).flatMap(recurse)  // 0: operand
            "dccDateOfBirth" -> values.at(0).flatMap(recurse)  // 0: operand

            else -> throw Error("""operator not recognised by fields gatherer ("gatherFrom"): \"${operator}\"""")
        }
    }
    return emptyList()
}


/**
 * Compute which data accesses can be performed by the given CertLogic expression.
 * @param expr A CertLogic expression.
 */
fun dataAccesses(expr: JsonNode) = gatherFrom(expr, null).map { it.path }.distinct()


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
typealias DataAccessesWithContext = Map<String, List<JsonNode>>

/**
 * Compute which data accesses can be performed by the given CertLogic expression,
 * including in which contexts that would then happen.
 * The context consists of the CertLogic expression with an operand that performs the data access (= `var` operation),
 * or that `var` operation when it's the entire expression.
 * @param expr A CertLogic expression.
 */
fun dataAccessesWithContext(expr: JsonNode): DataAccessesWithContext =
    gatherFrom(expr, null)
        .groupBy { it.path }
        .mapValues { e -> e.value.map { da -> da.context } }

