import { Rule } from "./typings"


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

