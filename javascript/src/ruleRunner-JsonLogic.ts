import { applyLogic, extendJsonLogic } from "./extend-JsonLogic"
import { ruleRunner, RuleRunner } from "./rules"


extendJsonLogic()

export const runRule: RuleRunner = ruleRunner(applyLogic)

