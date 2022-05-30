import {CertificateType, Rule} from "../rule"
import {parseRuleId} from "../id-parsing"
import {CertLogicExpression} from "certlogic-js"


export const certificateTypeFrom = (id: string): CertificateType => {
    switch (parseRuleId(id).type) {
        case "RR": return "Recovery"
        case "TR": return "Test"
        case "VR": return "Vaccination"
        default: return "General"
    }
}

export const idPrefixFor = (certificateType: CertificateType): string => {
    switch (certificateType) {
        case "General": return "GR"
        case "Recovery": return "RR"
        case "Test": return "TR"
        case "Vaccination": return "VR"
    }
}


export type Versioning = {
    version: string
    validFrom: string
    validTo: string
}

export const ruleWith = (id: string, { version, validFrom, validTo }: Versioning, expr: CertLogicExpression): Rule => {
    const { type, country } = parseRuleId(id)
    return {
        Identifier: id,
        Type: type === "IR" ? "Invalidation" : "Acceptance",
        Country: country,
        Version: version,
        SchemaVersion: "1.3.0",
        Engine: "CERTLOGIC",
        EngineVersion: "1.1.2",
        CertificateType: certificateTypeFrom(id),
        Description: [],
        ValidFrom: validFrom,
        ValidTo: validTo,
        AffectedFields: [],
        Logic: expr
    }
}

export const versioning = (version: string, validFrom: string, validTo: string): Versioning =>
    ({ version, validFrom, validTo })

