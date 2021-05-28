import { readdirSync } from "fs"
import { join } from "path"
const { deepEqual } = require("chai").assert

import { JsonLogicRule } from "../extend-JsonLogic"
import { readJson } from "../file-utils"
import { jsonLogicPath } from "../paths"


type TestDirective = "skip" | "only" | undefined

interface Assertion {
    data: any
    expected: any
    directive: TestDirective
    message?: string
}
interface TestCase {
    name: string
    directive: TestDirective
    jsonLogicRule: JsonLogicRule
    assertions: Assertion[]
}
interface TestSuite {
    name: string
    directive: TestDirective
    cases: TestCase[]
}


const testDirective2MochaFunc = (testDirective: TestDirective, mochaFunc: any) => testDirective === undefined ? mochaFunc : mochaFunc[testDirective]

const runTestsOn = <T>(testSuite: TestSuite, evaluate: (expr: T, data: any) => any) => {
    testDirective2MochaFunc(testSuite.directive, describe)(testSuite.name, () => {
        testSuite.cases
            .forEach(({name, jsonLogicRule, assertions, directive}) => {
                testDirective2MochaFunc(directive, it)(name, () => {
                    assertions
                        .forEach(({ data, expected, message , directive}, index) => {
                            switch (directive) {
                                case "skip": {
                                    console.warn(`      (! skipped assertion ${message || `#${index + 1}`} of:)`)
                                    return
                                }
                                case "only": {
                                    console.warn("(test directive 'only' not supported on assertions)")
                                }
                            }
                            deepEqual(evaluate(jsonLogicRule as unknown as T, data), expected, message || JSON.stringify(data))
                        })
                })
            })
    })
}


const testSuitesPath = join(jsonLogicPath, "test")

export const runTestsWith = <T> (evaluate: (expr: T, data: any) => any) => {
    readdirSync(testSuitesPath)
        .filter((path) => path.endsWith(".json"))
        .forEach((path) => runTestsOn(readJson(join(testSuitesPath, path)), evaluate))
}

