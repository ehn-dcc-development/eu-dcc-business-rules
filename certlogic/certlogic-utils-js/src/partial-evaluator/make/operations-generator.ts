import {writeFileSync} from "fs"


type OperationSpec = {
    operator?: string
    operators?: string[]
    operands: string
}

const operationSpecs: OperationSpec[] = require("../../../src/partial-evaluator/make/certlogic-operation-specs.json")


const range = (n: number): number[] =>
    [...Array(n).keys()]


const extTypeName = "CLExtExpr"

const genOperandsSpec = (operands: string): string => {
    const match = operands.match(/^expr\[(\w+)?(-)?(\w+)?\]$/)
    if (match) {
        const [minStr, hyphen, maxStr] = match.slice(1)
        if (!minStr) {
            return `${extTypeName}[]`
        }
        const min = Number(minStr)
        if (!hyphen) {
            return `[ ${range(min).map((_) => extTypeName).join(", ")} ]`
        }
        const max = Number(maxStr!)
        return range(max - min + 1).map((n) => genOperandsSpec(`expr[${n + min}]`)).join(" | ")
    }
    const parts = operands.split(",")
    return `[ ${parts.map((part) => {
        switch (part) {
            case "expr": return extTypeName
            case "int": return "number"
            default: return part
        }
    }).join(", ")} ]`
}

const genSingleOperationSpec = (operator: string, operands: string): string =>
    `| { "${operator}": ${genOperandsSpec(operands)} }`

const genOperationSpec = ({ operator, operators, operands }: OperationSpec): string[] =>
    (typeof operator === "string" ? [operator] : operators!)
        .map((operator) => genSingleOperationSpec(operator, operands))

const indent = (strings: string[]): string =>
    strings.map((str) => `    ${str}`).join("\n")

const generatedCode = `import {TimeUnit} from "certlogic-js"

import {${extTypeName}} from "./extended-types"

export type CLExtOperation =
    | { "var": string }
${indent(operationSpecs.flatMap(genOperationSpec))}

`
writeFileSync("src/partial-evaluator/operations_gen.ts", generatedCode, "utf8")

