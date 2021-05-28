import { CertLogicExpression, evaluate } from "certlogic-js"

import { Rule, RuleRunner, valueSets } from "./rules"


export const runRule: RuleRunner = (rule: Rule, payload: any, validationClock?: string) => {
    const data = {
        external: {
            valueSets,
            validationClock,
            "countryCode": "CZ",
            "exp": "2022-10-21T18:25:43-05:00"
        },
        payload
    }
    return evaluate(rule.certLogicExpression as CertLogicExpression, data)
}

