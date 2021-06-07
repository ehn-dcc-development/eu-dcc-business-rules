import { existsSync, PathLike, readFileSync } from "fs"

export class LoadError {
    message: string
    constructor(message: string) {
        this.message = message
    }
}

export function loadJsonFile<T>(path: PathLike, kind: string): T | LoadError {
    if (!path) {
        return new LoadError(`path for ${kind} not defined`)
    }
    if (!existsSync(path)) {
        return new LoadError(`path '${path}' for ${kind} is not valid: file doesn't exist`)
    }
    try {
        return JSON.parse(readFileSync(path, "utf8")) as T
    } catch (e) {
        return new LoadError(`couldn't load ${kind} JSON file, due to: ${e.message}`)
    }
}

export const filterErrors = (loadResults: (any | LoadError)[]): string[] =>
    loadResults
        .filter((loadResult) => loadResult instanceof LoadError)
        .map((error) => (error as LoadError).message)


/**
 * Extracts CLI arguments of the form '--<name>=<value>' (where name may contain hyphens/dashes)
 * into a map.
 */
export const parameters = () => Object.fromEntries(
    process.argv.map((arg) => {
        const match = arg.match(/^--([-\w]+?)=(.+?)$/)
        return match ? [ match[1], match[2] ] : null
    }).filter((pair) => pair !== null) as ([string, string])[]
)

