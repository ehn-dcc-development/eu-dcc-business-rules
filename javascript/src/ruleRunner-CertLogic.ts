import { evaluate } from "certlogic-js"

import { ruleRunner, RuleRunner } from "./rules"


export const runRule: RuleRunner = ruleRunner(evaluate)

