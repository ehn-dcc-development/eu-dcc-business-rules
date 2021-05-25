const { deepEqual } = require("chai").assert
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


const rulesTestsPath = join(__dirname, "../../../rules/test")
runTestsOn(readJson(join(rulesTestsPath, "GR-EU-0001.json")))

