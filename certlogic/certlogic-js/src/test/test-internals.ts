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
        isTrue(isFalsy([]), "empty array")
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

    const check = (dateTimeLike: string, expected: String) =>
        equal(dateFromString(dateTimeLike).toISOString(), expected)

    it("construct a date from a string without time information (compliant with a JSON Schema \"date\" formatted string)", () => {
        check("2021-05-04", "2021-05-04T00:00:00.000Z")
        check("2021-05-04", "2021-05-04T00:00:00.000Z")
    })

    it("construct date-times from strings in RFC 3339 format (compliant with a JSON Schema \"date-time\" formatted string)", () => {
        check("2021-05-04T13:37:42Z", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42+00:00", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42-00:00", "2021-05-04T13:37:42.000Z")
        check("2021-08-20T12:03:12+02:00", "2021-08-20T10:03:12.000Z")   // (keeps timezone offset)
    })

    it("construct date-times from strings in non-RFC 3339 but ISO 8601 formats", () => {
        check("2021-08-20T12:03:12+02", "2021-08-20T10:03:12.000Z")
        check("2021-05-04T13:37:42+0000", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42-0000", "2021-05-04T13:37:42.000Z")
        check("2021-08-20T12:03:12+0200", "2021-08-20T10:03:12.000Z")
    })

    it("construct date-times from strings which also have millisecond info", () => {
        check("2021-08-01T00:00:00.1Z", "2021-08-01T00:00:00.100Z")       // 100 ms
        check("2021-08-01T00:00:00.01Z", "2021-08-01T00:00:00.010Z")      //  10 ms
        check("2021-08-01T00:00:00.001Z", "2021-08-01T00:00:00.001Z")     //   1 ms
        check("2021-08-01T00:00:00.0001Z", "2021-08-01T00:00:00.000Z")    // 100 µs
        check("2021-08-01T00:00:00.00001Z", "2021-08-01T00:00:00.000Z")   //  10 µs
        check("2021-08-01T00:00:00.000001Z", "2021-08-01T00:00:00.000Z")  //   1 µs
    })

})

