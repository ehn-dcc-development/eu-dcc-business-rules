package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.TextNode
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
        assertErrors("".asJson())
        assertErrors("foo".asJson())
        assertErrors(0.asJson())
        assertErrors(42.asJson())
        assertErrors(false.asJson())
        assertErrors(true.asJson())
    }

    @Test
    fun `should recognise invalid basic literals`() {
        assertErrors(jsonNull(), "invalid CertLogic expression")
        assertErrors( 3.14.asJson(), "3.14 is a non-integer number")
    }

    @Test
    fun `should recognise invalid operation objects`() {
        assertErrors(jsonObject(), "expression object must have exactly one key, but it has 0")
        assertErrors(
            jsonObject("foo" to "bar".asJson(), "alice" to "bob".asJson()),
            "expression object must have exactly one key, but it has 2"
        )
        assertErrors(
            jsonObject("all" to TextNode.valueOf("foo")),
            "operation not of the form { \"<operator>\": [ <values...> ] }"
        )
    }

    @Test
    fun `should recognise unknown operators`() {
        assertErrors(
            jsonObject("all" to jsonArray()),
            "unrecognised operator: \"all\""
        )
        assertErrors(
            jsonObject("all" to jsonArray(jsonNull())),
            "unrecognised operator: \"all\""
        )
    }

    @Test
    fun `should correctly validate var operations`() {
        assertErrors(makeVar(jsonNull()), "not of the form { \"var\": \"<path>\" }")
        assertErrors(makeVar(0.asJson()), "not of the form { \"var\": \"<path>\" }")
        assertErrors(makeVar("x" ))
        assertErrors(makeVar("x.0.y"))
        assertErrors(makeVar("1"))
        assertErrors(makeVar("x."), "data access path doesn't have a valid format: x.")
    }

}

