const { deepEqual, fail } = require("chai").assert
import { existsSync, PathLike, readdirSync, readFileSync } from "fs"
import { join } from "path"
import { validate } from "certlogic-validation"

import { loadJsonFile, parameters } from "./cli-utils"
import { runRule } from "./runners"
import { Rule, RuleSet, ValueSets } from "./typings"


interface Assertion {
    name?: string
    payload: any
    validationClock?: string
    expected: any
    message?: string
}


const runTests = (rule: Rule, valueSets: ValueSets, assertions: Assertion[]) => {
    describe(`rule: "${rule.id}"`, () => {
        const validation = validate(rule.logic)
        if (validation.length > 0) {
            console.dir(validation)
            fail(`rule "${rule.id}" has validation errors in its logic`)
        }
        assertions.forEach(({ name, payload, validationClock, expected, message }, index) => {
            const assertionText = `assertion ${index + 1}`
            it(name ? `${name} (${assertionText})` : assertionText, () => {
                const evalResult = runRule(rule, { payload, external: { valueSets, validationClock } })
                if (typeof evalResult === "object" && "errorMessage" in evalResult) {
                    fail(`evaluation of ${assertionText} failed, due to: ${evalResult.errorMessage}`)
                } else {
                    deepEqual(evalResult, expected)
                }
            })
        })
    })
}


const readJson = (path: PathLike) => JSON.parse(readFileSync(path, "utf8"))

export const runTestsWith = (ruleSet: RuleSet, valueSets: ValueSets, rulesTestsPath: string) => {
    ruleSet.forEach((rule) => {
        const ruleAssertionsFile = join(rulesTestsPath, `${rule.id}.json`)
        if (existsSync(ruleAssertionsFile)) {
            runTests(rule, valueSets, readJson(ruleAssertionsFile))
        } else {
            describe(`rule: "${rule.id}"`, () => {
                it(`no assertions file`, () => {
                    fail()
                })
            })
        }
    })

    const assertionsFilesForNonExistingRules = readdirSync(rulesTestsPath)
        .filter((path) => path.endsWith(".json"))
        .map((path) => path.substring(path.lastIndexOf("/") + 1, path.length - ".json".length))
        .filter((ruleId) => !ruleSet.find((rule) => rule.id === ruleId))
    if (assertionsFilesForNonExistingRules.length === 0) {
        console.log(`no assertions files for non-existing rules`)
    } else {
        console.log(`JSON files (apparently) for non-existing rules found: rule IDs would be ${assertionsFilesForNonExistingRules.map((ruleId) => `'${ruleId}'`).join(", ")}`)
    }
}


const parameters_ = parameters()

const ruleSetPath = parameters_["rule-set"]
const valueSetsPath = parameters_["value-sets"]
const testsPath = parameters_["tests"]

if (!testsPath) {
    console.error(`path for rules tests not defined - exiting`)
    process.exit(1)
}
if (!existsSync(testsPath)) {
    console.error(`path '${testsPath}' for rules tests does not exist - exiting`)
    process.exit(1)
}
const ruleSet = loadJsonFile<RuleSet>(ruleSetPath, "rule set")
const valueSets = loadJsonFile<ValueSets>(valueSetsPath, "value sets")

runTestsWith(ruleSet as RuleSet, valueSets as ValueSets, testsPath)

