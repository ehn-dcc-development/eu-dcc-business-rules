import { join } from "path"
import { JsonLogicRule } from "./extend-JsonLogic"
import { readJson } from "./file-utils"
import { rulesetsPath } from "./paths"


export interface Rule {
    name: string
    active: boolean
    businessDescription?: string
    description: string
    certLogicExpression: JsonLogicRule
}
export type Ruleset = Rule[]
export const rules: Ruleset = readJson(join(rulesetsPath, "EU/template-ruleset.json"))


export const valueSets = readJson(join(rulesetsPath, "valueSets.json"))


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
    return evaluate(rule.certLogicExpression as unknown as T, data)
}

