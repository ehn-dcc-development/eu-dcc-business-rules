import { JsonLogicRule } from "./extend-JsonLogic"


export interface Rule {
    id: string
    active: boolean
    businessDescription?: string
    description: string
    logic: JsonLogicRule
}
export type Ruleset = Rule[]
export const euTemplateRuleset: Ruleset = require("../../../dgc-business-rules-testdata/EU")


export const valueSets = require("../../../dgc-business-rules-testdata/valuesets/valueSets.json")


export type RuleRunner = (rule: Rule, payload: any, validationClock?: string) => any

export const ruleRunner = <T>(evaluate: (expr: T, data: any) => any): RuleRunner => (rule: Rule, payload: any, validationClock?: string) => {
    const data = {
        external: {
            valueSets,
            validationClock,
            "countryCode": "NL",
            "exp": "2022-10-21T18:25:43-05:00"
        },
        payload
    }
    return evaluate(rule.logic as unknown as T, data)
}

