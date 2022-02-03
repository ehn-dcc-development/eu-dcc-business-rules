const { equal, isFalse, isTrue } = require("chai").assert

import {
    isCertLogicExpression,
    isCertLogicOperation,
    validateFormat
} from "../../validation"


const assertErrors = (expr: any, ...messages: string[]) => {
    const errors = validateFormat(expr)
    equal(errors.length, messages.length, "number of errors")
    errors.forEach((error, index) => {
        equal(error.expr, expr)
        equal(error.message, messages[index])
        isFalse(isCertLogicExpression(expr))
    })
    if (errors.length === 0) {
        isTrue(isCertLogicExpression(expr))
    }
}


describe("basic literals", () => {

    it("should recognise valid basic literals", () => {
        assertErrors("")
        assertErrors("foo")
        assertErrors(0)
        assertErrors(42)
        assertErrors(false)
        assertErrors(true)
    })

    it("should recognise invalid basic literals", () => {
        assertErrors(undefined, "invalid CertLogic expression")
        assertErrors(null, "invalid CertLogic expression")
        assertErrors(3.14, "3.14 is a non-integer number")
    })

})


describe("operation objects", () => {

    it("should recognise invalid operation objects", () => {
        assertErrors({}, "expression object must have exactly one key, but it has 0")
        assertErrors({ foo: "bar", alice: "bob" }, "expression object must have exactly one key, but it has 2")
        assertErrors({ all: "foo" }, `operation not of the form { "<operator>": [ <values...> ] }`)
        assertErrors({ all: 42.0 }, `operation not of the form { "<operator>": [ <values...> ] }`)
        assertErrors({ all: true }, `operation not of the form { "<operator>": [ <values...> ] }`)
        assertErrors({ all: false }, `operation not of the form { "<operator>": [ <values...> ] }`)
        assertErrors({ all: undefined }, `operation not of the form { "<operator>": [ <values...> ] }`)
        assertErrors({ all: null }, `operation not of the form { "<operator>": [ <values...> ] }`)
    })

    it("should recognise unknown operators", () => {
        assertErrors({ all: [] }, `unrecognised operator: "all"`)
        assertErrors({ all: [ null ] }, `unrecognised operator: "all"`)
    })

})


describe("var operations", () => {

    it("should correctly validate var operations", () => {
        assertErrors({ var: undefined }, `not of the form { "var": "<path>" }`)
        assertErrors({ var: 0 }, `not of the form { "var": "<path>" }`)
        assertErrors({ var: "x" })
        isTrue(isCertLogicOperation({ var: "x" }))
        assertErrors({ var: "x.0.y" })
        assertErrors({ var: "1" })
        assertErrors({ var: "x." }, "data access path doesn't have a valid format: x.")
    })

})

