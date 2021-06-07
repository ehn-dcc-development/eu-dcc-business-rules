export { validateFormat } from "./format-validator"
export { typeOf } from "./type-calculator"
// export * from "./type-checker"
export { ValidationError } from "./typings"

import { validateFormat } from "./format-validator"
import { ValidationError } from "./typings"
export const validate = (expr: any): ValidationError[] => validateFormat(expr)

