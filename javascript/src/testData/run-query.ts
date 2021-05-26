/**
 * Provide development convenience by running some JsonLogic query on all DGC payloads in the dgc-testdata repo.
 */

import { applyLogic } from "../extend-JsonLogic"
import { readJson, writeJson } from "../file-utils"
import { mapTestFiles } from "./map-testData"


if (process.argv.length < 4) {
    console.log(`Usage: node dist/run-query.js <path to JSON file with JsonLogic expression> <path to location of query results JSON file>`)
    process.exit(1)
}


const jsonLogicExpressionPath = process.argv[2]
const queryResultsPath = process.argv[3]

const jsonLogicExpression = readJson(jsonLogicExpressionPath)

const queryResults = mapTestFiles((dgc) => applyLogic(jsonLogicExpression, dgc))

writeJson(queryResultsPath, queryResults)
console.log(`queried over ${queryResults.length} DGCs -> ${queryResultsPath}`)

