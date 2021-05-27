/**
 * Run all rules against all DGC payloads in the dgc-testdata repo,
 * and output to out/testData-results.json.
 */


import { join } from "path"

import { mapTestFiles } from "./map-testData"
import { writeJson } from "../file-utils"
import { outPath } from "../paths"
import { schemaValidationErrorsFor } from "../validator"


const schemaValidationResults = mapTestFiles(schemaValidationErrorsFor).filter((result) => "notJson" in result || result["result"] && result["result"].length > 0)


writeJson(join(outPath, "testData-schema-validation.json"), schemaValidationResults)

console.log(`${schemaValidationResults.length} DGCs are not JSON, or have validation errors`)

