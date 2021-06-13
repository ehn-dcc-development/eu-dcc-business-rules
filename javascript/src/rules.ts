import { JsonLogicRule } from "./extend-JsonLogic"


export interface Rule {
    id: string
    active: boolean
    businessDescription?: string
    description: string
    logic: JsonLogicRule
}
export type Ruleset = Rule[]
export const euTemplateRuleset: Ruleset = require("../../rulesets/EU/template-ruleset.json")


export const valueSets = require("../../rules-runner/resources/valueSets.json")


export type RuleRunner = (rule: Rule, payload: any, validationClock?: string) => any

export const ruleRunner = <T>(evaluate: (expr: T, data: any) => any): RuleRunner => (rule: Rule, payload: any, validationClock?: string) => {
    const data = {
        external: {
            valueSets,
            validationClock,
            "countryCode": "CZ",
            "exp": "2022-10-21T18:25:43-05:00"
        },
        payload
    }
    return evaluate(rule.logic as unknown as T, data)
}

