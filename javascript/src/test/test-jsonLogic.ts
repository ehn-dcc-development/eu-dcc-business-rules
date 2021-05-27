const { equal, isFalse, isTrue } = require("chai").assert

import { applyLogic, extendJsonLogic, JsonLogicRule } from "../extend-JsonLogic"

extendJsonLogic()


describe("all operation", () => {

    it("example from home page", () => {
        const jlExpr: JsonLogicRule = { "all" : [ [1,2,3], { ">": [ { "var": "" }, 0 ] } ] }
        isTrue(applyLogic(jlExpr, null))
    })


    const dcc = {
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
        const jlExpr: JsonLogicRule = {
            "all": [
                { "var": "t" },
                {
                    "==": [
                        { "var": "tg" },
                        "840539006"
                    ]
                }
            ]
        }
        isTrue(applyLogic(jlExpr, dcc))
    })

    it("in-GR-EU-0001 (just v, which is missing)", () => {
        const jlExpr: JsonLogicRule = {
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
        }
        isTrue(applyLogic(jlExpr, dcc))
    })

})


describe("reduce operation", () => {

    it("alternative to all", () => {
        const jlExpr: JsonLogicRule = { "reduce": [ { "var": "" }, { "and": [ { "var": "current" }, { "var": "accumulator" } ] }, true ] }
        isTrue(applyLogic(jlExpr, null))
        isTrue(applyLogic(jlExpr, []))
        isTrue(applyLogic(jlExpr, [ true ]))
        isFalse(applyLogic(jlExpr, [ false ]))
        isFalse(applyLogic(jlExpr, [ false, true ]))
        isFalse(applyLogic(jlExpr, [ true, false ]))
    })

    it("another correction to all", () => {
        const jlExpr: JsonLogicRule = {
            "if": [
                { "!": [ { "var": "" } ] },
                true,
                { "all": [      // forall x in it: x.n == 1
                    { "var": "" },
                    { "==": [ { "var": "n" }, 1 ] }
                ] }
            ]
        }
        isTrue(applyLogic(jlExpr, null))
        isTrue(applyLogic(jlExpr, []))
        isFalse(applyLogic(jlExpr, [ { n: 0 } ]))
        isFalse(applyLogic(jlExpr, [ { n: null } ]))
        isTrue(applyLogic(jlExpr, [ { n: 1 } ]))
        isFalse(applyLogic(jlExpr, [ { n: 1 }, { n: 2 } ]))
        isFalse(applyLogic(jlExpr, [ { n: 2 }, { n: 1 } ]))
    })

    it("can count non-empties", () => {
        const jlExpr: JsonLogicRule = {
            "reduce": [
                { "var": "" },
                {
                    "+": [
                        { "var": "accumulator" },
                        {
                            "if": [
                                { "var": "current" },
                                1,
                                0
                            ]
                        }
                    ]
                },
                0
            ]
        }
        equal(applyLogic(jlExpr, []), 0)
        equal(applyLogic(jlExpr, [ 1 ]), 1)
        equal(applyLogic(jlExpr, [ 1, 2 ]), 2)
        equal(applyLogic(jlExpr, [ 1, 2, 3 ]), 3)
        equal(applyLogic(jlExpr, [ 1, 2, 3, null ]), 3)
    })

    it("can count non-empties", () => {
        const jlExpr: JsonLogicRule = {
            "reduce": [
                { "var": "" },
                {
                    "+": [
                        { "var": "accumulator" },
                        {
                            "if": [
                                { "!": [ { "var": "current" } ] },
                                0,
                                1
                            ]
                        }
                    ]
                },
                0
            ]
        }
        equal(applyLogic(jlExpr, []), 0)
        equal(applyLogic(jlExpr, [ null ]), 0)
        equal(applyLogic(jlExpr, [ [] ]), 0)
        equal(applyLogic(jlExpr, [ ["foo"] ]), 1)
        equal(applyLogic(jlExpr, [ ["foo"], ["bar"] ]), 2)
        equal(applyLogic(jlExpr, [ ["foo"], ["bar"], null ]), 2)
    })

    it("can count non-empties after data access", () => {
        const jlExpr: JsonLogicRule = {
            "reduce": [
                [
                    { "var": "r" },
                    { "var": "t" },
                    { "var": "v" }

                ],
                {
                    "+": [
                        { "var": "accumulator" },
                        {
                            "if": [
                                { "!": [ { "var": "current" } ] },
                                0,
                                1
                            ]
                        }
                    ]
                },
                0
            ]
        }
        equal(applyLogic(jlExpr, {}), 0)
        equal(applyLogic(jlExpr, { "r": null }), 0)
        equal(applyLogic(jlExpr, { "r": [] }), 0)
        equal(applyLogic(jlExpr, { "r": [ 1 ] }), 1)
        equal(applyLogic(jlExpr, { "r": [ 1 ], "v": [] }), 1)
        equal(applyLogic(jlExpr, { "r": [ 1 ], "v": [ 1 ] }), 2)
        equal(applyLogic(jlExpr, { "r": [ 1 ], "v": [ 1 ], "t": [] }), 2)
        equal(applyLogic(jlExpr, { "r": [ 1 ], "v": [ 1, 2 ], "t": [ 1 ] }), 3)
        equal(applyLogic(jlExpr, { "v": [ 1 ], "t": [ 1 ] }), 2)
        equal(applyLogic(jlExpr, { "r": [ 1 ], "t": [ 1 ] }), 2)
        equal(applyLogic(jlExpr, { "v": [ 1, 2 ] }), 1)
    })

})


