const { deepEqual, fail, isFalse, isTrue } = require("chai").assert

import { extendJsonLogic, applyLogic, ExtendedRulesLogic } from "../extend-json-logic"

extendJsonLogic()


describe("all operation", () => {

    it("example from home page", () => {
        const jlExpr = { "all" : [ [1,2,3], { ">": [ { "var": "" }, 0 ] } ] } as ExtendedRulesLogic
        isTrue(applyLogic(jlExpr, null))
    })

    it("not working correctly on non-arrays", () => {
        const jlExpr = { "all" : [ { "var": "x" }, { "var": "" } ] } as ExtendedRulesLogic
        try {
            isTrue(applyLogic(jlExpr, { x: null }))
            fail("should throw")
        } catch {
            // expected
        }
    })

    it("not working correctly on empty array", () => {
        const jlExpr = { "all" : [ { "var": "x" }, { "var": "" } ] } as ExtendedRulesLogic
        isFalse(applyLogic(jlExpr, { x: [] }))
    })


    const dgc = {
        "ver": "1.0.0",
        "nam": {
            "fn": "Achternaam",
            "fnt": "ACHTERNAAM",
            "gn": "Voornaam",
            "gnt": "VOORNAAM"
        },
        "dob": "2021-01-01",
        "t": [
            {
                "tg": "840539006",
                "tt": "a test",
                "sc": "2021-04-25T12:45:31Z",
                "tr": "260373001",
                "tc": "GGD",
                "co": "SD",
                "is": "Ministry of Health Welfare and Sport",
                "ci": "urn:uvci:01:NL:b54599fc038c45d79bb8013d0b07406e"
            }
        ]
    }

    it("in-GR-EU-0001 (just t)", () => {
        const jlExpr = {
            "all": [
                { "var": "t" },
                {
                    "==": [
                        { "var": "tg" },
                        "840539006"
                    ]
                }
            ]
        } as ExtendedRulesLogic
        isTrue(applyLogic(jlExpr, dgc))
    })

    it("in-GR-EU-0001 (just v, which is missing)", () => {
        const jlExpr = {
            "reduce": [
                {
                    "var": "v"
                },
                {
                    "and": [
                        { "var": "accumulator" },
                        {
                            "==": [
                                { "var": "current.tg" },
                                "840539006"
                            ]
                        }
                    ]
                },
                true
            ]
        } as any as ExtendedRulesLogic
        isTrue(applyLogic(jlExpr, dgc))
    })

})


describe("reduce operation", () => {

    it("alternative to all", () => {
        const jlExpr = { "reduce": [ { "var": "" }, { "and": [ { "var": "current" }, { "var": "accumulator" } ] }, true ] } as ExtendedRulesLogic
        isTrue(applyLogic(jlExpr, null))
        isTrue(applyLogic(jlExpr, []))
        isTrue(applyLogic(jlExpr, [ true ]))
        isFalse(applyLogic(jlExpr, [ false ]))
        isFalse(applyLogic(jlExpr, [ false, true ]))
        isFalse(applyLogic(jlExpr, [ true, false ]))
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


describe("some operation", () => {

    it("some works correctly on empty array", () => {
        const jlExpr = { "some": [ [], { "var": "" } ] } as ExtendedRulesLogic
        deepEqual(applyLogic(jlExpr, null), false)
    })

    it("some works correctly on non-array", () => {
        const jlExpr = { "some": [ { "var": "" }, { "var": "" } ] } as ExtendedRulesLogic
        deepEqual(applyLogic(jlExpr, null), false)
    })

    it("some works correctly on array of booleans", () => {
        const jlExpr = { "some": [ { "var": "" }, { "var": "" } ] } as ExtendedRulesLogic
        deepEqual(applyLogic(jlExpr, null), false)
    })

})


describe("date extensions", () => {

    it("addDays", () => {
        applyLogic({
            "<=": [
                { "addDays": [ { "var": "certificate.date" }, 12 ] },
                { "addDays": [ { "var": "dateObject.current" }, 0 ] },
                { "addDays": [ { "var": "certificate.date" }, 365 ] }
            ]
        } as any as ExtendedRulesLogic, {
            "dateObject": { "current": "2022-05-02T00:00:00Z" }, "certificate": { "date": "2021-05-03T00:00:00Z" }
        })
    })

})

