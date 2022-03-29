/**
 * Type definition for generic CertLogic expressions.
 */
export type CertLogicExpression =
    | CertLogicExpression[]
    | CertLogicOperation
    // literals:
    | boolean
    | number    // ...which should be an integer...
    | string


/**
 * Type definition for CertLogic operations.
 */
export type CertLogicOperation =
    | { "var": string }
    | { "and": CertLogicExpression[] }
    | { "if": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "===": [ CertLogicExpression, CertLogicExpression ] }
    | { "<": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "<=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { ">=": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "before": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "after": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "not-after": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "not-before": [ CertLogicExpression, CertLogicExpression ] | [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "in": [ CertLogicExpression, CertLogicExpression ] }
    | { "+": [ CertLogicExpression, CertLogicExpression ] }
    | { "!": [ CertLogicExpression ] }
    | { "plusTime": [ CertLogicExpression, number, TimeUnit ] }
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "extractFromUVCI": [ CertLogicExpression, number ] }
    | { "dccDateOfBirth": [ CertLogicExpression ] }


/**
 * The type definition of the time units that can be used as the third operand of a `plusTime` operation.
 */
export type TimeUnit = "year" | "month" | "day" | "hour"

/**
 * All time units as an array.
 */
export const timeUnits: TimeUnit[] = [ "year", "month", "day", "hour" ]

