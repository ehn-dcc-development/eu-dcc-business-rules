const { mkdirSync, readFileSync, readdirSync, writeFileSync } = require("fs")
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
    "EngineVersion": "0.7.5",
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

const migrate = (msId, rsId) => {
    const ruleSet = readJson(`${msId}/${rsId}.json`)
    mkdirSync(join(rulesRepoPath, msId), { recursive: true })
    ruleSet.forEach((rule) => {
        writeJson(join(rulesRepoPath, `${msId}/${rule.id}.json`), migrateRule(rule, msId))
    })

    const tests = readdirSync(`${msId}/tests`)
        .filter((path) => path.endsWith(".json"))
}

migrate("EU", "template-ruleset")
migrate("NL", "NL-specific-ruleset")

