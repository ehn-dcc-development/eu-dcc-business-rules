const { isFalse, isTrue } = require("chai").assert

import { isFalsy, isTruthy } from "../certlogic"


describe("internal functions", () => {

    it("truthy", () => {
        isFalse(isTruthy(undefined))
        isFalse(isTruthy(null))
        isFalse(isTruthy(false))
        isTrue(isTruthy(true))
        isFalse(isTruthy([]))
        isTrue(isTruthy([ "foo" ]))
        isTrue(isTruthy({}))
        isTrue(isTruthy({ foo: "bar" }))
        isFalse(isTruthy("foo"))
        isFalse(isTruthy(42))
    })

    it("falsy", () => {
        isFalse(isFalsy(undefined))
        isTrue(isFalsy(null))
        isTrue(isFalsy(false))
        isFalse(isFalsy(true))
        isFalse(isFalsy([]))
        isFalse(isFalsy({}))
        isFalse(isFalsy(""))
        isFalse(isFalsy(0))
    })

})

