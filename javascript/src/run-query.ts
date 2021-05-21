import { applyLogic } from "./extend-json-logic"
import { readJson, writeJson } from "./file-utils"
import { mapTestFiles } from "./map-testData"


const jsonLogicExpressionPath = process.argv[2]
const queryResultsPath = process.argv[3]

const jsonLogicExpression = readJson(jsonLogicExpressionPath)

const queryResults = mapTestFiles((dgc) => applyLogic(jsonLogicExpression, dgc))

writeJson(queryResultsPath, queryResults)
console.log(`queried over ${queryResults.length} DGCs -> ${queryResultsPath}`)

