package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*


private val nodeFactory = JsonNodeFactory.instance


// JSON/Jackson-generic factories:

fun jsonObject(vararg pairs: Pair<String, JsonNode>) = nodeFactory.objectNode().apply {
    for ((key, value) in pairs) {
        put(key, value)
    }
}

fun jsonArray(vararg values: JsonNode) = nodeFactory.arrayNode().apply {
    for (value in values) {
        add(value)
    }
}

fun jsonNull() = NullNode.instance
fun String.asJson() = TextNode.valueOf(this)
fun Int.asJson() = IntNode.valueOf(this)
fun Double.asJson() = DoubleNode.valueOf(this)
fun Boolean.asJson() = if (this) BooleanNode.TRUE else BooleanNode.FALSE


// CertLogic-specific factories:

fun makeVar(pathValue: ValueNode): JsonNode = jsonObject("var" to pathValue)
fun makeVar(pathValue: String): JsonNode = makeVar(TextNode.valueOf(pathValue))

