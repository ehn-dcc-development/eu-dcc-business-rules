import {TimeUnit} from "certlogic-js"

import {CLExtExpr} from "./extended-types"

export type CLExtOperation =
    | { "var": string }
    | { "and": CLExtExpr[] }
    | { "if": [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "===": [ CLExtExpr, CLExtExpr ] }
    | { "<": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { ">": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "<=": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { ">=": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "before": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "after": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "not-after": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "not-before": [ CLExtExpr, CLExtExpr ] | [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "in": [ CLExtExpr, CLExtExpr ] }
    | { "+": [ CLExtExpr, CLExtExpr ] }
    | { "!": [ CLExtExpr ] }
    | { "plusTime": [ CLExtExpr, number, TimeUnit ] }
    | { "reduce": [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    | { "extractFromUVCI": [ CLExtExpr, number ] }

