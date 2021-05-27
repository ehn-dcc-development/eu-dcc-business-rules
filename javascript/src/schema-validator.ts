import { ErrorObject } from "ajv"
import { join } from "path"

import { readJson } from "./file-utils"
import { repoPath } from "./paths"


import Ajv from "ajv"
const ajv = new Ajv({
    allErrors: true,        // don't stop after 1st error
    strict: false,          // TODO  define own "valueset-uri" keyword
    validateSchema: false   // prevent that AJV throws with 'no schema with key or ref "https://json-schema.org/draft/2020-12/schema"'
})
const addFormats = require("ajv-formats")
addFormats(ajv)

const schemaValidator = ajv.compile(readJson(join(repoPath, "../ehn-dgc-schema/DCC.combined-schema.json")))


export const schemaValidationErrorsFor = (testJSON: any): ErrorObject[] => {
    const valid = schemaValidator(testJSON.JSON)
    return valid ? [] : schemaValidator.errors!!
}

