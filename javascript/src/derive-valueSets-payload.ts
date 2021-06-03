import { readdirSync } from "fs"
import { join } from "path"

import { readJson, writeJson } from "./file-utils"
import { repoPath, rulesetsPath } from "./paths"


const valueSetsPath = join(repoPath, "../ehn-dgc-schema/valuesets")
const valueSetFiles = readdirSync(valueSetsPath).filter((path) => path.endsWith(".json"))


interface ValueSet {
    valueSetId: string
    valueSetValues: Map<string, any>
}

const valueSets: any = {}
valueSetFiles.forEach((path) => {
    const valueSet = readJson(join(valueSetsPath, path)) as ValueSet
    valueSets[valueSet.valueSetId] = Object.keys(valueSet.valueSetValues)
})

writeJson(join(rulesetsPath, "valueSets.json"), valueSets)


// TODO  move this to /rulesets

