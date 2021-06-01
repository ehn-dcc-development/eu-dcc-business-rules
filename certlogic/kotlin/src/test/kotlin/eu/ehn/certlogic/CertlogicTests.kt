package eu.ehn.certlogic

import com.fasterxml.jackson.databind.node.*
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class CertlogicTests {

    @Test
    fun `test isTruthy`() {
        assertFalse(isTruthy(NullNode.instance))
        assertFalse(isTruthy(BooleanNode.FALSE))
        assertTrue(isTruthy(BooleanNode.TRUE))
        assertFalse(isTruthy(JsonNodeFactory.instance.arrayNode()), "empty array")
        assertTrue(isTruthy(JsonNodeFactory.instance.arrayNode().add(TextNode.valueOf("foo"))), "non-empty array")
        assertTrue(isTruthy(JsonNodeFactory.instance.objectNode()))
        assertTrue(isTruthy(JsonNodeFactory.instance.objectNode().put("foo", "bar")))
        assertFalse(isTruthy(TextNode.valueOf("foo")))
        assertFalse(isTruthy(IntNode.valueOf(42)))
    }

    @Test
    fun `test isFalsy`() {
        assertTrue(isFalsy(NullNode.instance))
        assertTrue(isFalsy(BooleanNode.FALSE))
        assertFalse(isFalsy(BooleanNode.TRUE))
        assertFalse(isFalsy(JsonNodeFactory.instance.arrayNode()), "empty array")
        assertFalse(isFalsy(JsonNodeFactory.instance.objectNode()), "empty object")
        assertFalse(isFalsy(TextNode.valueOf("")))
        assertFalse(isFalsy(IntNode.valueOf(0)))
    }

    @Test
    fun `test simple deserialisation`() {
        val om = jacksonObjectMapper()
        val certLogicExpr = om.readTree("""{ "var": "" }""")
        val data = om.readTree("42")
        assertEquals(IntNode.valueOf(42), evaluate(certLogicExpr, data))
    }

    @Test
    fun `test all test suites from disk`() {
        allTestSuites().map { it.run() }
    }

}

