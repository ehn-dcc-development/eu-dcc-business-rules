/**
 * Run all rules against all payloads in the dgc-testdata repo,
 * and output to out/testData-results.json.
 */


import { join } from "path"

import { extendJsonLogic } from "../extend-JsonLogic"
import { writeJson } from "../file-utils"
import { mapTestFiles } from "./map-testData"
import { outPath } from "../paths"


extendJsonLogic()

import { rules, runRule } from "../rules"


const validateAgainstRules = (testJson: any) => {
    const result: any = {}
    rules.forEach((rule) => {
        result[rule.name] = runRule(rule, testJson.JSON, testJson["TESTCTX"]["VALIDATIONCLOCK"])
    })
    result.allSatisfied = Object.values(result).reduce((acc, x) => acc && !!x, true)
    return result
}


const validationResults = mapTestFiles(validateAgainstRules)

writeJson(join(outPath, "testData-rules-validation-js.json"), validationResults)

console.log(`validated ${validationResults.length} DCCs against business rules`)

