export type ValueSets = { [valueSetId: string]: object[] }

export type CompressedValueSets = { [valueSetId: string]: string[] }    // values are value IDs

export const compressValueSets = (valueSets: ValueSets): CompressedValueSets =>
    Object.fromEntries(
        [   // determine order of value sets explicitly, for consistency:
            "country-2-codes",
            "disease-agent-targeted",
            "covid-19-lab-test-manufacturer-and-name",
            "covid-19-lab-result",
            "covid-19-lab-test-type",
            "vaccines-covid-19-auth-holders",
            "vaccines-covid-19-names",
            "sct-vaccines-covid-19"
        ].map(
            (valueSetId) =>
                [
                    valueSetId,
                    Object.keys(valueSets[valueSetId]).sort()   // order for consistency
                ]
        )
    )

