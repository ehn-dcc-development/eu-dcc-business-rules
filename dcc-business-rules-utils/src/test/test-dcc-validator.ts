const {deepEqual, equal, isFalse, isTrue} = require("chai").assert
import {CertLogicExpression} from "certlogic-js"
import {if_, var_} from "certlogic-js/dist/factories"

import {
    applicableRuleVersions, CertificateType,
    Rule,
    validateDcc,
    validateRule
} from "../index"
import {idPrefixFor, ruleWith, versioning} from "./test-utils"


describe("applicableRuleVersions (rules selection)", () => {

    it("picks the correct (Acceptance) rule version", () => {
        const ruleVersion = (version: string, validFrom: string, validTo: string, expr: CertLogicExpression): Rule =>
            ruleWith("GR-YY-0000", { version, validFrom, validTo }, expr)
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
            ruleWith("GR-YY-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true),
            ruleWith("IR-XX-0000", versioning("1.0.0,", "2022-01-01", "2030-01-01"), true)
        ]
        isFalse(validateDcc(rules, { validationTime: "2022-02-01", CoA: "YY", CoI: "XX" }, {}, {}))
    })

})


describe("check data accesses against CertificateType", () => {

    const assertFor = (certificateType: CertificateType, path: string, expectMetaDataError: boolean) => {
        const ruleId = `${idPrefixFor(certificateType)}-XX-0001`
        const rule = ruleWith(ruleId, versioning("1.0.0", "2022-01-01", "2030-01-01"), if_(var_(`payload.${path}`), true, false))
        rule.AffectedFields = [ path ]
        const validationResult = validateRule(rule)
        deepEqual(
            validationResult.metaDataErrors,
            expectMetaDataError
                ? [ `CertificateType ${certificateType} doesn't match with its AffectedFields [ "${path}" ]` ]
                : []
        )
        isTrue(null === validationResult.affectedFields)
    }

    it("disregards dob", () => {
        assertFor("Vaccination", "dob", false)
    })

    it("works for General-type rule", () => {
        assertFor("General", "nam", false)
    })

    it(`triggers on top-level access of "nam"`, () => {
        assertFor("Vaccination", "nam", true)
    })

    it(`triggers on top-level access of "ver"`, () => {     // (despite the field's name starting with 'v')
        assertFor("Vaccination", "ver", true)
    })

    it("works for Recovery-type rule", () => {
        assertFor("Recovery", "r.0.du", false)
        assertFor("Recovery", "v.0.mp", true)
    })

    it("works for Test-type rule", () => {
        assertFor("Test", "t.0.sc", false)
        assertFor("Test", "r.0.df", true)
    })

    it("works for Vaccination-type rule", () => {
        assertFor("Vaccination", "v.0.dt", false)
        assertFor("Vaccination", "t.0.sc", true)
    })

})

