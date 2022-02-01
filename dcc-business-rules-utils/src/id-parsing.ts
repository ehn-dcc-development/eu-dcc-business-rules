/**
 * Type for a POJSO with the parsed parts of a rule ID (that conforms to the format specified in the JSON Schema).
 */
export type ParsedRuleIdentifier = {

    /**
     * The stated type of the rule:<br/>
     *     "GR" ~ General<br/>
     *     "VR" ~ Vaccination<br/>
     *     "TR" ~ Test<br/>
     *     "RR" ~ Recovery<br/>
     *     "IR" ~ Invalidation<br/>
     */
    type: string

    /**
     * The ISO 3166-2 alpha-2 code of the Country of Issuance (CoI).
     */
    country: string

    /**
     * The number of the rule, as a string left-padded with zeroes to 4 positions.
     */
    number: string
}


/**
 * Parse the rule ID (located in the `Identifier` field of a `Rule`) into parts,
 * and return an object with those.
 * @throws an Error when the rule ID is not in the specified in the JSON Schema.
 */
export const parseRuleId = (ruleId: string): ParsedRuleIdentifier => {
    const match = ruleId.match(/^(GR|VR|TR|RR|IR)-([A-Z]{2})-(\d{4})$/)
    if (!match) {
        throw new Error(`couldn't parse rule ID "${ruleId}" because it's not in the format specified in the JSON Schema`)
    }
    return {
        type: match[1],
        country: match[2],
        number: match[3]
    }
}

