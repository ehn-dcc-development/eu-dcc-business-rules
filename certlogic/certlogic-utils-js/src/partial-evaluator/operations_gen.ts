import {TimeUnit} from "certlogic-js"

import {CLExtExpr} from "./extended-types"


/**
 * Type definition for CertLogic operations which may recursively use the _extended_ CertLogic type.
 
 * This type def. is *generated* from the specification in meta/certlogic-operation-specs.json,
 * by (running) meta/operations-generator.ts - which is a step in the build.sh script.
 * *Warning:* don't change this file directly, but change that specification and/or the generator!
 */
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

