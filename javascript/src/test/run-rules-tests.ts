const { deepEqual } = require("chai").assert
import { existsSync } from "fs"
import { join } from "path"

import { extendJsonLogic } from "../extend-JsonLogic"
import { readJson } from "../file-utils"
import { rules, runRule } from "../rules"


interface Assertion {
    name?: string
    hcert: any
    validationClock?: string
    expected: any
    message?: string
}
interface TestCase {
    ruleId: string
    assertions: Assertion[]
}


export const runTestsOn = (testCase: TestCase) => {
    extendJsonLogic()
    describe(`rule: "${testCase.ruleId}"`, () => {
        const rule = rules.find((rule) => rule.name === testCase.ruleId)!
        testCase.assertions.forEach(({ name, hcert, validationClock, expected, message }, index) => {
            it(name || `assertion ${index + 1}`, () => {
                deepEqual(runRule(rule, hcert, validationClock), expected)
            })
        })
    })
}


const rulesTestsPath = join(__dirname, "../../../rules/test");
rules.map((rule) => rule.name)
    .map((ruleId) => join(rulesTestsPath, `${ruleId}.json`))
    .filter(existsSync)
    .forEach((path) => {
        runTestsOn(readJson(path))
    })
// TODO  test file name should be enough to specify ruleId + check for "superfluous" test files

