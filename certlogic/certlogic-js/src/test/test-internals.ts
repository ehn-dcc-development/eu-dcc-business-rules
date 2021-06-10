const { isFalse, isTrue } = require("chai").assert

import { isFalsy, isTruthy } from "../internals"


describe("internal functions", () => {

    it("truthy", () => {
        isFalse(isTruthy(undefined))
        isFalse(isTruthy(null))
        isFalse(isTruthy(false))
        isTrue(isTruthy(true))
        isFalse(isTruthy([]), "empty array")
        isTrue(isTruthy([ "foo" ]), "non-empty array")
        isTrue(isTruthy({}), "empty object")
        isTrue(isTruthy({ foo: "bar" }), "non-empty object")
        isTrue(isTruthy("foo"))
        isFalse(isTruthy(""))
        isTrue(isTruthy(42))
        isFalse(isTruthy(0))
    })

    it("falsy", () => {
        isFalse(isFalsy(undefined))
        isTrue(isFalsy(null))
        isTrue(isFalsy(false))
        isFalse(isFalsy(true))
        isFalse(isFalsy([]), "empty array")
        isFalse(isFalsy([ "foo" ]), "non-empty array")
        isFalse(isFalsy({}), "empty object")
        isFalse(isFalsy({ foo: "bar" }), "non-empty object")
        isFalse(isFalsy("foo"))
        isTrue(isFalsy(""))
        isFalse(isFalsy(42))
        isTrue(isFalsy(0))
    })

})

