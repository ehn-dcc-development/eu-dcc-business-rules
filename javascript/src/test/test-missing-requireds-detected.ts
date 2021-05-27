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

    it("minimal DGC", () => {
        const errors = schemaValidationErrorsFor({
            "ver": "1.0.0",
            "nam": {
                "fn": "Musterfrau-Gößinger",
                "fnt": "MUSTERFRAU<GOESSINGER",
                "gn": "Gabriele",
                "gnt": "GABRIELE"
            },
            "dob": "1998-02-26"
        })
        equal(missingRequiredPropertyErrors(errors).length, 0)
    })

})

