package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.*
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.io.File

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
    fun `test all test suites from disk`() {
        allTestSuites().map { it.run() }
    }

}


data class Assertion(
    var directive: String?,
    var message: String?,
    var data: JsonNode,
    var expected: JsonNode
)
data class TestCase(
    var name: String,
    var directive: String?,
    var certLogicExpression: JsonNode,
    var assertions: Array<Assertion>
)
data class TestSuite(
    var name: String,
    var directive: String?,
    var cases: Array<TestCase>
)


fun TestSuite.run() {
    if (this.directive == "skip") {
        println("(Skipping test suite \"${this.name}\".)")
        return
    }
    println("Running test suite \"${this.name}\":")
    this.cases.forEach { testCase ->
        if (testCase.directive == "skip") {
            println("\t(Skipping test case \"${testCase.name}\".)")
            return
        }
        println("\tRunning test case \"${testCase.name}\":")
        testCase.assertions.forEachIndexed { index, assertion ->
            if (assertion.directive == "skip") {
                println("\t\t(skipping assertion ${index + 1})")
            } else {
                println("\t\tRunning assertion ${index + 1}...")
                Assertions.assertEquals(
                    assertion.expected,
                    evaluate(testCase.certLogicExpression, assertion.data),
                    "assertion ${index + 1}"
                )
            }
        }
    }
}


val testSuitesPath = File("../certlogic-overall/testing")

fun allTestSuites(): List<TestSuite> = testSuitesPath
    .listFiles { _, name -> name.endsWith(".json") }
    .map { jacksonObjectMapper().readValue(it) }

