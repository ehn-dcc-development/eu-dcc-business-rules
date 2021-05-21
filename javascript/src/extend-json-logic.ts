/**
 * Extend JsonLogic with custom operations.
 */


import { RulesLogic, add_operation, apply } from "json-logic-js"


export type ExtendedRulesLogic = RulesLogic | { "Date": [ ExtendedRulesLogic ]} | { "addDays": [ ExtendedRulesLogic, ExtendedRulesLogic ]}
    // | { "varx": ExtendedRulesLogic[] }


let extended = false

export const extendJsonLogic = () => {
    if (extended) {
        return
    }
    // Steffen Schulze's custom ops for dates:
    add_operation("Date", Date)
    add_operation("addDays", (date, days) => {
        let d = new Date(Date.parse(date))
        d.setDate(d.getDate() + days)
        return d.toISOString()
    })
    /*
     * Currently unused:
    add_operation("varx", function (this: any, ...pathParts: (string | number)[]) {
        let value = this
        pathParts.forEach((pathPart) => {
            if (value === undefined || value === null) {
                return null // Always null, not a default value.
            }
            value = value[pathPart]
        })
        return value
    })
     */
    extended = true
}


export const applyLogic = (jsonLogicExpression: ExtendedRulesLogic, data: any) => apply(jsonLogicExpression as RulesLogic, data)

