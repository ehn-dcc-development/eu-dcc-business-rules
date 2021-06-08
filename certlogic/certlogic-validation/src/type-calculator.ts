import {CertLogicExpression, isInt} from "certlogic-js"

import { booleanType, equalAsTypes, falsy, integerType, sumOf, truthy, typeFrom, TypeObject, unknownType } from "./types"


const typeOfVar = (args: any, typeOfData: TypeObject): TypeObject => {
    if (typeof args !== "string") {
        return unknownType
    }
    const path = args
    if (path === "") {
        return typeOfData
    }
    return path.split(".").reduce(typeFrom, typeOfData)
}

const typeOfBinOp = (operator: string): TypeObject => {
    switch (operator) {
        case "===":
        case ">":
        case "<":
        case ">=":
        case "<=":
        case "in":
            return booleanType
        case "and": return sumOf(falsy, truthy) // TODO  could make this sharper by actually inspecting the operands
        case "+": return integerType
        default: return unknownType
    }
}

const typeOfIf = (then: CertLogicExpression, else_: CertLogicExpression, typeOfData: TypeObject): TypeObject => {
    const thenType = typeOf(then, typeOfData)
    const elseType = typeOf(else_, typeOfData)
    return equalAsTypes(thenType, elseType)
        ? thenType
        : sumOf(thenType, elseType)
}

export const typeOf = (expr: CertLogicExpression, typeOfData: TypeObject): TypeObject => {
    if (typeof expr === "string") {
        return { type: "string" }
    }
    if (isInt(expr)) {
        return integerType
    }
    if (typeof expr === "boolean") {
        return booleanType
    }
    if (expr === null) {
        return unknownType
    }
    if (Array.isArray(expr)) {
        return {
            type: "array",
            items: (expr as CertLogicExpression[]).map((subExpr) => typeOf(subExpr, typeOfData))
        }   // TODO  could make this sharper if all types of sub expression are equal (or have a common super type)
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        if (keys.length !== 1) {
            return unknownType
        }
        const operator = keys[0]
        const args = (expr as any)[operator]
        if (operator === "var") {
            return typeOfVar(args, typeOfData)
        }
        if (!(Array.isArray(args) && args.length > 0)) {
            return unknownType
        }
        if (operator === "if") {
            return typeOfIf(args[1], args[2], typeOfData)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+" ].indexOf(operator) > -1) {
            return typeOfBinOp(operator)
        }
        if (operator === "!") {
            return booleanType
        }
        if (operator === "plusTime") {
            return {
                type: "string",
                format: "date-time"
            }
        }
        if (operator === "reduce") {
            return typeOf(args[2], typeOfData)  // = type of initial
        }
    }
    return unknownType
}

