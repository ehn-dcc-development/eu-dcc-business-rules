package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.JsonNode


data class Rule(
    var id: String,
    var description: String,
    var logic: JsonNode
)
typealias RuleSet = List<Rule>

sealed class RuleEvaluationResult {
    data class BooleanResult(
        val value: Boolean
    ) : RuleEvaluationResult()
    data class EvaluationError(
        val errorMessage: String
    ) : RuleEvaluationResult()
}

typealias RuleEvaluations = Map<String, RuleEvaluationResult>

data class RuleSetEvaluationResult(
    val ruleEvaluations: RuleEvaluations,
    val hasErrors: Boolean,
    val allSatisfied: Boolean
)

