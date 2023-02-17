const {equal, isTrue, isFalse} = require("chai").assert

import {isCertLogicOperation} from "certlogic-js"
import {and_, if_, var_} from "certlogic-js/dist/factories"

import {
    CLExtExpr,
    CLWrapped,
    evaluatePartially,
    isCertLogicExpression,
    isCertLogicLiteral,
    NeedWrapping,
    Unknown,
    wrapData
} from "../../partial-evaluator"


const isJsonValue = (expr: CLExtExpr, expectedValue: unknown) => {
    isTrue(isCertLogicLiteral(expr))
    equal(expr, expectedValue)
}

const isObjectValue = (expr: CLExtExpr, expectValue: NeedWrapping) => {
    isTrue(expr instanceof CLWrapped)
    equal((expr as CLWrapped).value, expectValue)
}

const isDataAccess = (expr: CLExtExpr, expectedPath: string) => {
    isTrue(typeof expr === "object")
    isFalse(Array.isArray(expr))
    const [operator, operands] = Object.entries(expr)[0]
    equal(operator, "var")
    equal(operands, expectedPath)
}


describe(`[partial-evaluator] data access ("var")`, () => {

    it(`reduces to null on missing values`, () => {
        const expr = var_("x.0.z")
        const reducedExpr = evaluatePartially(expr, {})
        isObjectValue(reducedExpr, null)
    })

    it(`wraps values properly`, () => {
        const expr = var_("x")
        const reducedExpr = evaluatePartially(expr, { "x": [1, 2] })
        isTrue(Array.isArray(reducedExpr))
        equal((reducedExpr as any[])[0], 1)
        equal((reducedExpr as any[])[1], 2)
    })

})


describe(`[partial-evaluator] "if" operation`, () => {

    it(`evaluates to the "then" on a guard that evaluates to a truthy value`, () => {
        const expr = if_(var_("x.0.z"), true, false)
        const reducedExpr = evaluatePartially(expr, { "x": [ { "z": ["foo"] }]  })
        isJsonValue(reducedExpr, true)
    })

    it(`evaluates to the "else" on a guard that evaluates to a falsy value`, () => {
        const expr = if_(var_("x.0.z"), true, false)
        const reducedExpr = evaluatePartially(expr, {})
        isJsonValue(reducedExpr, false)
    })

    it(`reduces only partially on a guard whose truthiness/falsiness can't be established`, () => {
        const expr = if_(var_("x"), true, false)
        const reducedExpr = evaluatePartially(expr, { "x": Unknown })
        isTrue(isCertLogicOperation(reducedExpr))
        const [operator, operands] = Object.entries(reducedExpr)[0]
        equal(operator, "if")
        const [guard_, then_, else_] = operands
        isDataAccess(guard_, "x")
        isJsonValue(then_, true)
        isJsonValue(else_, false)
    })

    it(`reduces trivially with else's and then's that evaluate to true`, () => {
        const expr = if_(var_("x"), true, true)
        const reducedExpr = evaluatePartially(expr, { "x": Unknown })
        isTrue(isCertLogicExpression(reducedExpr))
        equal(reducedExpr, true)
    })

})


describe(`[partial-evaluator] "and" operation`, () => {

    it(`evaluates to true when no operands are given`, () => {
        const expr = and_()
        const reducedExpr = evaluatePartially(expr, {})
        isJsonValue(reducedExpr, true)
    })

    it(`evaluates to the operand when only 1 operand is given`, () => {
        const expr = and_(var_("x"))
        const reducedExpr = evaluatePartially(expr, { "x": Unknown })
        isDataAccess(reducedExpr, "x")
    })

    it(`evaluates to the 2nd operand when the 1st operand is truthy`, () => {
        const expr = and_(true, var_("x"))
        const reducedExpr = evaluatePartially(expr, { "x": Unknown })
        isDataAccess(reducedExpr, "x")
    })

    // TODO  add more cases

})


describe(`[partial-evaluator] "!" (not) operation`, () => {

    it(`evaluates to true on a null value`, () => {
        const expr = { "!": [wrapData(null)] }
        const reducedExpr = evaluatePartially(expr, {})
        isJsonValue(reducedExpr, true)
    })

})


describe(`[partial-evaluator] "reduce" operation`, () => {

    it(`evaluates to a constant on constant input`, () => {
        const expr = {
            "reduce": [
                var_("nums"),
                { "+": [var_("accumulator"), var_("current")] },
                0
            ]
        }
        const reducedExpr = evaluatePartially(expr, { nums: [ 1, 2 ] })
        isJsonValue(reducedExpr, 3)
    })

})


describe(`[partial-evaluator] "+" operation`, () => {

    it(`works`, () => {
        const expr = { "+": [1, 2] }
        const reducedExpr = evaluatePartially(expr, {})
        isJsonValue(reducedExpr, 3)
    })

})

