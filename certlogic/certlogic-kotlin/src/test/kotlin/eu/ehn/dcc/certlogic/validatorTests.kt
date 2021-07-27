package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test


/*
 * These unit tests are directly translated from `certlogic-js/src/test/validation/test-format-validator.ts`.
 * Running the validator over all CertLogic expression in the test suite, is done by the runner in `certlogicTests`.
 */

fun assertErrors(expr: JsonNode, vararg messages: String) {
    val result = validate(expr)
    assertEquals(result.size, messages.size, "number of errors")
    result.forEachIndexed { index, error ->
        assertEquals(expr, error.expr, "expression with error")
        assertEquals(messages[index], error.message, "error message")
    }
}


internal class ValidatorTests {

    @Test
    fun `should recognise valid basic literals`() {
        assertErrors(TextNode.valueOf(""))
        assertErrors(TextNode.valueOf("foo"))
        assertErrors(IntNode.valueOf(0))
        assertErrors(IntNode.valueOf(42))
        assertErrors(BooleanNode.FALSE)
        assertErrors(BooleanNode.TRUE)
    }

    @Test
    fun `should recognise invalid basic literals`() {
        assertErrors(NullNode.instance, "invalid CertLogic expression")
        assertErrors(DoubleNode.valueOf( 3.14), "3.14 is a non-integer number")
    }

    @Test
    fun `should recognise invalid operation objects`() {
        assertErrors(JsonNodeFactory.instance.objectNode(), "expression object must have exactly one key, but it has 0")
        assertErrors(
            JsonNodeFactory.instance.objectNode().apply {
                put("foo", "bar")
                put("alice", "bob")
            },
            "expression object must have exactly one key, but it has 2"
        )
        assertErrors(
            JsonNodeFactory.instance.objectNode().apply {
                set<ArrayNode>("all", JsonNodeFactory.instance.arrayNode())
            },
            "operation not of the form { \"<operator>\": [ <values...> ] }"
        )
    }

    @Test
    fun `should recognise unknown operators`() {
        assertErrors(
            JsonNodeFactory.instance.objectNode().apply {
                set<ArrayNode>("all", JsonNodeFactory.instance.arrayNode().add(NullNode.instance))
            },
            "unrecognised operator: \"all\""
        )
    }


    fun makeVar(pathValue: ValueNode): JsonNode =
        JsonNodeFactory.instance.objectNode().apply {
            set<JsonNode>("var", pathValue)
        }

    fun makeVar(pathValue: String): JsonNode = makeVar(TextNode.valueOf(pathValue))

    @Test
    fun `should correctly validate var operations`() {
        assertErrors(makeVar(NullNode.instance), "not of the form { \"var\": \"<path>\" }")
        assertErrors(makeVar(IntNode.valueOf(0)), "not of the form { \"var\": \"<path>\" }")
        assertErrors(makeVar("x" ))
        assertErrors(makeVar("x.0.y"))
        assertErrors(makeVar("1"))
        assertErrors(makeVar("x."), "data access path doesn't have a valid format: x.")
    }

}

