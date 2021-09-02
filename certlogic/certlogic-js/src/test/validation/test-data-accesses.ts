const { deepEqual } = require("chai").assert

import { CertLogicOperation } from "../../typings"
import { dataAccessesWithContext } from "../../validation/data-accesses"


describe("dataAccessesWithContext", () => {

    it("should produce correct context (1)", () => {
        const expr = { "var": "ci" }
        deepEqual(dataAccessesWithContext(expr), { "ci": [ expr ] })
    })

    it("should produce correct context (2)", () => {
        const expr: CertLogicOperation = { "extractFromUVCI": [ { "var": "ci" }, 1 ] }
        deepEqual(
            dataAccessesWithContext(expr),
            { "ci": [ expr ] })
    })

})

