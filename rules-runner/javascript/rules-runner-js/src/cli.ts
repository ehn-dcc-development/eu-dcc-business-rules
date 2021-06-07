#!/usr/bin/env node

import { filterErrors, loadJsonFile } from "./cli-utils"
import { runRuleSet } from "./runners"
import { RuleEvaluationDataContext, RuleSet, ValueSets } from "./typings"


const ruleSetPath = process.argv[2]
const valueSetsPath = process.argv[3]
const payloadPath = process.argv[4]
const parametersPath = process.argv[4]

const ruleSet = loadJsonFile<RuleSet>(ruleSetPath, "rule set")
const valueSets = loadJsonFile<ValueSets>(valueSetsPath, "value sets")
const payload = loadJsonFile<object>(payloadPath, "payload (DCC)")
const parameters = loadJsonFile<object>(parametersPath, "parameters")

const loadErrorMessages = filterErrors([ ruleSet, valueSets, payload, parameters ])
if (loadErrorMessages.length > 0) {
    console.error(`Errors occurred during loading of JSON files:`)
    loadErrorMessages.forEach((errorMessage) => console.error(`   - ${errorMessage}`))
    console.error(`...exiting`)
    process.exit(1)
}

const data: RuleEvaluationDataContext = {
    payload,
    external: {
        valueSets: valueSets as ValueSets,
        ...parameters
    }
}

console.log(JSON.stringify(runRuleSet(ruleSet as RuleSet, data), null, 2))

