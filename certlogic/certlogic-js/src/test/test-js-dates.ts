const { equal, isFalse, isTrue, throws } = require("chai").assert


// (check out the JS-specific shenanigans w.r.t. dates:)
describe("JavaScript Date", () => {

    it("constructing a date-time using new Date(<string>)", () => {
        const date = new Date("2021-05-02T00:00:00+00:00")
        isTrue(typeof date === "object" && "toISOString" in date)
    })

    it("comparison of identical dates constructed with new Date(<string>)", () => {
        const d1 = new Date("2021-05-02T00:00:00+00:00")
        const d2 = new Date("2021-05-02T00:00:00+00:00")
        isTrue( d1 <= d2)
        isTrue( d1 >= d2)
        isFalse(d1 < d2)
        isFalse(d1 > d2)
        // Would naively expect the following to be true!:
        isFalse(d1 == d2, "== comparison")
        isFalse(d1 === d2, "=== comparison")
        // But works as follows:
        isTrue(d1.getTime() == d2.getTime(), "== comparison after .getTime()")
        isTrue(d1.getTime() === d2.getTime(), "=== comparison after .getTime()")
    })

    it("comparison of unequal dates using dates constructed with new Date(<string>)", () => {
        const d1 = new Date("2021-05-02T00:00:00+00:00")
        const d2 = new Date("2021-05-29T00:00:00+00:00")
        isTrue( d1 <= d2)
        isFalse( d1 >= d2)
        isTrue(d1 < d2)
        isFalse(d1 > d2)
    })

    it("date without time information (compliant with a JSON Schema \"date\" formatted string)", () => {
        equal(new Date("2021-05-04").toISOString(), "2021-05-04T00:00:00.000Z")
    })

    it("construct date-times in RFC 3339 format (compliant with a JSON Schema \"date-time\" formatted string)", () => {
        equal(new Date("2021-05-04T13:37:42Z").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(new Date("2021-05-04T13:37:42+00:00").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(new Date("2021-05-04T13:37:42-00:00").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(new Date("2021-08-20T12:03:12+02:00").toISOString(), "2021-08-20T10:03:12.000Z")
    })

    it("try to construct date-times in non-RFC 3339 but ISO 8601 formats", () => {
        // succeeds, so JavaScript's Date is more permissive than RFC 3339:
        equal(new Date("2021-05-04T13:37:42+0000").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(new Date("2021-05-04T13:37:42-0000").toISOString(), "2021-05-04T13:37:42.000Z")
        equal(new Date("2021-08-20T12:03:12+0200").toISOString(), "2021-08-20T10:03:12.000Z")
        // doesn't succeed, but only when trying to do something with the date
        const date = new Date("2021-08-20T12:03:12+02")
        throws(() => date.toISOString(), /Invalid time value/)
    })

})

