/*
 * Runs the test suite in the CertLogic specification against compiled CertLogic expressions.
 */

import {readdirSync, readFileSync} from "fs"
import {join} from "path"

const {deepEqual} = require("chai").assert

import {compile} from "../../compiler"


const testDirective2MochaFunc = (testDirective: any, mochaFunc: any) =>
    testDirective === undefined ? mochaFunc : mochaFunc[testDirective]


const runTestsOn = (testSuite: any) => {
    testDirective2MochaFunc(testSuite.directive, describe)(`[compiler.testSuite] ${testSuite.name}`, () => {
        testSuite.cases
            .forEach((testCase: any) => {
                testDirective2MochaFunc(testCase.directive, it)(testCase.name, () => {
                    testCase.assertions
                        .forEach((assertion: any, index: number) => {
                            const assertionText = assertion.message || `#${index + 1}`
                            const expr = assertion.certLogicExpression ?? testCase.certLogicExpression
                            if (expr === undefined) {
                                console.error(`     !! no CertLogic expression defined on assertion ${assertionText}, and neither on encompassing test case "${testCase.name}"`)
                                return
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
                            const message = assertion.message || JSON.stringify(assertion.data)
                            deepEqual(compile(expr).evaluateWith(assertion.data), assertion.expected, message)
                        })
                })
            })
    })
}


const testSuitePath = join(__dirname, "../../../../specification/testSuite")

readdirSync(testSuitePath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runTestsOn(JSON.parse(readFileSync(join(testSuitePath, path), "utf8"))))

