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

import { validate } from "./validation"

/**
 * Type guard function to be able to infer `any` value reliably as a CertLogicExpression.
 */
export const isCertLogicExpression = (expr: any): expr is CertLogicExpression =>
    validate(expr).length === 0


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
    | { "in": [ CertLogicExpression, CertLogicExpression ] }
    | { "+": [ CertLogicExpression, CertLogicExpression ] }
    | { "!": [ CertLogicExpression ] }
    | { "plusTime": [ CertLogicExpression, number, TimeUnit ] }
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    | { "extractFromUVCI": [ CertLogicExpression, number ] }

import { isDictionary } from "./internals"

/**
 * Type guard function to be able to infer `any` value reliably as a CertLogicOperation.
 */
export const isCertLogicOperation = (expr: any): expr is CertLogicOperation =>
    isCertLogicExpression(expr) && isDictionary(expr)


/**
 * The type definition of the time units that can be used as the third operand of a `plusTime` operation.
 */
export type TimeUnit = "year" | "month" | "day" | "hour"

/**
 * All time units as an array.
 */
export const timeUnits: TimeUnit[] = [ "year", "month", "day", "hour" ]

