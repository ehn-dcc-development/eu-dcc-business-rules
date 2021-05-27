import { ErrorObject } from "ajv"
const { equal } = require("chai").assert

import { schemaValidationErrorsFor } from "../validator"


describe("missing required fields are detected by schema validator", () => {

    const missingRequiredPropertyErrors = (errors: ErrorObject[]) =>
        errors.filter((error) => error.message?.startsWith("must have required property "))

    it("empty DGC", () => {
        const errors = schemaValidationErrorsFor({})
        equal(missingRequiredPropertyErrors(errors).length, 3)
    })

    it("empty r-event", () => {
        const errors = schemaValidationErrorsFor({
            r: [ {} ]
        })
        equal(missingRequiredPropertyErrors(errors).length, 3 + 7)
    })

    it("empty t-event", () => {
        const errors = schemaValidationErrorsFor({
            t: [ {} ]
        })
        equal(missingRequiredPropertyErrors(errors).length, 3 + 8)
    })

    it("empty v-event", () => {
        const errors = schemaValidationErrorsFor({
            v: [ {} ]
        })
        equal(missingRequiredPropertyErrors(errors).length, 3 + 10)
    })

})

