const { isFalse, isTrue } = require("chai").assert

import { isCertLogicOperation } from "../../validation"


describe("type predicate functions for CertLogic types", () => {

    it("isCertLogicOperation works", () => {
        isFalse(isCertLogicOperation([]))
        isFalse(isCertLogicOperation({}))
        isFalse(isCertLogicOperation("foo"))
        isTrue(isCertLogicOperation({ "var": "" }))
        isTrue(isCertLogicOperation({ "var": "x.37.z" }))
        isTrue(isCertLogicOperation({ "and": [ true, 42, false ] }))
    })

})

