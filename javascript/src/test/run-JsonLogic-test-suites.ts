import { readdirSync } from "fs"
import { join } from "path"
const { deepEqual } = require("chai").assert

import { applyLogic, extendJsonLogic, JsonLogicRule } from "../extend-JsonLogic"
import { readJson } from "../file-utils"


interface Assertion {
    data: any
    expected: any
    message?: string
}
interface TestCase {
    name: string
    jsonLogicRule: JsonLogicRule
    assertions: Assertion[]
}
interface TestSuite {
    name: string
    cases: TestCase[]
}


export const runTestsOn = (testSuite: TestSuite) => {
    extendJsonLogic()
    describe(testSuite.name, () => {
        testSuite.cases.forEach(({ name, jsonLogicRule, assertions }) => {
            it(name, () => {
                assertions.forEach(({ data, expected, message}) => {
                    deepEqual(applyLogic(jsonLogicRule, data), expected, message || JSON.stringify(data))
                })
            })
        })
    })
}


const testSuitsPath = join(__dirname, "../../../jsonLogic/test")
readdirSync(testSuitsPath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runTestsOn(readJson(join(testSuitsPath, path))))

