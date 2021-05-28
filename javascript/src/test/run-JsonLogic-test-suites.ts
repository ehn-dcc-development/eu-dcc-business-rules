import { readdirSync } from "fs"
import { join } from "path"
const { deepEqual } = require("chai").assert

import { applyLogic, extendJsonLogic, JsonLogicRule } from "../extend-JsonLogic"
import { readJson } from "../file-utils"
import { jsonLogicPath } from "../paths"


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
    inactive?: boolean
    cases: TestCase[]
}


export const runTestsOn = (testSuite: TestSuite) => {
    extendJsonLogic()
    if (!testSuite.inactive) {
        describe(testSuite.name, () => {
            testSuite.cases.forEach(({name, jsonLogicRule, assertions}) => {
                it(name, () => {
                    assertions.forEach(({data, expected, message}) => {
                        deepEqual(applyLogic(jsonLogicRule, data), expected, message || JSON.stringify(data))
                    })
                })
            })
        })
    }
}


const testSuitsPath = join(jsonLogicPath, "test")
readdirSync(testSuitsPath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runTestsOn(readJson(join(testSuitsPath, path))))

