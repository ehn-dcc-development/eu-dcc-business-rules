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


/*
 * Note: the validator is tested primarily through the validation test suite.
 * The tests remaining here deal with JavaScript's undefined value (which can't be represented in a JSON file),
 * and the internal isCertLogicOperation function.
 */


describe("basic literals", () => {

    it("should recognise invalid basic literals", () => {
        assertErrors(undefined, "invalid CertLogic expression")
    })

})


describe("operation objects", () => {

    it("should recognise invalid operation objects", () => {
        assertErrors({ all: undefined }, `operation not of the form { "<operator>": [ <values...> ] }`)
    })

})


describe("var operations", () => {

    it("should correctly validate var operations", () => {
        assertErrors({ var: undefined }, `not of the form { "var": "<path>" }`)
        isTrue(isCertLogicOperation({ var: "x" }))
    })

})

