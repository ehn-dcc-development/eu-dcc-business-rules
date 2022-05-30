import {CertLogicExpression} from "certlogic-js"


export type RuleType = "Acceptance" | "Invalidation"

export type CertificateType = "General" | "Test" | "Vaccination" | "Recovery"

export type Description = {
    lang: string
    desc: string
}

/**
 * Captures a validation rule, or rather:
 * a <em>version</em> of a rule, with its validity range.
 *
 * Collections (arrays) of rules can have items with the same `Identifier`,
 * but they should have different `Version`s.
 */
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


/**
 * Returns a copy of the given rule that's “normalised” in the sense that the object's fields appear in the order of the type definition.
 * This can be used to make stable serialisations that diff well.
 * The optional second argument can be used to provide an object to which the rule's fields are appended.
 */
export const normalCopyOf = (rule: Rule, target: object = {}): Rule =>
    Object.assign(target, {
        Identifier: rule.Identifier,
        Type: rule.Type,
        Country: rule.Country,
        Version: rule.Version,
        SchemaVersion: rule.SchemaVersion,
        Engine: rule.Engine,
        EngineVersion: rule.EngineVersion,
        CertificateType: rule.CertificateType,
        Description: rule.Description,
        ValidFrom: rule.ValidFrom,
        ValidTo: rule.ValidTo,
        AffectedFields: rule.AffectedFields,
        Logic: rule.Logic
    })

