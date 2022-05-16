package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.NullNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.io.File

/**
 * Runs the test suite in the CertLogic specification against the Type-/JavaScript implementation of the CertLogic semantics
 *  - i.e., its interpreter/evaluator.
 */
internal class EvaluatorTests {

    @Test
    fun `test all test suites from disk`() {
        allTestSuites().map { it.run() }
    }

}


data class Assertion(
    var directive: String?,
    var message: String?,
    var certLogicExpression: JsonNode,
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
            val assertionText = assertion.message ?: "#${index + 1}"
            if (assertion.certLogicExpression is NullNode && testCase.certLogicExpression is NullNode) {
                println("     !! no CertLogic expression defined on assertion ${assertionText}, and neither on encompassing test case \"${testCase.name}\"")
            }
            when (assertion.directive) {
                "skip" -> println("\t\t! skipped assertion $assertionText")
                "only" -> println("\t\t(test directive 'only' not supported on assertions - ignoring)")
                else -> {
                    println("\t\tRunning assertion ${index + 1}...")
                    val expr = if (assertion.certLogicExpression is NullNode) testCase.certLogicExpression else assertion.certLogicExpression
                    val validationErrors = validate(expr)
                    assertEquals(0, validationErrors.size, "CertLogic expression should not have validation errors, but has: $validationErrors")
                    assertEquals(
                        assertion.expected,
                        evaluate(expr, assertion.data),
                        assertion.message ?: assertion.data.asText()
                    )
                    // (The previous assertion should always fail before the last one: if not, then the validator hasn't done its job!)
                }
            }
        }
    }
}


fun allTestSuites(): List<TestSuite> = File("../specification/testSuite")
    .listFiles { _, name -> name.endsWith(".json") }
    .map { jacksonObjectMapper().readValue(it) }

