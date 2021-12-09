import Ajv from "ajv"
import { ErrorObject } from "ajv"
const ajv = new Ajv({
    allErrors: true,        // don't stop after 1st error
    strict: true,
    validateSchema: false   // prevent that AJV throws with 'no schema with key or ref "https://json-schema.org/draft/2020-12/schema"'
})
const addFormats = require("ajv-formats")
addFormats(ajv)


export const createSchemaValidator = (schema: any): (json: any) => ErrorObject[] => {
    const ajvSchemaValidator = ajv.compile(schema)
    return (json: any): ErrorObject[] => {
        const valid = ajvSchemaValidator(json)
        return valid ? [] : ajvSchemaValidator.errors!
    }
}

