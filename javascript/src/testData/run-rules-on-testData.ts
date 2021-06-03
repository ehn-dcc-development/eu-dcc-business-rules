/**
 * Run all rules against all payloads in the dgc-testdata repo,
 * and output to out/testData-results.json.
 */


import { join } from "path"

import { writeJson } from "../file-utils"
import { mapTestFiles } from "./map-testData"
import { outPath } from "../paths"
import { RuleRunner, euTemplateRuleset } from "../rules"


const validateAgainstRules = (runRule: RuleRunner) => (testJson: any) => {
    const result: any = {}
    euTemplateRuleset.forEach((rule) => {
        result[rule.id] = runRule(rule, testJson.JSON, testJson["TESTCTX"]["VALIDATIONCLOCK"])
    })
    result.allSatisfied = Object.values(result).reduce((acc, x) => acc && !!x, true)
    return result
}


export const runRulesOnTestDataWith = (runRule: RuleRunner, resultsFileName: string) => {
    const validationResults = mapTestFiles(validateAgainstRules(runRule))
    writeJson(join(outPath, resultsFileName), validationResults)
    console.log(`validated ${validationResults.length} DCCs against business rules`)
}

