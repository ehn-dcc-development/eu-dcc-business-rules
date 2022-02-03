export { dataAccesses, dataAccessesWithContext } from "./data-accesses"
export { validateFormat } from "./format-validator"
export { ValidationError } from "./typings"

import { validateFormat } from "./format-validator"
import { ValidationError } from "./typings"

/**
 * Validate the given CertLogic expression, and return any violations as {@link ValidationError validation errors}.
 */
export const validate = (expr: unknown): ValidationError[] => validateFormat(expr)


import { CertLogicExpression, CertLogicOperation } from "../typings"

/**
 * Type predicate function to be able to infer `any` value reliably as a CertLogicExpression.
 */
export const isCertLogicExpression = (expr: unknown): expr is CertLogicExpression =>
    validate(expr).length === 0


import { isDictionary } from "../internals"

/**
 * Type predicate function to be able to infer `any` value reliably as a CertLogicOperation.
 */
export const isCertLogicOperation = (expr: unknown): expr is CertLogicOperation =>
    isCertLogicExpression(expr) && isDictionary(expr)
// TODO  test type predicate

