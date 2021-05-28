import { join } from "path"
import { JsonLogicRule } from "./extend-JsonLogic"
import { readJson } from "./file-utils"
import { rulesPath } from "./paths"


export interface Rule {
    name: string
    active: boolean
    businessDescription?: string
    description: string
    jsonLogicExpression: JsonLogicRule
}
export type Rules = Rule[]
export const rules: Rules = readJson(join(rulesPath, "EU-Level-validation-rules.json"))


export const valueSets = readJson(join(rulesPath, "valueSets.json"))


export type RuleRunner = (rule: Rule, hcert: any, validationClock?: string) => any

