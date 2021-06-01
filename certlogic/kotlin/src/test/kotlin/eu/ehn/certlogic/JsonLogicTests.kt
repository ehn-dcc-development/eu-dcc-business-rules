package eu.ehn.certlogic

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Assertions.assertEquals
import java.io.File


data class Assertion(
    var directive: String?,
    var message: String?,
    var data: JsonNode,
    var expected: JsonNode
)
data class TestCase(
    var name: String,
    var directive: String?,
    var jsonLogicRule: JsonNode,
    var assertions: Array<Assertion>
)
data class TestSuite(
    var name: String,
    var directive: String?,
    var cases: Array<TestCase>
)


val objectMapper = jacksonObjectMapper()

val testSuitesPath = File("../../jsonLogic/test")

fun allTestSuites(): List<TestSuite> = testSuitesPath
    .listFiles { dir, name -> name.endsWith(".json") }
    .map(::readTestSuiteFromDisk)


fun readTestSuiteFromDisk(file: File): TestSuite = objectMapper.readValue<TestSuite>(file)


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
                assertEquals(
                    assertion.expected,
                    evaluate(testCase.jsonLogicRule, assertion.data),
                    "assertion ${index + 1}"
                )
            }
        }
    }
}

