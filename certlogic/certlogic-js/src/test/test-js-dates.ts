const { equal, isFalse, isTrue } = require("chai").assert


describe("dates", () => {

    it("constructing a date using new Date(<string>)", () => {
        const date = new Date("2021-05-02T00:00:00+00:00")
        isTrue(typeof date === "object" && "toISOString" in date)
    })

    it("comparison of identical dates using dates constructed with new Date(<string>)", () => {
        const d1 = new Date("2021-05-02T00:00:00+00:00")
        const d2 = new Date("2021-05-02T00:00:00+00:00")
        isTrue( d1 <= d2)
        isTrue( d1 >= d2)
        isFalse(d1 < d2)
        isFalse(d1 > d2)
        // Would expect the following to be true!:
        isFalse(d1 == d2, "== comparison")
        isFalse(d1 === d2, "=== comparison")
    })

    it("comparison of unequal dates using dates constructed with new Date(<string>)", () => {
        const d1 = new Date("2021-05-02T00:00:00+00:00")
        const d2 = new Date("2021-05-29T00:00:00+00:00")
        isTrue( d1 <= d2)
        isFalse( d1 >= d2)
        isTrue(d1 < d2)
        isFalse(d1 > d2)
        isFalse(d1 == d2)
        isFalse(d1 === d2)
    })

    // TODO  add tests with different timezone formats

})

