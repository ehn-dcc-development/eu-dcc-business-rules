#!/usr/bin/env node

import { existsSync, readFileSync } from "fs"
import { validate } from "./index"


const exprPath = process.argv[2]

if (!exprPath) {
    console.error(`Usage: certlogic-validate <path of JSON file containing CertLogic expression>`)
    process.exit(2)
}

if (!existsSync(exprPath)) {
    console.error(`expression path ${exprPath} is not valid: file doesn't exist`)
    process.exit(2)
}

try {
    const expr = JSON.parse(readFileSync(exprPath, "utf8").toString())
    console.log(JSON.stringify(validate(expr), null, 2))
} catch (e) {
    console.error(`couldn't read file ${exprPath} as JSON: ${e.message}`)
}

