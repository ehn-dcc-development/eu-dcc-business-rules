const { equal } = require("chai").assert

import { renderAsCompactText } from "../../misc"
import * as f from "../../factories"
import { CertLogicExpression } from "../../typings"


describe("rendering as compact text", () => {

    const rendersAs = (expr: CertLogicExpression, expected: string) => {
        equal(renderAsCompactText(expr), expected)
    }

    it("works for literals", () => {
        rendersAs(true, "true")
        rendersAs(false, "false")
        rendersAs(0, "0")
        rendersAs(42, "42")
        rendersAs(-1, "-1")
        rendersAs("foo", `"foo"`)
    })

    it("works for data accesses", () => {
        rendersAs(f.var_("payload.ver"), "/payload.ver")
    })

    it("works for arrays", () => {
        rendersAs([true, false, f.var_("payload.ver")], "[ true, false, /payload.ver ]")
    })

    it("works for if-then-else", () => {
        rendersAs(f.if_(true, true, false), "if (true) then (true) else (false)")
    })


    it("works for + operation", () => {
        rendersAs(f.binOp_("+", 1, 2), "(1) + (2)")
    })

    it("works for and operation", () => {
        rendersAs(f.and_(true, true, false), "(true) and (true) and (false)")
    })

    /*
     * The + and and operators serve as a catch-all for all binary operators,
     * which are therefore not tested explicitly.
     */


    it("works for not operation", () => {
        rendersAs(f.not_(false), "not (false)")
    })

    it("works for plusTime operation", () => {
        rendersAs(f.plusTime_(f.var_("now"), -1, "day"), "(/now) -1 day")
        rendersAs(f.plusTime_(f.var_("now"), 2, "month"), "(/now) +2 months")
    })

    it("works for reduce operation", () => {
        rendersAs(f.reduce_([ 1, 2, 3 ], f.binOp_("+", f.var_("current"), f.var_("accumulator")), 0), "([ 1, 2, 3 ]).reduce((current, accumulator) → (/current) + (/accumulator), 0)")
    })

    it("works for extractFromUVCI operation", () => {
        rendersAs(f.extractFromUVCI_("UVCI:NL:foo/bar", 2), `extract fragment 2 from UVCI ("UVCI:NL:foo/bar")`)
    })

})

