const { deepEqual, fail } = require("chai").assert
import { existsSync, readdirSync } from "fs"
import { join } from "path"

import { extendJsonLogic } from "../extend-JsonLogic"
import { readJson } from "../file-utils"
import { rulesPath } from "../paths"
import { Rule, rules, runRule } from "../rules"


interface Assertion {
    name?: string
    hcert: any
    validationClock?: string
    expected: any
    message?: string
}


export const runTests = (rule: Rule, assertions: Assertion[]) => {
    extendJsonLogic()
    describe(`rule: "${rule.name}"`, () => {
        assertions.forEach(({ name, hcert, validationClock, expected, message }, index) => {
            it(name || `assertion ${index + 1}`, () => {
                deepEqual(runRule(rule, hcert, validationClock), expected)
            })
        })
    })
}


const rulesTestsPath = join(rulesPath, "test");
rules.forEach((rule) => {
    const ruleId = rule.name
    const path = join(rulesTestsPath, `${ruleId}.json`)
    if (existsSync(path)) {
        runTests(rule, readJson(path))
    } else {
        describe(`rule: "${ruleId}"`, () => {
            it(`no assertions file`, () => {
                fail()
            })
        })
    }
})

const assertionsFilesForNonExistingRules = readdirSync(rulesTestsPath)
    .filter((path) => path.endsWith(".json"))
    .map((path) => path.substring(path.lastIndexOf("/") + 1, path.length - ".json".length))
    .filter((ruleId) => !rules.find((rule) => rule.name === ruleId))
if (assertionsFilesForNonExistingRules.length === 0) {
    console.log(`no assertions files for non-existing rules`)
} else {
    console.log(`JSON files (apparently) for non-existing rules found: rule IDs would be ${assertionsFilesForNonExistingRules.map((ruleId) => `'${ruleId}'`).join(", ")}`)
}

