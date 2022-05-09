/*
 * Runs the validation test suite of the CertLogic specification (i.e.: the test suite for the validation part of CertLogic)
 * against the validator of the Type-/JavaScript implementation of CertLogic.
 */

import {equal} from "assert"
const { deepEqual } = require("chai").assert

import { join } from "path"
import { readdirSync, readFileSync } from "fs"

import { testDirective2MochaFunc } from "./mocha-utils"
import { ValidationTestSuite } from "./test-types"
import { isCertLogicExpression, validate } from "../validation"


const runValidationTestsOn = (testSuite: ValidationTestSuite) => {
    testDirective2MochaFunc(testSuite.directive, describe)(testSuite.name, () => {
        testSuite.cases
            .forEach((testCase, index) => {
                testDirective2MochaFunc(testCase.directive, it)(testCase.name || `<unnamed> case #${index + 1}, expr: <<${JSON.stringify(testCase.certLogicExpression)}>>`, () => {
                    const issues = validate(testCase.certLogicExpression)
                    equal(issues.length, testCase.issues.length, "number of issues")
                    deepEqual(issues, testCase.issues)  // TODO  make order-independent?
                    equal(isCertLogicExpression(testCase.certLogicExpression), issues.length === 0)
                })
            })
    })
}


const validationTestSuitePath = join(__dirname, "../../../specification/validation-testSuite")

readdirSync(validationTestSuitePath)
    .filter((path) => path.endsWith(".json"))
    .forEach((path) => runValidationTestsOn(JSON.parse(readFileSync(join(validationTestSuitePath, path), "utf8"))))

