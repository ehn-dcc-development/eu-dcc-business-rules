package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.node.IntNode
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.databind.node.TextNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Some tests to understand how Jackson really works, when that's not clear from type information (or the documentation).
 */
internal class JacksonTests {

    @Test
    fun `out-of-array-indices on ArrayNode returns JVM-null instead of JSON-null`() {
        val array = JsonNodeFactory.instance.arrayNode().add(TextNode.valueOf("foo"))
        assertEquals(null, array[1])
    }

    @Test
    fun `parsing of integer-value 0 as an object's property's value`() {
        val fooObject = jacksonObjectMapper().readValue<ObjectNode>("{ \"foo\": 0 }")
        val zeroValue = fooObject.get("foo")
        assertTrue(zeroValue is IntNode)
        assertEquals(0, zeroValue.intValue())
    }

}

