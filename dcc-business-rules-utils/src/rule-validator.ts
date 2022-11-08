import {ErrorObject} from "ajv"
import {CertLogicExpression, specificationVersion} from "certlogic-js"
import {dateFromString} from "certlogic-js/dist/internals"
import {
    dataAccesses,
    validateFormat,
    ValidationError
} from "certlogic-js/dist/validation"
import {gt} from "semver"

import {createJsonValidatorForSchema} from "./json-validator"
import {CertificateType, Rule} from "./rule"


const ruleSchemaValidator = createJsonValidatorForSchema(require("./validation-rule.schema.json"))


const areEqual = (leftSet: string[], rightSet: string[]): boolean =>
    leftSet.length === rightSet.length && leftSet.every((item) => rightSet.indexOf(item) > -1)


const withoutPrefix = (prefix: string): (str: string) => string =>
    (str: string) => str.startsWith(prefix) ? str.substring(prefix.length) : str

const dataAccessesPrefixed = (expr: CertLogicExpression, prefix: string): string[] =>
    dataAccesses(expr)
        .filter((fieldName) => fieldName.startsWith(prefix))
        .map(withoutPrefix(prefix))


export type AffectedFieldsValidationResult = null | { actual: string[], computed: string[] }

const validateAffectedFields = (rule: any): AffectedFieldsValidationResult => {
    const actual = rule.AffectedFields
    const computed = dataAccessesPrefixed(rule.Logic, "payload.")
    return areEqual(actual, computed)
        ? null
        : { actual, computed }
}


const validateMetaData = (rule: Rule): string[] => {
    const errors: string[] = []

    const joinWrapped = (strings: string[]) => strings.map((str) => `"${str}"`).join(", ")

    const ruleTypes = [ "Acceptance", "Invalidation" ]
    if (ruleTypes.indexOf(rule.Type) === -1) {
        errors.push(`Type "${rule.Type}" must be one of [ ${joinWrapped(ruleTypes)} ]`)
    }
    if (rule.Engine !== "CERTLOGIC") {
        errors.push(`Engine "${rule.Engine}" must be "CERTLOGIC"`)
    }
    if (gt(rule.EngineVersion, specificationVersion)) {
        errors.push(`EngineVersion ${rule.EngineVersion} is newer than the currently supported version ${specificationVersion}`)
    }
    if (gt("0.7.5", rule.EngineVersion)) {
        errors.push(`EngineVersion ${rule.EngineVersion} must be 0.7.5 or newer`)
    }
    if (!rule.ValidFrom) {
        errors.push(`ValidFrom must be defined`)
    } else {
        const validFrom = dateFromString(rule.ValidFrom)
        if (rule.ValidTo) {
            const validTo = dateFromString(rule.ValidTo)
            if (validFrom > validTo) {
                errors.push(`ValidFrom ${rule.ValidFrom} must be before ValidTo ${rule.ValidTo}`)
            }
            const validFromPlus72hours = dateFromString(rule.ValidFrom) // (== effectively a copy of validFrom)
            validFromPlus72hours.setUTCHours(validFromPlus72hours.getUTCHours() + 72)
            if (validFromPlus72hours >= validTo) {
                errors.push(`validity range ${rule.ValidFrom} - ${rule.ValidTo} of rule must be at least 72 hours long`)
            }
        }
    }
    const fieldPrefix = `${rule.CertificateType.charAt(0).toLowerCase()}.`  // == 'r.' | 't.' | 'v.'
    const isDOBOrMatchesType = (fieldName: string) => fieldName === "dob" || fieldName.startsWith(fieldPrefix)
    if (
            rule.CertificateType !== "General"
        && !rule.AffectedFields.every(isDOBOrMatchesType)
    ) {
        errors.push(`CertificateType ${rule.CertificateType} doesn't match with its AffectedFields [ ${joinWrapped(rule.AffectedFields)} ]`)
    }

    return errors
}


export type RuleValidationResult = {
    ruleId: string
    hasErrors: boolean
    schemaValidationsErrors: ErrorObject[]
    logicValidationErrors: ValidationError[]
    affectedFields: AffectedFieldsValidationResult
    metaDataErrors: string[]
}


const supportedValueSets = [
    "country-2-codes",
    "disease-agent-targeted",
    "covid-19-lab-test-manufacturer-and-name",  // test-manf.json
    "covid-19-lab-result",  // test-result.json
    "covid-19-lab-test-type",   // test-type.json
    "vaccines-covid-19-auth-holders",   // vaccine-mah-manf.json
    "vaccines-covid-19-names",  // vaccine-medicinal-product.json
    "sct-vaccines-covid-19",    // vaccine-prophylaxis.json
]


/**
 * Validates the given JSON value as a DCC business rule.
 */
export const validateRule = (rule: any): RuleValidationResult => {
    const schemaValidationsErrors = ruleSchemaValidator(rule)
    const logicValidationErrors = validateFormat(rule.Logic)
    const valueSetsAccessed = [...new Set(dataAccessesPrefixed(rule.Logic, "external.valueSets."))]
    const unsupportedValueSets = valueSetsAccessed.filter((valueSet) => supportedValueSets.indexOf(valueSet) === -1)
    if (unsupportedValueSets.length > 0) {
        logicValidationErrors.push({
            expr: rule.Logic,
            message: `value set(s) not supported: ${unsupportedValueSets}`
        })
    }
    const affectedFields = validateAffectedFields(rule)
    const metaDataErrors = validateMetaData(rule)
    return {
        ruleId: rule.Identifier,
        hasErrors: schemaValidationsErrors.length > 0 || logicValidationErrors.length > 0 || affectedFields !== null || metaDataErrors.length > 0,
        schemaValidationsErrors,
        logicValidationErrors,
        affectedFields,
        metaDataErrors
    }
}


/**
 * Returns whether the given rules - assumed to constitute all the rules for one country/region - has rules for all event types,
 * based on the value of the `CertificateType` field of the rules.
 */
export const hasRulesForAllEventTypes = (rules: Rule[]) => {
    const hasType = (certificateType: CertificateType) => rules.some((rule) => rule.CertificateType === certificateType)
    return hasType("Recovery") && hasType("Test") && hasType("Vaccination")
}

