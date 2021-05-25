import { join } from "path"
import { applyLogic, JsonLogicRule } from "./extend-JsonLogic"
import { readJson } from "./file-utils"

const configPath = join(__dirname, "../../rules/")

export interface Rule {
    name: string
    active: boolean
    businessDescription?: string
    description: string
    jsonLogicExpression: JsonLogicRule
}
export type Rules = Rule[]
export const rules: Rules = readJson(join(configPath, "EU-Level-validation-rules.json"))


const valueSets = readJson(join(configPath, "valueSets.json"))


export const runRule = (rule: Rule, hcert: any, validationClock?: string) => {
    const data = {
        external: {
            valueSets,
            validationClock,
            "countryCode": "CZ",
            "exp": "2022-10-21T18:25:43-05:00"
        },
        hcert
    }
    return applyLogic(rule.jsonLogicExpression, data)
}

