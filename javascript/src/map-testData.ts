/**
 * Map a JS function over all DGC payloads in the dgc-testdata repo,
 * which is assumed to exist right next to this dgc-business-rules repo.
 */


import { PathLike } from "fs"
const readdirRecursive = require("fs-readdir-recursive")
import { join } from "path"

import { readJson } from "./file-utils"


export interface TestFileIdentification {
    memberState: string
    fileName: string
}

export interface MapResult<RT> {
    testFileId: TestFileIdentification
    notJson?: boolean
    result?: RT
}

function mapTestFile<RT>(path: PathLike, func: (json: any) => RT): MapResult<RT> {
    const testJson = readJson(path)
    const fileMatch = path.toString().match(/.+?dgc-testdata\/(\w+)\/2DCode\/raw\/(.+?)\.json$/)
    if (!fileMatch) {
        throw new Error(`could no disassemble path "${path}"`)
    }
    const testFileId: TestFileIdentification = {
        memberState: fileMatch[1],
        fileName: fileMatch[2]
    }
    if (!testJson) {
        return {
            testFileId,
            notJson: true
        }
    }
    return {
        testFileId,
        result: func(testJson)
    }
}

const testDataPath = join(__dirname, "../../../dgc-testdata")
const testFiles = readdirRecursive(testDataPath).filter((path: string) => path.match(/\/raw\/(.+?)\.json$/))


type MapResults<RT> = MapResult<RT>[]

/**
 * Map the given `func` on all DGC payloads in the dgc-testdata repo,
 * gathering the results as a {@see MapResults}.
 */
export function mapTestFiles<RT>(func: (dgc: any) => RT): MapResults<RT> {
    return testFiles.map((path: string) => mapTestFile(join(testDataPath, path), func))
}

