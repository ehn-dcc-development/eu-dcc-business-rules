import { CertLogicExpression } from "certlogic-js"

import { typeOf } from "./type-calculator"
import { TypeObject } from "./types"
import { ValidationError } from "./typings"


const typeCheckVar = (expr: CertLogicExpression, typeOfData: TypeObject): ValidationError[] => {
    return []
}


const typeCheck = (expr: CertLogicExpression, typeOfData: TypeObject): ValidationError[] => {
    if (expr !== null && typeof expr === "object") {
        const keys = Object.keys(expr)
        if (keys.length !== 1) {
            return []
        }
        const operator = keys[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
             // return typeCheckVar(values, typeOfData)
        }
    }
    return []
}

