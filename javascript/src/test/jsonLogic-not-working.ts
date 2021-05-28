const { deepEqual, fail, isFalse, isTrue } = require("chai").assert

import { extendJsonLogic, applyLogic, JsonLogicRule } from "../extend-JsonLogic"

extendJsonLogic()


describe("all operation", () => {

    it("not working correctly on non-arrays", () => {
        const jlExpr = { "all" : [ { "var": "x" }, { "var": "" } ] } as JsonLogicRule
        try {
            isTrue(applyLogic(jlExpr, { x: null }))
            fail("should throw")
        } catch {
            // expected
        }
    })

    it("not working correctly on empty array", () => {
        const jlExpr = { "all" : [ { "var": "x" }, { "var": "" } ] } as JsonLogicRule
        isFalse(applyLogic(jlExpr, { x: [] }))
    })


})


describe("some can't be used as a workaround for all - it effectively also rescopes data", () => {

    // <arr>.all(<lambda>) === ! <arr>.some(! <lambda>)
    // ...but <arr>.some(<lambda>) === #<arr>.filter(<lambda>) > 0 (expanded)
    it("try to workaround all", () => {
        const jlExpr: JsonLogicRule = { "!": [ { "some": [ { "var": "x" }, { "!": [ { "in": [ { "var": "y" }, { "var": "z" } ] } ] } ] } ] }
            // === !x.some(!(it.y in z))
            // === x.all(it.y in z)
        isFalse(applyLogic(jlExpr, { "x": [ { "y": 2 } ], "z": [ 2 ] }))    // Should be true, but { "var": "z" } evaluates to null, and !(2 in null).
        isFalse(applyLogic(jlExpr, { "x": [ { "y": 1 } ], "z": [ 2 ] }))
    })

})


describe("merge operation", () => {

    it("leaves nulls in-place", () => {
        const jlExpr = { "merge": [ { "var": "r" }, { "var": "t" }, { "var": "v" } ] }
        deepEqual(
            applyLogic(jlExpr, { "v": [ { "tg": "COVID-19" } ], "t": [] }),
            [ null, { "tg": "COVID-19" } ]  // First entry is null, because "t" is missing.
        )
    })

})


describe("in", () => {

    it("can't be used i.c.w. an all reduction addressing the data context's root", () => {
        const jlExpr: JsonLogicRule = {
            "all": [
                {
                    "var": "payload.r"
                },
                {
                    "in": [
                        {
                            "var": "tg"
                        },
                        {
                            "var": "external.valueSets.disease-agent-targeted"
                        }
                    ]
                }
            ]
        }
        const external = {
            valueSets: {
                "disease-agent-targeted": "COVID-19"
            }
        }
        isFalse(applyLogic(jlExpr, { payload: { r: [ { tg: null } ] }, ...external }))
        isFalse(applyLogic(jlExpr, { payload: { r: [ { tg: external.valueSets["disease-agent-targeted"] } ] }, ...external }))  // But should be true!
    })

})

