import {CertLogicExpression} from "certlogic-js"
import {isFalsy, isInt, isTruthy} from "certlogic-js/dist/internals"
import deepEqual from "deep-equal"

import {CLExtExpr, CLUnknown, CLWrapped} from "./extended-types"


/**
 * Determine whether the given value is a valid CertLogic expression.
 */
export const isCertLogicExpression = (expr: CLExtExpr): expr is CertLogicExpression => {
    if (expr instanceof CLUnknown || expr instanceof CLWrapped) {
        return false
    }
    if (isCertLogicLiteral(expr)) {
        return true
    }
    if (Array.isArray(expr)) {
        return expr.every(isCertLogicExpression)
    }
    if (typeof expr === "object") {
        const operands = Object.values(expr)[0]
        return typeof operands === "string" || (operands as CLExtExpr[]).every(isCertLogicExpression)
    }
    throw new Error(`isCertLogicExpression can't handle CLExtExpr: ${expr}`)
}


export type CertLogicLiteral = string | number | boolean
/**
 * Determine whether the given value is a valid CertLogic literal expression,
 * meaning: a string, an integer number, or a boolean.
 */
export const isCertLogicLiteral = (expr: unknown): expr is CertLogicLiteral =>
    typeof expr === "string" || isInt(expr) || typeof expr === "boolean"
// TODO  move both into CertLogic internals


export type Boolsy = boolean | undefined
export const boolsiness = (value: unknown): Boolsy => {
    if (isTruthy(value)) {
        return true
    }
    if (isFalsy(value)) {
        return false
    }
    return undefined
}
// TODO  move both into CertLogic internals


/**
 * Check whether the given `expr` is of constant value.
 * This assumes that the given `expr` is already partially evaluated against data.
 */
export const isConstant = (expr: CLExtExpr): boolean => {
    if (expr instanceof CLUnknown) {
        return false
    }
    if (expr instanceof CLWrapped) {
        return true     // might be a CLUnknown instance in there, but doesn't matter for being constant (TODO  ?)
    }
    if (isCertLogicLiteral(expr)) {
        return true
    }
    if (Array.isArray(expr)) {
        return expr.every(isConstant)
    }
    if (typeof expr === "object") {
        const [operator, operands] = Object.entries(expr)[0]
        return operator !== "var" && (operands as CLExtExpr[]).every(isConstant)
    }
    throw new Error(`isConstant can't handle this CLExtExpr: ${JSON.stringify(expr)}`)
}


export const extBoolsiness = (expr: CLExtExpr): Boolsy => {
    if (expr instanceof CLUnknown) {
        return undefined
    }
    if (expr instanceof CLWrapped) {
        return boolsiness(expr.value)
    }
    if (isCertLogicLiteral(expr)) {
        return boolsiness(expr)
    }
    if (typeof expr === "object") {
        const operator = Object.keys(expr)[0]
        return operator in ["plusTime"] || undefined
    }
}


export const areEqual = (left: CLExtExpr, right: CLExtExpr): Boolsy => {
    if (left instanceof CLUnknown) {
        return undefined
    }
    if (left instanceof CLWrapped) {
        return left.value === (right instanceof CLWrapped ? right.value : right)
    }
    if (typeof left === "boolean") {
        return typeof right === "boolean" ? left === right : undefined
    }
    if (isComparable(left)) {
        return isComparable(right) ? left === right : undefined
    }
    if (Array.isArray(left)) {
        return Array.isArray(right)
            && left.length === right.length
            && left.every((item, index) => areEqual(item, right[index]))
    }
    if (typeof left === "object") {
        return deepEqual(left, right) || undefined
    }
    throw new Error(`areEqual can't handle ${JSON.stringify(left)} === ${JSON.stringify(right)}`)
}


type Comparable = string | number
const isComparable = (value: unknown): value is Comparable =>
    typeof value === "string" || typeof value === "number"

const compareFn = (operator: ">" | "<" | ">=" | "<=", left: Comparable, right: Comparable): boolean => {
    switch (operator) {
        case ">": return left > right
        case "<": return left < right
        case ">=": return left >= right
        case "<=": return left <= right
    }
}

export const compare = (operator: ">" | "<" | ">=" | "<=", left: CLExtExpr, right: CLExtExpr): Boolsy =>
    (isComparable(left) && isComparable(right))
        ? compareFn(operator, left, right)
        : undefined

