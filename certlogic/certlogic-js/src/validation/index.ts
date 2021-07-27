export { dataAccesses } from "./data-accesses"
export { validateFormat } from "./format-validator"
export { ValidationError } from "./typings"

import { validateFormat } from "./format-validator"
import { ValidationError } from "./typings"

/**
 * Validate the given CertLogic expression, and return any violations as {@link ValidationError validation errors}.
 */
export const validate = (expr: any): ValidationError[] => validateFormat(expr)

