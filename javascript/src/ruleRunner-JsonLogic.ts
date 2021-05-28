import { applyLogic } from "./extend-JsonLogic"
import { Rule, RuleRunner, valueSets } from "./rules"


export const runRule: RuleRunner = (rule: Rule, hcert: any, validationClock?: string) => {
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

