import { RulesLogic, add_operation, apply } from "json-logic-js"


export type ExtendedRulesLogic = RulesLogic | { "varx": ExtendedRulesLogic[] }

export const extendJsonLogic = () => {
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
}

export const applyLogic = (jsonLogicExpression: ExtendedRulesLogic, data: any) => apply(jsonLogicExpression as RulesLogic, data)

