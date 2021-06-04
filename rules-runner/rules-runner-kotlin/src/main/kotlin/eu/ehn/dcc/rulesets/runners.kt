package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.BooleanNode
import eu.ehn.dcc.certlogic.evaluate
import eu.ehn.dcc.rulesets.RuleEvaluationResult.BooleanResult
import eu.ehn.dcc.rulesets.RuleEvaluationResult.EvaluationError


fun runRule(rule: Rule, data: JsonNode): RuleEvaluationResult =
    try {
        val evalResult = evaluate(rule.logic, data)
        if (evalResult is BooleanNode) {
            BooleanResult(evalResult.booleanValue())
        } else {
            EvaluationError("rule evaluated to a non-boolean: $evalResult")
        }
    } catch (re: RuntimeException) {
        EvaluationError("rule evaluation errored out: ${re.message}")
    }


fun runRuleSet(ruleSet: RuleSet, data: JsonNode): RuleSetEvaluationResult {
    val ruleEvaluations = mutableMapOf<String, RuleEvaluationResult>()
    ruleSet.forEach { rule ->
        ruleEvaluations.put(rule.id, runRule(rule, data))
    }
    val hasErrors = ruleEvaluations.values.any { result -> result is EvaluationError }
    val allSatisfied = !hasErrors && ruleEvaluations.values
        .map { ruleResult -> (ruleResult as BooleanResult).value }
        .fold(true) { acc, b -> acc && b }
    return RuleSetEvaluationResult(ruleEvaluations, hasErrors, allSatisfied)
}

