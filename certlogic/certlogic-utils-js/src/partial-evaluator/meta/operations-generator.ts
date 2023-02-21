import {writeFileSync} from "fs"


type OperationSpec = {
    operator?: string
    operators?: string[]
    operands: string
}

const operationSpecs: OperationSpec[] = require("../../../src/partial-evaluator/meta/certlogic-operation-specs.json")


/**
 * @return an array of integers [ 0, 1, &hellip;, n-1 ]
 */
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


/**
 * Type definition for CertLogic operations which may recursively use the _extended_ CertLogic type.
 
 * This type def. is *generated* from the specification in meta/certlogic-operation-specs.json,
 * by (running) meta/operations-generator.ts - which is a step in the build.sh script.
 * *Warning:* don't change this file directly, but change that specification and/or the generator!
 */
export type CLExtOperation =
    | { "var": string }
${indent(operationSpecs.flatMap(genOperationSpec))}

`
writeFileSync("src/partial-evaluator/operations_gen.ts", generatedCode, "utf8")

