/*
 * Runs the test suite in the CertLogic specification against the Type-/JavaScript implementation of the CertLogic semantics
 *  - i.e., its interpreter/evaluator.
 */

import { readdirSync, readFileSync } from "fs"
import { join } from "path"

const { deepEqual } = require("chai").assert

import { testDirective2MochaFunc } from "./mocha-utils"
import { TestSuite } from "./test-types"
import { evaluate } from "../evaluator"


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


const testSuitePath = join(__dirname, "../../../specification/testSuite")

readdirSync(testSuitePath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runTestsOn(JSON.parse(readFileSync(join(testSuitePath, path), "utf8"))))

