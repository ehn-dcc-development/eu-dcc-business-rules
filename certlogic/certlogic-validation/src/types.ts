import { isInt } from "certlogic-js"
const deepEqual = require("deep-equal")
import { JSONSchema7, JSONSchema7Definition } from "json-schema"


export type TypeObject = JSONSchema7Definition

export const sumOf = (...partialTypes: TypeObject[]): TypeObject => ({ anyOf: partialTypes })

export const nullType: TypeObject = { type: "null" }
export const booleanType: TypeObject = { type: "boolean" }
export const integerType: TypeObject = { type: "integer" }

export const unknownType: TypeObject = {}
export const falsy: TypeObject = sumOf(false, nullType)
export const truthy: TypeObject = sumOf(true, { type: "object" }, { type: "array", minItems: 1 })


export const equalAsTypes = (type1: TypeObject, type2: TypeObject) => deepEqual(type1, type2)


export const typeFrom = (typeOfData: TypeObject, fragment: string | number): TypeObject => {
    if (typeof typeOfData !== "object" || typeOfData === nullType) {
        return nullType
    }
    if (typeof fragment === "string" && typeOfData.type === "object") {
        if (!(fragment in (typeOfData.properties || []))) {
            return nullType
        }
        return (typeOfData.required || []).indexOf(fragment) > -1
            ? typeOfData.properties![fragment]
            : sumOf(typeOfData.properties![fragment], nullType)
    }
    if (typeof fragment === "number" && typeOfData.type === "array") {
        if (!isInt(fragment) || fragment < 0) {
            return nullType
        }
        if (Array.isArray(typeOfData.items)) {
            return typeOfData.items[fragment] || nullType
        }
        return (typeOfData.minItems && fragment >= typeOfData.minItems) ? nullType : (typeOfData.items as JSONSchema7)
    }
    return nullType
}

