const { equal } = require("chai").assert

import { schemaValidationErrorsFor } from "../validator"


describe.only("missing required fields are detected by schema validator", () => {

    it("empty DGC", () => {
        const errors = schemaValidationErrorsFor({})
        equal(errors.filter((error) => error.message?.startsWith("must have required property ")).length, 3)
    })

    it("empty r-event", () => {
        const errors = schemaValidationErrorsFor({
            r: [ {} ]
        })
        equal(errors.filter((error) => error.message?.startsWith("must have required property ")).length, 3 + 7)
    })

    it("empty t-event", () => {
        const errors = schemaValidationErrorsFor({
            t: [ {} ]
        })
        equal(errors.filter((error) => error.message?.startsWith("must have required property ")).length, 3 + 8)
    })

    it("empty v-event", () => {
        const errors = schemaValidationErrorsFor({
            v: [ {} ]
        })
        equal(errors.filter((error) => error.message?.startsWith("must have required property ")).length, 3 + 10)
    })

})

