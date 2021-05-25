/**
 * Run all rules against all DGC payloads in the dgc-testdata repo,
 * and output to out/testData-results.json.
 */


import { join } from "path"

import { extendJsonLogic } from "./extend-JsonLogic"
import { readJson, writeJson } from "./file-utils"
import { mapTestFiles } from "./map-testData"


extendJsonLogic()


import Ajv from "ajv"
const ajv = new Ajv({
    allErrors: true,        // don't stop after 1st error
    strict: false,          // TODO  define own "valueset-uri" keyword
    validateSchema: false   // prevent that AJV throws with 'no schema with key or ref "https://json-schema.org/draft/2020-12/schema"'
})
const addFormats = require("ajv-formats")
addFormats(ajv)

const schemaValidator = ajv.compile(readJson(join(__dirname, "../../../ehn-dgc-schema/DGC.combined-schema.json")))


const validateAgainstSchema = (testJson: any) => {
    const valid = schemaValidator(testJson.JSON)
    return valid ? undefined : schemaValidator.errors
}


const schemaValidationResults = mapTestFiles(validateAgainstSchema).filter((result) => "notJson" in result || result["result"] !== undefined)


writeJson(join(__dirname, "../../out/testData-schema-validation.json"), schemaValidationResults)

console.log(`${schemaValidationResults.length} DGCs are not JSON, or have validation errors`)

