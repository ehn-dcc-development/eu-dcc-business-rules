const { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } = require("fs")
const { join } = require("path")


const { affectedFields } = require("../certlogic/certlogic-validation/dist/affected-fields")


const readJson = (path) => JSON.parse(readFileSync(path, "utf8"))
const writeJson = (path, data) => writeFileSync(path, JSON.stringify(data, null, 2), "utf8")

const rulesRepoPath = `../../dgc-business-rules-testdata`

const ruleType = (ruleId) => {
    const match = ruleId.match(/^(\w{2})-(\w{2})-(\d{4})$/)
    if (!match) {
        throw new Error(`rule ID "${ruleId}" doesn't conform to regex`)
    }
    switch (match[1]) {
        case "GR": return "General"
        case "RR": return "Recovery"
        case "TR": return "Test"
        case "VR": return "Vaccination"
    }
}

const migrateRule = (rule, msId) => ({
    "Identifier": rule.id,
    "Type": "Acceptance",
    "Country": msId,
    "Version": "1.0.0",
    "SchemaVersion": "1.0.0",
    "Engine": "CERTLOGIC",
    "EngineVersion": "0.7.7",
    "CertificateType": ruleType(rule.id),
    "Description": [
        {
            "lang": "en",
            "desc": rule.description
        }
    ],
    "ValidFrom": "2021-06-01T00:00:00Z",
    "ValidTo": "2030-06-01T00:00:00Z",
    "AffectedFields": affectedFields(rule.logic)
        .filter((fieldName) => fieldName.startsWith("payload."))
        .map((fieldName) => fieldName.substring("payload.".length))
        .sort(),
    "Logic": rule.logic
})

const compressedValueSets = readJson("../rules-runner/resources/valueSets.json")

const migrate = (msId, rsId) => {
    const ruleSetDstPath = join(rulesRepoPath, msId)
    mkdirSync(ruleSetDstPath, { recursive: true })

    const ruleSetSrcPath = join(msId, `${rsId}.json`)
    readJson(ruleSetSrcPath).forEach((rule) => {
        const ruleDstPath = join(ruleSetDstPath, rule.id)
        if (!existsSync(ruleDstPath)) {
            mkdirSync(ruleDstPath)
        }
        writeJson(join(ruleDstPath, `rule.json`), migrateRule(rule, msId))
    })

    const rulesTestsSrcPath = join(msId, "tests")
    const tests = readdirSync(rulesTestsSrcPath)
        .filter((path) => path.endsWith(".json"))

    tests.forEach((ruleTestsSrcPath) => {
        const ruleId = ruleTestsSrcPath.substring(0, ruleTestsSrcPath.length - ".json".length)
        const ruleDstPath = join(ruleSetDstPath, ruleId)
        const ruleTestsDstPath = join(ruleDstPath, "tests")
        if (!existsSync(ruleTestsDstPath)) {
            mkdirSync(ruleTestsDstPath)
        }

        const ruleTests = readJson(join(rulesTestsSrcPath, ruleTestsSrcPath))
        ruleTests.forEach((ruleTest, index) => {
            writeJson(
                join(ruleTestsDstPath, `test${("" + (index + 1)).padStart(3, "0")}.json`),
                {
                    name: ruleTest.name,
                    payload: ruleTest.payload,
                    expected: ruleTest.expected,
                    external: {
                        validationClock: ruleTest.validationClock,
                        valueSets: compressedValueSets
                    }
                }
            )
        })
    })
}

migrate("EU", "template-ruleset")
migrate("NL", "NL-specific-ruleset")
migrate("FI", "FI-specific-ruleset")

