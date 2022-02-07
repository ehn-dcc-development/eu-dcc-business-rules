const { isTrue } = require("chai").assert
import {CertLogicExpression} from "certlogic-js"

import { validateDcc, Rule } from "../index"


describe("DCC validator", () => {

    it("picks the correct (Acceptance) rule version", () => {
        const mkRule = (version: string, validFrom: string, validTo: string, expr: CertLogicExpression): Rule =>
            ({
                Identifier: "GR-YY-0000",
                Type: "Acceptance",
                Country: "YY",
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
            })
        const rules: Rule[] = [
            mkRule("1.2.0", "2022-01-01", "2028-01-01", false),
            mkRule("1.3.0", "2021-12-01", "2029-01-01", true),  // should be selected, despite 1.2.0 being earlier in this array, and having a later ValidFrom
            mkRule("1.4.0", "2022-03-01", "2030-01-01", false)
        ]
        isTrue(validateDcc(rules, { validationTime: "2022-02-01", CoA: "YY", CoI: "XX" }, {}, {}))
    })

})

