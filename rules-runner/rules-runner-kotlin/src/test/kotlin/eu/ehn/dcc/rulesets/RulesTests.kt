package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.JsonNode
import org.junit.jupiter.api.Test
import java.io.File
import kotlin.test.assertEquals


data class RuleAssertion(
    var name: String?,
    var payload : JsonNode,
    var validationClock: String?,
    var expected : JsonNode,
    var message: String?
)


fun runTests(rule: Rule, assertions: List<RuleAssertion>) {
    println("rule: \"${rule.id}\"")
    assertions.forEachIndexed { index, assertion ->
        val assertionText = "assertion ${index + 1}"
        println(if (assertion.name?.isNotEmpty() == false) assertionText else "${assertion.name} ($assertionText)")
        assertEquals(assertion.expected, rule.run(assertion.payload, assertion.validationClock))
    }
}


fun File.fileNameWithoutExt(): CharSequence {
    val asStr = this.absolutePath
    val slashIndex = asStr.lastIndexOf('/')
    val dotIndex = asStr.lastIndexOf('.')
    return asStr.subSequence(slashIndex + 1, dotIndex)
}


// TODO  use @ParametrizedTest for this
// FIXME  not picked up by Maven test
internal class RunEURulesTests {

    @Test
    fun `run assertions for all rules`() {
        val rulesTestsPath = rulesPath / "EU" / "tests"
        euTemplateRuleset.forEach { rule ->
            val ruleId = rule.id
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
            .filter { ruleId -> euTemplateRuleset.none { rule -> rule.id == ruleId } }
        if (assertionsFilesForNonExistingRules.isEmpty()) {
            println("no assertions files for non-existing rules")
        } else {
            println("JSON files (apparently) for non-existing rules found: rule IDs would be ${assertionsFilesForNonExistingRules.map { ruleId -> "'$ruleId'" }}")
        }
    }

}

