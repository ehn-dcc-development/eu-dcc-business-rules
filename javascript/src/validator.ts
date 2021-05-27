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

const schemaValidator = ajv.compile(readJson(join(repoPath, "../ehn-dgc-schema/DGC.combined-schema.json")))


export const schemaValidationErrorsFor = (dgc: any): ErrorObject[] => {
    const valid = schemaValidator(dgc)
    return valid ? [] : schemaValidator.errors!!
}

