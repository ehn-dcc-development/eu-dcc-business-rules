import { readdirSync } from "fs"
import { join } from "path"

import { readJson, writeJson } from "./file-utils"
import { repoPath, rulesPath } from "./paths"


const valueSetsPath = join(repoPath, "../ehn-dgc-schema/valuesets")
const testFiles = readdirSync(valueSetsPath)


interface ValueSet {
    valueSetId: string
    valueSetValues: Map<string, any>
}

const valueSets: any = {}
testFiles.forEach((path) => {
    const valueSet = readJson(join(valueSetsPath, path)) as ValueSet
    valueSets[valueSet.valueSetId] = Object.keys(valueSet.valueSetValues)
})

writeJson(join(rulesPath, "valueSets.json"), valueSets)

