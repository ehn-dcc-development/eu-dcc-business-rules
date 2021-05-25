/**
 * Extend JsonLogic with custom operations,
 * and provide stricter typings than provided with the library.
 */


import { RulesLogic, add_operation, apply } from "json-logic-js"

// TODO  generify this with return type parameter?
export type DataAccess = { var: JsonLogicRule }
export type IfThenElse = { if: [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
export type AddDays = { addDays: [ JsonLogicRule, JsonLogicRule ] }
export type ArrayOperation =
      { "all":   [ JsonLogicRule, JsonLogicRule ] }
    | { "some":  [ JsonLogicRule, JsonLogicRule ] }
    | { "merge": JsonLogicRule[] }
    | { "reduce": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
    | { "in": [ JsonLogicRule, JsonLogicRule ] }
export type BinaryOperation =
      { ">":   [ JsonLogicRule, JsonLogicRule ] }
    | { ">=":  [ JsonLogicRule, JsonLogicRule ] }
    | { "<":   [ JsonLogicRule, JsonLogicRule ] }
    | { "<=":  [ JsonLogicRule, JsonLogicRule ] | [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
    | { "==":  [ JsonLogicRule, JsonLogicRule ] }
    | { "===": [ JsonLogicRule, JsonLogicRule ] }
    | { "and": [ JsonLogicRule, JsonLogicRule ] }
    | { "+":   [ JsonLogicRule, JsonLogicRule ] }
export type LogicalOperation =
    | { "!":   [ JsonLogicRule ] }

/**
 * TypeScript typings for JsonLogic that are a bit more exact than JsonLogic's own,
 * and which can be extended with our own custom operations.
 */
export type JsonLogicRule =
    | boolean
    | string
    | number
    | Date
    | JsonLogicRule[]
    | DataAccess
    | IfThenElse
    | AddDays
    | ArrayOperation
    | BinaryOperation
    | LogicalOperation

// TODO  map this to a JSON Schema, and compare with "official" one


let extended = false

export const extendJsonLogic = () => {
    if (extended) {
        return
    }
    // Steffen Schulze's custom op for dates:
    add_operation("addDays", (dateStr, nDays) => {
        const tzo = dateStr.substring(19)
        let d = new Date(dateStr)
        d.setDate(d.getDate() + nDays)
        const offsetDateStr = d.toISOString()
        return offsetDateStr.substring(0, 19) + tzo
    })
    extended = true
}


export const applyLogic = (jsonLogicExpression: JsonLogicRule, data: any) => apply(jsonLogicExpression as RulesLogic, data)

