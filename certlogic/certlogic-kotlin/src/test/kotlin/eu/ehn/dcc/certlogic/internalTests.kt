package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.node.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

/**
 * Should be in sync with the `describe("truthy and falsy", ...`-part of `test-internals.ts` from `certlogic-js`.
 */
internal class TruthyFalsyTests {

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


/**
 * Should be in sync with the `describe("extractFromUVCI", ...`-part of `test-internals.ts` from `certlogic-js`.
 */
internal class ExtractFromUVCI {

    fun checkForThat(uvci: String?, assertions: List<Pair<Int, String?>>): Unit =
        assertions.forEach {
            assertEquals(it.second, extractFromUVCI(uvci, it.first))
        }

    @Test
    fun `returns null on null operand`() {
        checkForThat(
            null,
            listOf(
                -1 to null,
                 0 to null,
                 1 to null
            )
        )
    }

    @Test
    fun `works correctly on an empty string`() {
        checkForThat(
            "",
            listOf(
                -1 to null,
                0 to "",
                1 to null
            )
        )
    }

    @Test
    fun `that thing that testers do (without optional prefix)`() {
        checkForThat(
            "foo/bar::baz#999lizards",
            listOf(
                -1 to null,
                0 to "foo",
                1 to "bar",
                2 to "",    // not null, but still falsy
                3 to "baz",
                4 to "999lizards",
                5 to null
            )
        )
    }

    @Test
    fun `that thing that testers do (with optional prefix)`() {
        checkForThat(
            "URN:UVCI:foo/bar::baz#999lizards",
            listOf(
                -1 to null,
                0 to "foo",
                1 to "bar",
                2 to "",    // not null, but still falsy
                3 to "baz",
                4 to "999lizards",
                5 to null
            )
        )
    }

    // the example from the specification:
    @Test
    fun `each separator adds a fragment`() {
        checkForThat(
            "a::c/#/f",
            listOf(
                0 to "a",
                1 to "",
                2 to "c",
                3 to "",
                4 to "",
                5 to "f"
            )
        )
    }

}

