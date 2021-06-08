const { deepEqual } = require("chai").assert

import { booleanType, integerType, nullType, sumOf, typeFrom } from "../types"


describe("drilling type-wise down into compound types", () => {

    it("into an object", () => {
        deepEqual(
            typeFrom({ type: "object", properties: { "x": integerType }, required: [ "x" ] }, "y"),
            nullType
        )
        deepEqual(
            typeFrom({ type: "object", properties: { "x": integerType }, required: [ "x" ] }, "x"),
            integerType
        )
        deepEqual(
            typeFrom({ type: "object", properties: { "x": integerType } }, "x"),
            sumOf(integerType, nullType)
        )
    })

    it("into an array", () => {
        deepEqual(
            typeFrom({ type: "array", items: integerType }, 0),
            integerType
        )
        deepEqual(
            typeFrom({ type: "array", items: [ integerType, booleanType, nullType ] }, 0),
            integerType
        )
    })

})

