const { deepEqual, equal, isFalse, isTrue } = require("chai").assert

import { CertLogicExpression, evaluate, isFalsy, isTruthy } from "../certlogic"


// (purely to test isTruthy and isFalsy functions:)
describe("truthy and falsy", () => {

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



// TODO  all unit tests below should go into /certlogic/testing

describe("var operation", () => {

    it("should return data context on \"\"", () => {
        const data = { foo: "bar" }
        equal(evaluate({ var: "" }, data), data)
    })

    it("should drill into data", () => {
        deepEqual(evaluate({ var: "x" }, { x: 1 }), 1)
        deepEqual(evaluate({ var: "x.0" }, { x: [ 1 ] }), 1)
        deepEqual(evaluate({ var: "xxx.0.yyy" }, { xxx: [ { yyy: 1 } ] }), 1)
    })

    it("should return null on null", () => {
        equal(evaluate({ var: "x" }, null), null)
    })

    it("should return null on undrillables", () => {
        equal(evaluate({ var: "x.y" }, { x: { z: 1 } }), null)
        equal(evaluate({ var: "x.0" }, { x: { z: 1 } }), null)
        equal(evaluate({ var: "x.0" }, { y: { z: 1 } }), null)
        equal(evaluate({ var: "x..z" }, { x: { z: 1 } }), null)
    })

})


describe("if operation", () => {

    it("should work", () => {
        const decider: CertLogicExpression = { "if": [ { var: "" }, "T", "F" ] }
        equal(evaluate(decider, true), "T")
        equal(evaluate(decider, [ "foo" ]), "T")
        equal(evaluate(decider, {}), "T")
        equal(evaluate(decider, null), "F")
        equal(evaluate(decider, false), "F")
    })

})


describe("binary operation", () => {

    it("<= should work as binary", () => {
        equal(evaluate({ "<=": [ 0, 0 ] }, null), true)
        equal(evaluate({ "<=": [ 0, 1 ] }, null), true)
        equal(evaluate({ "<=": [ 1, 1 ] }, null), true)
        equal(evaluate({ "<=": [ 1, 0 ] }, null), false)
    })

    it("<= should work as ternary ('between')", () => {
        equal(evaluate({ "<=": [ 0, 1, 2 ] }, null), true)
        equal(evaluate({ "<=": [ 1, 0, 2 ] }, null), false)
        equal(evaluate({ "<=": [ 0, 2, 1 ] }, null), false)
        equal(evaluate({ "<=": [ 1, 2, 0 ] }, null), false)
        equal(evaluate({ "<=": [ 2, 0, 1 ] }, null), false)
        equal(evaluate({ "<=": [ 2, 1, 0 ] }, null), false)
    })

    it("=== should work", () => {
        isTrue(evaluate({ "===": [ "foo", "foo" ] }, [ "foo", "foo" ]))
        isFalse(evaluate({ "===": [ "foo", "bar" ] }, [ "foo", "foo" ]))
    })

    it("'in' should work", () => {
        isTrue(evaluate({ "in": [ "foo", [ "foo", "bar" ] ] }, null))
        isTrue(evaluate({ "in": [ "bar", [ "foo", "bar" ] ] }, null))
        isFalse(evaluate({ "in": [ "foo", [] ] }, null))
    })

})


describe("and operation", () => {

    it("should work", () => {
        equal(evaluate({ "and": [ true, false ] }, null), false)
        equal(evaluate({ "and": [ null, true ] }, null), null)
        equal(evaluate({ "and": [ true, null, false ] }, null), null)
        deepEqual(evaluate({ "and": [ true, { var: "" } ] }, {}), {})
    })

})

