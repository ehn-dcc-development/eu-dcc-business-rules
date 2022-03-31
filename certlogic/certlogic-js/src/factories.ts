import { CertLogicExpression, CertLogicOperation, TimeUnit } from "./typings"

/*
 * Factory functions for all CertLogic operations - for syntactic convenience.
 * All functions are postfixed with an underscore (“_”) to avoid collision with keywords or imported internal functions,
 * and for consistency.
 */

export const var_ = (dataAccessPath: string): CertLogicOperation =>
    ({ "var": dataAccessPath })

export const and_ = (...operands: CertLogicExpression[]): CertLogicOperation =>
    ({ "and": operands })

export const if_ = (guard: CertLogicExpression, then: CertLogicExpression, else_: CertLogicExpression): CertLogicOperation =>
    ({ "if": [ guard, then, else_ ] })

export const binOp_ = (operator: "===" | "in" | "+", leftExpr: CertLogicExpression, rightExpr: CertLogicExpression): CertLogicOperation =>
    ({ [operator]: [ leftExpr, rightExpr] } as CertLogicOperation)

export const comparison_ = (operator: "<" | ">" | "<=" | ">=" | "before" | "after" | "not-after" | "not-before", operand1: CertLogicExpression, operand2: CertLogicExpression, operand3?: CertLogicExpression): CertLogicOperation =>
    ({ [operator]: operand3 === undefined ? [ operand1, operand2 ] : [ operand1, operand2, operand3 ] } as CertLogicOperation)

export const not_ = (expr: CertLogicExpression): CertLogicOperation =>
    ({ "!": [ expr ] })

export const plusTime_ = (dateOperand: CertLogicExpression, amount: number, unit: TimeUnit): CertLogicOperation =>
    ({ "plusTime": [ dateOperand, amount, unit ] })

export const reduce_ = (operand: CertLogicExpression, lambda: CertLogicExpression, initial: CertLogicExpression): CertLogicOperation =>
    ({ "reduce": [ operand, lambda, initial ] })

export const extractFromUVCI_ = (operand: CertLogicExpression, index: number): CertLogicOperation =>
    ({ "extractFromUVCI": [ operand, index ] })

export const dccDateOfBirth_ = (operand: CertLogicExpression): CertLogicOperation =>
    ({ "dccDateOfBirth": [ operand ] })

