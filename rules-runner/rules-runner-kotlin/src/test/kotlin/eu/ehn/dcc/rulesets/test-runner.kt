package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import eu.ehn.dcc.rulesets.RuleEvaluationResult.BooleanResult
import eu.ehn.dcc.rulesets.RuleEvaluationResult.EvaluationError
import org.junit.jupiter.api.Test
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.test.fail


data class RuleAssertion(
    var name: String?,
    var payload : JsonNode,
    var validationClock: String?,
    var expected : Boolean,
    var message: String?
)


fun makeData(payload: JsonNode, valueSets: ObjectNode, validationClock: String?): JsonNode =
    JsonNodeFactory.instance.objectNode()
        .set<ObjectNode>("payload", payload)
        .set<ObjectNode>("external", JsonNodeFactory.instance.objectNode()
            .set<ObjectNode>("valueSets", valueSets)
            .put("validationClock", validationClock)
        )


fun runTests(rule: Rule, valueSets: ObjectNode, assertions: List<RuleAssertion>) {
    println("rule: \"${rule.id}\"")
    assertions.forEachIndexed { index, assertion ->
        val assertionIndexText = "assertion ${index + 1}"
        val assertionText = if (assertion.name?.isNotEmpty() == false) assertionIndexText else "${assertion.name} ($assertionIndexText)"
        println("\t$assertionText")
        val data = makeData(assertion.payload, valueSets, assertion.validationClock)
        when (val it = runRule(rule, data)) {
            is BooleanResult -> assertEquals(assertion.expected, it.value, assertionText)
            is EvaluationError -> fail("($assertionText) ${it.errorMessage}")
        }
    }
}


fun File.fileNameWithoutExt(): CharSequence {
    val asStr = this.absolutePath
    val slashIndex = asStr.lastIndexOf('/')
    val dotIndex = asStr.lastIndexOf('.')
    return asStr.subSequence(slashIndex + 1, dotIndex)
}


internal class RunEURulesTests {

    val euTemplateRuleSet = readJson<RuleSet>(File("../../rulesets/EU/template-ruleset.json"))
    val rulesTestsPath = File("../../rulesets/EU/tests")
    val valueSets = readJson<ObjectNode>(File("../resources/valueSets.json"))

    @Test
    fun `run assertions for all EU rules`() {
        euTemplateRuleSet.forEach { rule ->
            val ruleId = rule.id
            val ruleAssertionsFile = rulesTestsPath / "$ruleId.json"
            if (ruleAssertionsFile.isFile) {
                runTests(rule, valueSets, readJson(ruleAssertionsFile))
            } else {
                println("\t[WARNING] no assertions file for rule with ID \"$ruleId\"")
            }
        }
    }

    @Test
    fun `an assertions file exists for all rules`() {
        assertTrue("rules without assertions found") {
            euTemplateRuleSet.all { rule -> (rulesTestsPath / "${rule.id}.json").isFile }
        }
    }

    @Test
    fun `no assertions file for non-existing rule`() {
        val assertionsFilesForNonExistingRules = rulesTestsPath
            .listFiles { _, name -> name.endsWith(".json") }
            .map { file -> file.fileNameWithoutExt() }
            .filter { ruleId -> euTemplateRuleSet.none { rule -> rule.id == ruleId } }
        assertTrue { assertionsFilesForNonExistingRules.isEmpty() }
    }

    // TODO  use @ParametrizedTest for this
    fun `run all assertions for rule`(rule: Rule) {
        val ruleId = rule.id
        val ruleAssertionsFile = rulesTestsPath / "$ruleId.json"
        if (ruleAssertionsFile.isFile) {
            runTests(rule, valueSets, readJson(ruleAssertionsFile))
        } else {
            fail("no assertions file for rule with id \"${rule.id}\"")
        }
    }

}

