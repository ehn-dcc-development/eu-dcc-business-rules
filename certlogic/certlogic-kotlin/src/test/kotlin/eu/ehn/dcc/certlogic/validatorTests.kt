package eu.ehn.dcc.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.io.File


/**
 * Runs the validation test suite of the CertLogic specification (i.e.: the test suite for the validation part of CertLogic)
 * against the validator of the Type-/JavaScript implementation of CertLogic.
 */
internal class ValidatorTests {

    @Test
    fun `test all validation test suites from disk`() {
        allValidationTestSuites().map { it.run() }
    }

}


data class Issue(
    var expr: JsonNode,
    var message: String
)

data class ValidationTestCase(
    var name: String?,
    var directive: String?,
    var certLogicExpression: JsonNode,
    var issues: Array<Issue>
)

data class ValidationTestSuite(
    var name: String,
    var directive: String?,
    var cases: Array<ValidationTestCase>
)

fun ValidationTestSuite.run() {
    if (this.directive == "skip") {
        println("(Skipping test suite \"${this.name}\".)")
        return
    }
    println("Running test suite \"${this.name}\":")
    this.cases.forEachIndexed { caseIndex, testCase ->
        val name = testCase.name ?: "<unnamed> case #${caseIndex + 1}, expr: <<${testCase.certLogicExpression}>>"
        if (testCase.directive == "skip") {
            println("\t(Skipping test case \"${name}\".)")
            return
        }
        println("\tRunning test case \"${name}\":")
        val issues = validate(testCase.certLogicExpression)
        assertEquals(issues.size, testCase.issues.size, "number of issues")
        issues.forEachIndexed { issueIndex, validationError ->
            val issue = testCase.issues[issueIndex]
            assertEquals(issue.expr, validationError.expr)
            assertEquals(issue.message, validationError.message)
        }   // TODO  make order-independent?
        assertEquals(isCertLogicExpression(testCase.certLogicExpression), issues.size === 0)
    }
}

fun allValidationTestSuites(): List<ValidationTestSuite> = File("../specification/validation-testSuite")
    .listFiles { _, name -> name.endsWith(".json") }
    .map { jacksonObjectMapper().readValue(it) }

