#!/usr/bin/env node

import { existsSync, readFileSync } from "fs"
import { evaluate } from "./index"


const exprPath = process.argv[2]
const dataPath = process.argv[3]

if (!exprPath) {
    console.error(`Usage: certlogic-run <path of JSON file containing CertLogic expression> <path of JSON file containing the data context>`)
    process.exit(2)
}

if (!existsSync(exprPath)) {
    console.error(`expression path ${exprPath} (arg. #1) is not valid: file doesn't exist`)
    process.exit(2)
}
if (!existsSync(dataPath)) {
    console.error(`data path ${exprPath} (arg. #2) is not valid: file doesn't exist`)
    process.exit(2)
}

try {
    const expr = JSON.parse(readFileSync(exprPath, "utf8").toString())
    const data = JSON.parse(readFileSync(dataPath, "utf8").toString())
    console.log(JSON.stringify(evaluate(expr, data), null, 2))
} catch (e) {
    console.error(`couldn't read file ${exprPath} as JSON: ${e.message}`)
}

