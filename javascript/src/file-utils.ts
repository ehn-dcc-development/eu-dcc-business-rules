import { PathLike, readFileSync, writeFileSync } from "fs"

export const readJson = (path: PathLike) => {
    const jsonAsText = readFileSync(path, "utf8").toString()
    try {
        return JSON.parse(jsonAsText)
    } catch (e) {
        console.error(`couldn't parse "${path}" as JSON, due to "${e.message}" - returning undefined`)
        return undefined
    }

}

export const writeJson = (path: PathLike, json: any) => {
    writeFileSync(path, JSON.stringify(json, null, 2))
}

