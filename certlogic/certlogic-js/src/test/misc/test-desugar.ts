const { deepEqual } = require("chai").assert

import { desugar } from "../../misc"
import { and_, not_ } from "../../factories"


describe("desugaring", () => {

    it("should work for nested ORs", () => {
        const expectedDesugaring = {
            "!": [
                {
                    "and": [
                        {
                            "!": [ false ]
                        },
                        {
                            "!": [ true ]
                        },
                        {
                            "!": [
                                {
                                    "!": [
                                        {
                                            "and": [
                                                {
                                                    "!": [ false ]
                                                },
                                                {
                                                    "!": [ false ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        deepEqual(
            desugar({ "or": [ false, true, { "or": [ false, false ] }] }),
            expectedDesugaring
        )
        // check equivalence with same expression constructed through factory methods:
        deepEqual(
            expectedDesugaring,
            not_(and_(not_(false), not_(true), not_(not_(and_(not_(false), not_(false))))))
        )
    })

})

