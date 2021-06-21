import { writeFileSync } from "fs"
import { join } from "path"

const deepEqual = require("deep-equal")

import { validateFormat } from "../../certlogic-validation"
const { evaluate } = require("certlogic-js")

import { Assertion, TestCase, TestSuite } from "certlogic-js/src/test/test-types"

type JLTest = [ logic: any, data: any, expected: any ]
type JLTestOrSection = string | JLTest
type JLTests = JLTestOrSection[]

const tests = require("../tmp/tests.json") as JLTests

let currentTestName: string

let nAssertions = 0
let nValidate = 0
let nEvaluate = 0
let nMatch = 0
let nNoMatch = 0
let nFail = 0

const testSuite: TestSuite = {
    name: "JsonLogic test suite - filtered",
    cases: [] as TestCase[],
    directive: undefined
}

let currentTestCase: TestCase | undefined = undefined

tests.forEach((line, itemNo) => {
    if (typeof line === "string") {
        currentTestName = line
        // console.log(`test "${currentTestName}"`)
        if (currentTestCase !== undefined && currentTestCase.assertions.length > 0) {
            testSuite.cases.push(currentTestCase)
        }
        currentTestCase = {
            name: currentTestName,
            assertions: [] as Assertion[],
            directive: undefined
        }
        return
    }
    nAssertions++
    const [ expr, data, expected ] = line
    const errors = validateFormat(expr)
    if (errors.length > 0) {
        /*
        console.error(`JsonLogic expression doesn't validate as CertLogic expression:`)
        console.dir(expr)
        console.dir(errors)
         */
    } else {
        nValidate++
        try {
            const result = evaluate(expr, data)
            nEvaluate++
            if (deepEqual(expected, result)) {
                nMatch++
            } else {
                nNoMatch++
                console.error(`evaluation doesn't match!:`)
                console.error(JSON.stringify(expr, null, 2))
                console.error(JSON.stringify(data, null, 2))
                console.error(JSON.stringify(result, null, 2))
                console.error(JSON.stringify(expected, null, 2))
                console.error(`item#=${itemNo}`)
                console.error()
            }
            currentTestCase!!.assertions.push({
                certLogicExpression: expr,
                data,
                expected,
                directive: undefined
            })
        } catch (e) {
            nFail++
            console.error(`evaluation doesn't succeed, due to: ${e.message}`)
            console.error(JSON.stringify(expr, null, 2))
            console.error(`item#=${itemNo}`)
            console.error()
        }
    }
})

console.log(`${nValidate} of ${nAssertions} assertions format-validate`)
console.log(`${nEvaluate} of ${nAssertions} assertions evaluate without erroring`)
console.log(`${nMatch} of ${nAssertions} assertions pass (match)`)
console.log(`${nNoMatch} of ${nAssertions} assertions fail (no-match)`)
console.log(`${nFail} of ${nAssertions} assertions fail due to errors during evaluation`)


writeFileSync(join(__dirname, "../../testSuite/JsonLogic-testSuite.json"), JSON.stringify(testSuite, null, 2), "utf8")

console.log(`wrote ${nMatch} assertions to a test suite`)

