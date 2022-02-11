const { deepEqual } = require("chai").assert

import { if_ } from "../../factories"
import { CertLogicExpression, evaluate } from "../../index"

import { desugar } from "../../misc"


describe("desugaring", () => {

    const assert = (expr: any, expectedDesugared: CertLogicExpression, expectedEvaluationResult: any) => {
        const actualDesugared = desugar(expr)
        deepEqual(actualDesugared, expectedDesugared)
        deepEqual(evaluate(actualDesugared, {}), expectedEvaluationResult)
    }

    it("should work for a 1-operand or", () => {
        assert({ "or": [ false ] }, false, false)
    })

    it("should work for a 2-operand or", () => {
        assert(
            { "or": [ [], true ] },
            if_([], [], true),
            true
        )
        assert(
            { "or": [ "foo", false ] },
            if_("foo", "foo", false), "foo"
        )
    })

    it("should work for a 3-operand or", () => {
        assert(
            { "or": [ [], true, false ] },
            if_([], [], if_(true, true, false)),
            true
        )
    })

    it("should work for nested ORs", () => {
        assert(
            { "or": [ false, true, { "or": [ false, false ] }] },
            if_(false, false, if_(true, true, if_(false, false, false))),
            true
        )
    })

})

