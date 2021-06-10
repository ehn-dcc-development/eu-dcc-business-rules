const { equal, isFalse, isTrue } = require("chai").assert

import { dateFromString, isFalsy, isTruthy } from "../internals"


describe("truthy and falsy", () => {

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


describe("parsing of dates/date-times", () => {

    it("construct a date from a string without time information (compliant with a JSON Schema \"date\" formatted string)", () => {
        equal(dateFromString("2021-05-04").toISOString(), "2021-05-04T00:00:00.000Z")
    })

    it("construct date-times from strings in RFC 3339 format (compliant with a JSON Schema \"date-time\" formatted string)", () => {
        equal(dateFromString("2021-05-04T13:37:42Z").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(dateFromString("2021-05-04T13:37:42+00:00").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(dateFromString("2021-05-04T13:37:42-00:00").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(dateFromString("2021-08-20T12:03:12+02:00").toISOString(), "2021-08-20T10:03:12.000Z")   // (keeps timezone offset)
    })

    it("construct date-times from strings in non-RFC 3339 but ISO 8601 formats", () => {
        equal(dateFromString("2021-08-20T12:03:12+02").toISOString(), "2021-08-20T10:03:12.000Z")
        equal(dateFromString("2021-05-04T13:37:42+0000").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(dateFromString("2021-05-04T13:37:42-0000").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(dateFromString("2021-08-20T12:03:12+0200").toISOString(), "2021-08-20T10:03:12.000Z")
    })

})

