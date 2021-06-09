import { CertLogicExpression } from "certlogic-js"


/**
 * Types representing rules and rule sets, as read in from a JSON file.
 */
export type Rule = {
    id: string
    logic: CertLogicExpression
}
export type RuleSet = Rule[]


/**
 * A type representing the “compressed” value sets.
 */
export type ValueSets = { [valueSetId: string]: string[] }


/**
 * A type representing the external parameters object.
 */
export type ExternalParameters = {
    valueSets: ValueSets
    [key: string]: unknown  // Allow any other property.
}

/**
 * A type representing the data context passed to every rule.
 */
export type RuleEvaluationDataContext = {
    payload: any,
    external: ExternalParameters
}


/**
 * A type representing the evaluation of a single rule.
 */
export type RuleEvaluationResult = boolean | { errorMessage: string }

/**
 * A type representing the evaluation of all rules (individually) in a rule set.
 */
export type RuleEvaluations = { [ruleId: string]: RuleEvaluationResult }

/**
 * A type representing the evaluation of all rules in a rule set,
 * with derived properties for whether errors occurred,
 * and whether all rules passed.
 */
export type RuleSetEvaluationResult = {
    ruleEvaluations: RuleEvaluations
    hasErrors: boolean
    allSatisfied: boolean
}

