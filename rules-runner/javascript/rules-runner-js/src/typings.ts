import { CertLogicExpression } from "certlogic-js"


export interface Rule {
    id: string
    description: string
    logic: CertLogicExpression
}
export type RuleSet = Rule[]


export type ValueSets = { [valueSetId: string]: string[] }


export interface ExternalParameters {
    valueSets: ValueSets
    [key: string]: unknown  // Allow any other property.
}

export interface RuleEvaluationDataContext {
    payload: any,
    external: ExternalParameters
}


export type RuleEvaluationResult = boolean | { errorMessage: string }

export type RuleEvaluations = { [ruleId: string]: RuleEvaluationResult }

export interface RuleSetEvaluationResult {
    ruleEvaluations: RuleEvaluations
    hasErrors: boolean
    allSatisfied: boolean
}