describe("some operation", () => {

    it("some works correctly on empty array", () => {
        const jlExpr: JsonLogicRule = { "some": [ [], { "var": "" } ] }
        isFalse(applyLogic(jlExpr, []))
    })

    it("some works correctly on non-array", () => {
        const jlExpr: JsonLogicRule = { "some": [ { "var": "" }, { "var": "" } ] }
        isFalse(applyLogic(jlExpr, null))
        isFalse(applyLogic(jlExpr, {}))
    })

    it("some works correctly on array of booleans", () => {
        const jlExpr: JsonLogicRule = { "some": [ { "var": "" }, { "var": "" } ] }
        isFalse(applyLogic(jlExpr, [ false ]))
        isFalse(applyLogic(jlExpr, [ false, false ]))
        isTrue(applyLogic(jlExpr, [ false, true ]))
    })

})


describe("date extensions", () => {

    it("addDays", () => {
        isTrue(applyLogic({
                "<=": [
                    { "addDays": [ { "var": "certificate.date" }, 12 ] },
                    { "addDays": [ { "var": "dateObject.current" }, 0 ] },
                    { "addDays": [ { "var": "certificate.date" }, 365 ] }
                ]
            }, {
                "dateObject": { "current": "2022-05-02T00:00:00Z" }, "certificate": { "date": "2021-05-03T00:00:00Z" }
            })
        )
    })

})


describe("var operation", () => {

    it("mixing properties and indices", () => {
        equal(
            applyLogic({ "var": "t.0.tg" }, { "t": [ { "tg": "COVID-19" } ] }),
            "COVID-19"
        )
    })

    it("drilling down across undefined", () => {
        equal(
            applyLogic({ "var": "t.0.tg" }, { "t": [] }),
            null
        )
        equal(
            applyLogic({ "var": "v.0.tg" }, { "t": [ { "tg": "COVID-19" } ] }),
            null
        )
    })

})


describe("not operation", () => {

    it("can be used to test #array <= 1", () => {
        const jlExpr: JsonLogicRule = { "!": [ { "var": "r.1" } ] }
        isTrue(applyLogic(jlExpr, {}))
        isTrue(applyLogic(jlExpr, { "r": [] }))
        isTrue(applyLogic(jlExpr, { "r": [ { "tg": null } ] }))
        isFalse(applyLogic(jlExpr, { "r": [ { "tg": null }, { "tg": null } ] }))
        isFalse(applyLogic(jlExpr, { "r": [ { "tg": null }, { "tg": null }, { "tg": null } ] }))
    })

})


describe("in", () => {

    it("works as expected", () => {
        const jlExpr: JsonLogicRule = {
            "in": [
                {
                    "var": "tg"
                },
                [
                    "840539006"
                ]
            ]
        }
        isFalse(applyLogic(jlExpr, { tg: null}))
        isTrue(applyLogic(jlExpr, { tg: "840539006" }))
    })

    it("can be used i.c.w. all reduction", () => {
        const jlExpr: JsonLogicRule = {
            "all": [
                {
                    "var": "r"
                },
                {
                    "in": [
                        {
                            "var": "tg"
                        },
                        [
                            "840539006"
                        ]
                    ]
                }
            ]
        }
        isFalse(applyLogic(jlExpr, { r: [ { tg: null } ] }))
        isTrue(applyLogic(jlExpr, { r: [ { tg: "840539006" } ] }))
    })

    it("can be used i.c.w. an all reduction (surrounded by an if)", () => {
        const jlExpr: JsonLogicRule = {
            "if": [
                {"!": [{"var": "hcert.r.0"}]},
                true,
                {
                    "all": [
                        {
                            "var": "hcert.r"
                        },
                        {
                            "in": [
                                {
                                    "var": "tg"
                                },
                                [
                                    "840539006"
                                ]
                            ]
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
        isTrue(applyLogic(jlExpr, { hcert: {}, ...external }))
        isTrue(applyLogic(jlExpr, { hcert: { r: [] }, ...external }))
        isTrue(applyLogic(jlExpr, { hcert: { r: [ null ] }, ...external }))
        isFalse(applyLogic(jlExpr, { hcert: { r: [ { tg: null } ] }, ...external }))
        isTrue(applyLogic(jlExpr, { hcert: { r: [ { tg: "840539006" } ] }, ...external }))
    })

})

