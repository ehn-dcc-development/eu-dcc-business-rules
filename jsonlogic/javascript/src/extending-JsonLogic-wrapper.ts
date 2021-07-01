/**
 * Extend JsonLogic with custom operations,
 * and provide stricter typings than provided with the library.
 */


import { RulesLogic, add_operation, apply } from "json-logic-js"

export type DataAccess = { "var": JsonLogicRule }
export type IfThenElse = { "if": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
export type PlusDays = { "plusTime": [ JsonLogicRule, JsonLogicRule, JsonLogicRule ] }
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
    | PlusDays
    | ArrayOperation
    | BinaryOperation
    | LogicalOperation


let extended = false

export const extendJsonLogic = () => {
    if (extended) {
        return
    }
    // Steffen Schulze's custom op for dates:
    add_operation("plusTime", (dateTimeStr: string, amount: number, unit: "day" | "hour") => {
        let dateTime = new Date(dateTimeStr)    // Note: assumes that dateTimeStr is parseable as-is!
        if (unit === "day") {
            dateTime.setUTCDate(dateTime.getUTCDate() + amount)
        } else if (unit === "hour") {
            dateTime.setUTCHours(dateTime.getUTCHours() + amount)
        }
        return dateTime
    })
    extended = true
}


export const applyLogic = (jsonLogicRule: JsonLogicRule, data: any) => apply(jsonLogicRule as RulesLogic, data)

