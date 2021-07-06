/**
 * Type definition for CertLogic expressions.
 */
export type CertLogicExpression =
    | CertLogicExpression[]
    | { "var": string }
    | { "and": CertLogicExpression[] }
    | { "if": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "===": [ CertLogicExpression, CertLogicExpression ] }
    | { "<": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "<=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "in": [ CertLogicExpression, CertLogicExpression ] }
    | { "+": [ CertLogicExpression, CertLogicExpression ] }
    | { "!": [ CertLogicExpression ] }
    | { "plusTime": [ CertLogicExpression, number, TimeUnit ] }
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    // literals:
    | boolean
    | number    // ...which should be an integer...
    | string

export type TimeUnit = "year" | "month" | "day" | "hour"

export const timeUnits: TimeUnit[] = [ "year", "month", "day", "hour" ]

