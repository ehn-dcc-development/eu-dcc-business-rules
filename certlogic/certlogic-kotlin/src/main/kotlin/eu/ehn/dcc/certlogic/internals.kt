package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*


internal fun isFalsy(value: JsonNode): Boolean = when (value) {
    is BooleanNode -> value == BooleanNode.FALSE
    is NullNode -> true
    is TextNode -> value.textValue().isEmpty()
    is IntNode -> value.intValue() == 0
    is ArrayNode -> value.size() == 0
    is ObjectNode -> value.size() == 0
    else -> false
}

internal fun isTruthy(value: JsonNode): Boolean = when (value) {
    is BooleanNode -> value == BooleanNode.TRUE
    is TextNode -> value.textValue().isNotEmpty()
    is IntNode -> value.intValue() != 0
    is ArrayNode -> value.size() > 0
    is ObjectNode -> value.size() > 0
    else -> false
}

/**
 * Determines “boolsiness” of the given JSON value:
 *
 *  * `true` &harr; truthy
 *  * `false` &harr; falsy
 *  * `null` &harr; neither
 */
internal fun boolsiness(value: JsonNode): Boolean? {
    if (isFalsy(value)) {
        return false
    }
    if (isTruthy(value)) {
        return true
    }
    return null
}

internal fun intCompare(operator: String, l: Int, r: Int): Boolean =
    when (operator) {
        "<" -> l < r
        ">" -> l > r
        "<=" -> l <= r
        ">=" -> l >= r
        else -> throw RuntimeException("unhandled comparison operator \"$operator\"")
    }

internal fun <T:Comparable<T>> compare(operator: String, args: List<T>): Boolean =
    when (args.size) {
        2 -> intCompare(operator, args[0].compareTo(args[1]), 0)
        3 -> intCompare(operator, args[0].compareTo(args[1]), 0) && intCompare(operator, args[1].compareTo(args[2]), 0)
        else -> throw RuntimeException("invalid number of operands to a \"$operator\" operation")
    }

internal fun comparisonOperatorForDateTimeComparison(operator: String): String =
    when (operator) {
        "after" -> ">"
        "before" -> "<"
        "not-after" -> "<="
        "not-before" -> ">="
        else -> throw RuntimeException("unhandled date-time comparison operator \"$operator\"")
    }


internal const val optionalPrefix = "URN:UVCI:"
internal fun extractFromUVCI(uvci: String?, index: Int): String? {
    if (uvci == null || index < 0) {
        return null
    }
    val prefixlessUvci = if (uvci.startsWith(optionalPrefix)) uvci.substring(optionalPrefix.length) else uvci
    val fragments = prefixlessUvci.split(Regex("[/#:]"))
    return if (index < fragments.size) fragments[index] else null
}

