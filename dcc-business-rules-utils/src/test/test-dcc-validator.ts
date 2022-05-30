const {deepEqual, equal, isFalse, isTrue} = require("chai").assert
import {CertLogicExpression} from "certlogic-js"
import {if_, var_} from "certlogic-js/dist/factories"

import {
    applicableRuleVersions, CertificateType,
    parseRuleId,
    Rule,
    validateDcc,
    validateRule
} from "../index"


type Versioning = {
    version: string
    validFrom: string
    validTo: string
}

const rule = (id: string, { version, validFrom, validTo }: Versioning, expr: CertLogicExpression, certificateType?: CertificateType): Rule => {
    const {type, country} = parseRuleId(id)
    return {
        Identifier: id,
        Type: type === "IR" ? "Invalidation" : "Acceptance",
        Country: country,
        Version: version,
        SchemaVersion: "1.3.0",
        Engine: "CERTLOGIC",
        EngineVersion: "1.1.2",
        CertificateType: certificateType ?? "General",
        Description: [],
        ValidFrom: validFrom,
        ValidTo: validTo,
        AffectedFields: [],
        Logic: expr
    }
}

const versioning = (version: string, validFrom: string, validTo: string): Versioning =>
    ({ version, validFrom, validTo })


describe("applicableRuleVersions (rules selection)", () => {

    it("picks the correct (Acceptance) rule version", () => {
        const ruleVersion = (version: string, validFrom: string, validTo: string, expr: CertLogicExpression): Rule =>
            rule("GR-YY-0000", { version, validFrom, validTo }, expr)
        const rules: Rule[] = [
            ruleVersion("1.2.0", "2022-01-01", "2028-01-01", false),
            ruleVersion("1.3.0", "2021-12-01", "2029-01-01", true),  // should be selected, despite 1.2.0 being earlier in this array, and having a later ValidFrom
            ruleVersion("1.4.0", "2022-03-01", "2030-01-01", false)
        ]
        const selection = applicableRuleVersions(rules, "YY", "Acceptance", new Date("2022-02-01"))
        equal(selection.length, 1)
        equal(selection[0], rules[1])
    })

})


describe("validateDcc (DCC validator)", () => {

    it("invalidates a DCC because of an Invalidation rule", () => {
        const rules: Rule[] = [
            rule("GR-YY-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true),
            rule("IR-XX-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true)
        ]
        isFalse(validateDcc(rules, { validationTime: "2022-02-01", CoA: "YY", CoI: "XX" }, {}, {}))
    })

})


describe("check data accesses against CertificateType", () => {

    const ruleWithLogicAndFields = (logic: CertLogicExpression, fields: string[]): Rule => {
        const aRule = rule("VR-XX-0001", versioning("1.0.0", "2022-01-01", "2030-01-01"), logic, "Vaccination")
        aRule.AffectedFields = fields
        return aRule
    }

    it("disregards dob", () => {
        const validationResult = validateRule(ruleWithLogicAndFields(if_(var_("payload.dob"), true, false), [ "dob" ]))
        deepEqual(validationResult.metaDataErrors, [])
        isTrue(null === validationResult.affectedFields)
    })

    it(`triggers on top-level access of "nam"`, () => {
        const validationResult = validateRule(ruleWithLogicAndFields(if_(var_("payload.nam"), true, false), [ "nam" ]))
        deepEqual(validationResult.metaDataErrors, [
            `CertificateType Vaccination doesn't match with its AffectedFields [ "nam" ]`
        ])
        isTrue(null === validationResult.affectedFields)
    })

    it(`triggers on top-level access of "ver"`, () => {     // (despite the field's name starting with 'v')
        const validationResult = validateRule(ruleWithLogicAndFields(if_(var_("payload.ver"), true, false), [ "ver" ]))
        deepEqual(validationResult.metaDataErrors, [
            `CertificateType Vaccination doesn't match with its AffectedFields [ "ver" ]`
        ])
        isTrue(null === validationResult.affectedFields)
    })

    // TODO  check regular validations

})

