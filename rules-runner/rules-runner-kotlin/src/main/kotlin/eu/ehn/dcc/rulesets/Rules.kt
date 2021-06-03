package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import eu.ehn.dcc.certlogic.evaluate
import java.io.File


data class Rule(
    var id: String,
    var active: Boolean,
    var businessDescription: String?,
    var description: String,
    var inputParameter: String?,
    var certLogicExpression: JsonNode
)
typealias Ruleset = List<Rule>

val rulesPath = File("../../rulesets")
val euTemplateRuleset: Ruleset = readJson(rulesPath / "EU" / "template-ruleset.json")

val valueSets: ObjectNode = readJson(rulesPath / "valueSets.json")


fun Rule.run(payload: JsonNode, validationClock: String?): JsonNode {
    val data = JsonNodeFactory.instance.objectNode()
        .set<ObjectNode>(
            "external",
            JsonNodeFactory.instance.objectNode()
                .set<ObjectNode>("valueSets", valueSets)
                .put("validationClock", validationClock)
                .put("countryCode", "CZ")
                .put("exp", "2022-10-21T18:25:43-05:00")
        )
        .set<ObjectNode>("payload", payload)
    return evaluate(this.certLogicExpression, data)
}

