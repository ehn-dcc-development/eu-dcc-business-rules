export { CertLogicExpression, CertLogicOperation, TimeUnit, timeUnits } from "./typings"
export { isCertLogicExpression, isCertLogicOperation } from "./validation/index"    // also exposed here to not break API
export { isInt } from "./internals" // (export other internals only when necessary)
export { evaluate } from "./evaluator"
export const implementationVersion: string = require("../package.json").version
export const specificationVersion: string = "1.2.3"
