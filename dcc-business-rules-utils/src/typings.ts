import { CertLogicExpression } from "certlogic-js"


export type RuleType = "Acceptance" | "Invalidation"

export type CertificateType = "General" | "Test" | "Vaccination" | "Recovery"

export type Description = {
    lang: string
    desc: string
}

export type Rule = {
    Identifier: string
    Type: RuleType
    Country: string
    Version: string
    SchemaVersion: string
    Engine: string
    EngineVersion: string
    CertificateType: CertificateType
    Description: Description[]
    ValidFrom: string
    ValidTo: string
    AffectedFields: string[]
    Logic: CertLogicExpression
}

