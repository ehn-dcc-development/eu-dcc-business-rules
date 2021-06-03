package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.TextNode
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

/**
 * Some tests to understand how Jackson really works, when that's not clear from type information (or the documentation).
 */
internal class JacksonTests {

    @Test
    fun `out-of-array-indices on ArrayNode returns JVM-null instead of JSON-null`() {
        val array = JsonNodeFactory.instance.arrayNode().add(TextNode.valueOf("foo"))
        assertEquals(null, array[1])
    }

}

