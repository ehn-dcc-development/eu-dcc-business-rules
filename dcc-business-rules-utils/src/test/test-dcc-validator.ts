const {isFalse, isTrue} = require("chai").assert
import {CertLogicExpression} from "certlogic-js"

import {validateDcc, Rule, parseRuleId} from "../index"


type Versioning = {
    version: string
    validFrom: string
    validTo: string
}

const rule = (id: string, { version, validFrom, validTo }: Versioning, expr: CertLogicExpression): Rule => {
    const {type, country} = parseRuleId(id)
    return {
        Identifier: id,
        Type: type === "IR" ? "Invalidation" : "Acceptance",
        Country: country,
        Version: version,
        SchemaVersion: "1.3.0",
        Engine: "CERTLOGIC",
        EngineVersion: "1.1.2",
        CertificateType: "General",
        Description: [],
        ValidFrom: validFrom,
        ValidTo: validTo,
        AffectedFields: [],
        Logic: expr
    }
}

const versioning = (version: string, validFrom: string, validTo: string): Versioning =>
    ({ version, validFrom, validTo })


describe("DCC validator", () => {

    it("picks the correct (Acceptance) rule version", () => {
        const ruleVersion = (version: string, validFrom: string, validTo: string, expr: CertLogicExpression): Rule =>
            rule("GR-YY-0000", { version, validFrom, validTo }, expr)
        const rules: Rule[] = [
            ruleVersion("1.2.0", "2022-01-01", "2028-01-01", false),
            ruleVersion("1.3.0", "2021-12-01", "2029-01-01", true),  // should be selected, despite 1.2.0 being earlier in this array, and having a later ValidFrom
            ruleVersion("1.4.0", "2022-03-01", "2030-01-01", false)
        ]
        isTrue(validateDcc(rules, { validationTime: "2022-02-01", CoA: "YY", CoI: "XX" }, {}, {}))
    })

    it("invalidates a DCC because of an Invalidation rule", () => {
        const rules: Rule[] = [
            rule("GR-YY-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true),
            rule("IR-XX-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true)
        ]
        isFalse(validateDcc(rules, { validationTime: "2022-02-01", CoA: "YY", CoI: "XX" }, {}, {}))
    })

})

