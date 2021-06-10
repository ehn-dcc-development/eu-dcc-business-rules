import { join } from "path"
import { readdirSync, readFileSync } from "fs"

import { validate } from "../index"


const testSuitesPath = join(__dirname, "../../../testSuite")

readdirSync(testSuitesPath)
    .filter((path) => path.endsWith(".json"))
    .map((path) => JSON.parse(readFileSync(join(testSuitesPath, path), "utf8")))
    .forEach((testSuite) => {
        testSuite.cases.forEach((testCase: any) => {
            const errors = validate(testCase.certLogicExpression)
            if (errors.length > 0) {
                console.log(`${errors.length} validation error${errors.length > 1 ? "s" : ""} found on expression of test case "${testCase.name}" in test suite "${testSuite.name}:`)
                errors.forEach(({ message, expr }) => {
                    console.log(`\t${message} on:`)
                    console.dir(expr)
                })
            }
        })
    })

