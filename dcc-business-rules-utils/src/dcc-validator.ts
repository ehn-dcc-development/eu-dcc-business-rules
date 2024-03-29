import {evaluate} from "certlogic-js"
import {gt} from "semver"

import {Rule, RuleType} from "./rule"
import {CompressedValueSets} from "./valueSets"


/**
 * The parameters that explicitly play a role in validating a DCC,
 * because rule selection is based on them.
 */
export type ValidationParameters = {
    /**
     * The Country of Arrival: the country that the traveler attempts to enter.
     * A country 2-code ~ ISO 3166-1 alpha-2.
     */
    CoA: string
    /**
     * The Country of Issuance: the country that has issued the DCC presented (for validation) by the traveler.
     * A country 2-code ~ ISO 3166-1 alpha-2.
     */
    CoI: string
    /**
     * The point in time at which the validation is (supposedly) performed.
     * An ISO 8601 timestamp.
     */
    validationTime: string
}


/**
 * Groups the given array into a new array of groups (also arrays),
 * with each group consisting of items with the same key value, determined by the key function.
 * Each group corresponds to a unique key value, and is non-empty.
 */
const groupBy = <T>(array: T[], keyFn: (t: T) => string): (T[])[] =>
    Object.values(
        array.reduce((acc: { [key: string]: T[] }, value) => {
            const key = keyFn(value)
            if (acc[key] === undefined) {
                acc[key] = []
            }
            acc[key].push(value)
            return acc
        }, {})
    )


/**
 * Selects the latest versions (by semver version number) from the given array of rules.
 * Note that a rule's identity is determined by its `Identifier` field,
 * and that multiple versions with the same ID may exist.
 */
const selectLatestVersions = (rules: Rule[]): Rule[] =>
    groupBy(rules, (rule) => rule.Identifier)
        .map((ruleVersions: Rule[]): Rule =>   // ruleVersions is a non-empty array <== groupBy
            ruleVersions.reduce((acc, value) =>     // find the rule (version) with highest semver version number
                gt(acc.Version, value.Version) ? acc : value
            )
        )


/**
 * Selects the versions of the rules,
 * selected from the given `rules` based on `country` and `type`,
 * that are applicable at the given moment (`dateTime`).
 * (For stability, the rules returned are sorted by the values of their `Identifier` fields.)
 */
export const applicableRuleVersions = (rules: Rule[], country: string, type: RuleType, dateTime: Date): Rule[] => {
    const applicableRuleVersionsForSelection = rules.filter((rule) =>
            rule.Country === country
        &&  rule.Type === type
        &&  new Date(rule.ValidFrom) <= dateTime && dateTime < new Date(rule.ValidTo)
    )
    return selectLatestVersions(applicableRuleVersionsForSelection)
        .sort((l, r) => l.Identifier < r.Identifier ? -1 : 1)   // === 0 isn't hit because they're IDs
}


/**
 * Validates the given DCC (HCERT payload) against the rules that are selected based on the given parameters.
 * (It also required the value sets to be input in “compressed” format.)
 * The rules may be retrieved from a National Backend to the EU DCC Gateway.
 */
export const validateDcc = (
            rules: Rule[],
            parameters: ValidationParameters,
            valueSets: CompressedValueSets,
            dccPayload: unknown
        ): boolean => {

    const dateTime = new Date(parameters.validationTime)
    const acceptanceRules = applicableRuleVersions(rules, parameters.CoA, "Acceptance", dateTime)
    const invalidationRules = applicableRuleVersions(rules, parameters.CoI, "Invalidation", dateTime)

    const data = {
        payload: dccPayload,
        external: {
            validationClock: parameters.validationTime,
            countryCode: parameters.CoA,
            // TODO  ?: exp, iat(, kid)
            valueSets
        }
    }

    return acceptanceRules.every((rule) => evaluate(rule.Logic, data))
        && !(invalidationRules.some((rule) => evaluate(rule.Logic, data)))
}

