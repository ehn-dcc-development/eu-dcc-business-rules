import { readdirSync, readFileSync } from "fs"
import { join } from "path"
import { evaluate } from "../evaluator"

const { deepEqual } = require("chai").assert

import { TestDirective, TestSuite } from "./test-types"


const testDirective2MochaFunc = (testDirective: TestDirective, mochaFunc: any) => testDirective === undefined ? mochaFunc : mochaFunc[testDirective]

const runTestsOn = (testSuite: TestSuite) => {
    testDirective2MochaFunc(testSuite.directive, describe)(testSuite.name, () => {
        testSuite.cases
            .forEach((testCase) => {
                testDirective2MochaFunc(testCase.directive, it)(testCase.name, () => {
                    testCase.assertions
                        .forEach((assertion, index) => {
                            const assertionText = assertion.message || `#${index + 1}`
                            if (assertion.certLogicExpression === undefined && testCase.certLogicExpression === undefined) {
                                console.error(`     !! no CertLogic expression defined on assertion ${assertionText}, and neither on encompassing test case "${testCase.name}"`)
                            }
                            switch (assertion.directive) {
                                case "skip": {
                                    console.warn(`      ! skipped assertion ${assertionText}`)
                                    return
                                }
                                case "only": {
                                    console.warn(`      (test directive 'only' not supported on assertions - ignoring)`)
                                }
                            }
                            deepEqual(
                                evaluate((assertion.certLogicExpression !== undefined ? assertion.certLogicExpression : testCase.certLogicExpression)!!, assertion.data),
                                assertion.expected,
                                assertion.message || JSON.stringify(assertion.data)
                            )
                        })
                })
            })
    })
}


const testSuitesPath = join(__dirname, "../../../specification/testSuite")

readdirSync(testSuitesPath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runTestsOn(JSON.parse(readFileSync(join(testSuitesPath, path), "utf8"))))

