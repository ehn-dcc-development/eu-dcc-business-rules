package eu.ehn.certlogic

import com.fasterxml.jackson.databind.JsonNode
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


data class RuleAssertion(
    var name: String?,
    var payload : JsonNode,
    var validationClock: String?,
    var expected : JsonNode,
    var message: String?
)


fun runTests(rule: Rule, assertions: List<RuleAssertion>) {
    println("rule: \"${rule.name}\"")
    assertions.forEachIndexed { index, assertion ->
        val assertionText = "assertion ${index + 1}"
        println(if (assertion.name?.isNotEmpty() == false) assertionText else "${assertion.name} ($assertionText)")
        assertEquals(assertion.expected, rule.run(assertion.payload, assertion.validationClock))
    }
}


internal class RunRulesTests {

    @Test
    fun `run assertions for all rules`() {
        val rulesTestsPath = rulesPath / "test"
        rules.forEach { rule ->
            val ruleId = rule.name
            val ruleAssertionsFile = rulesTestsPath / "$ruleId.json"
            if (ruleAssertionsFile.isFile) {
                runTests(rule, readJson(ruleAssertionsFile))
            } else {
                System.err.println("[ERROR] no assertions file for rule \"$ruleId\"")
            }
        }

        val assertionsFilesForNonExistingRules = rulesTestsPath
            .listFiles { _, name -> name.endsWith(".json") }
            .map { file -> file.fileNameWithoutExt() }
            .filter { ruleId -> rules.none { rule -> rule.name == ruleId } }
        if (assertionsFilesForNonExistingRules.isEmpty()) {
            println("no assertions files for non-existing rules")
        } else {
            println("JSON files (apparently) for non-existing rules found: rule IDs would be ${assertionsFilesForNonExistingRules.map { ruleId -> "'$ruleId'" }}")
        }
    }

}
