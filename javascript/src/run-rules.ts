import { join } from "path"

import { ExtendedRulesLogic, applyLogic } from "./extend-json-logic"
import { readJson, writeJson } from "./file-utils"
import { mapTestFiles } from "./map-testData"


const rules = readJson(join(__dirname, "../../rules/EU-Level-business-rules.json"))

const validateAgainstRules = (dgc: any) => {
    const result: any = {}
    rules.forEach((rule: any) => {
        const { name, jsonLogicExpression } = rule
        result[name] = applyLogic(jsonLogicExpression as ExtendedRulesLogic, dgc)
    })
    result.allSatisfied = Object.values(result).reduce((acc, x) => acc && !!x, true)
    return result
}


const validationResults = mapTestFiles(validateAgainstRules)

writeJson(join(__dirname, "../out/testData-results.json"), validationResults)

console.log(`validated ${validationResults.length} DGCs against business rules`)

