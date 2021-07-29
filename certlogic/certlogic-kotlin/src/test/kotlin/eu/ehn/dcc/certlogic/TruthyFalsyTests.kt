package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.node.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

/**
 * Should be in sync with the `describe("truthy and falsy", ...`-part of `test-internals.ts` from `certlogic-js`.
 */
class TruthyFalsyTests {

    @Test
    fun `test isTruthy`() {
        // (no undefined)
        assertFalse(isTruthy(NullNode.instance))
        assertFalse(isTruthy(BooleanNode.FALSE))
        assertTrue(isTruthy(BooleanNode.TRUE))
        assertFalse(isTruthy(JsonNodeFactory.instance.arrayNode()), "empty array")
        assertTrue(
            isTruthy(JsonNodeFactory.instance.arrayNode().add(TextNode.valueOf("foo"))),
            "non-empty array"
        )
        assertFalse(isTruthy(JsonNodeFactory.instance.objectNode()), "empty object")
        assertTrue(isTruthy(JsonNodeFactory.instance.objectNode().put("foo", "bar")), "non-empty object")
        assertTrue(isTruthy(TextNode.valueOf("foo")))
        assertFalse(isTruthy(TextNode.valueOf("")))
        assertTrue(isTruthy(IntNode.valueOf(42)))
        assertFalse(isTruthy(IntNode.valueOf(0)))
    }

    @Test
    fun `test isFalsy`() {
        // (no undefined)
        assertTrue(isFalsy(NullNode.instance))
        assertTrue(isFalsy(BooleanNode.FALSE))
        assertFalse(isFalsy(BooleanNode.TRUE))
        assertTrue(isFalsy(JsonNodeFactory.instance.arrayNode()), "empty array")
        assertFalse(
            isFalsy(JsonNodeFactory.instance.arrayNode().add(TextNode.valueOf("foo"))),
            "non-empty array"
        )
        assertTrue(isFalsy(JsonNodeFactory.instance.objectNode()), "empty object")
        assertTrue(isTruthy(JsonNodeFactory.instance.objectNode().put("foo", "bar")), "non-empty object")
        assertFalse(isFalsy(TextNode.valueOf("foo")))
        assertTrue(isFalsy(TextNode.valueOf("")))
        assertFalse(isFalsy(IntNode.valueOf(42)))
        assertTrue(isFalsy(IntNode.valueOf(0)))
    }

}

