const { isNotNull } = require("chai").assert
import { valid } from "semver"

import { implementationVersion, specificationVersion } from "../index"


describe("versions", () => {

    it("should be able to say which implementation version (semver) this engine is at", () => {
        isNotNull( valid(implementationVersion))
    })

    it("should be able to say which specification version (semver) this engine is compatible with", () => {
        isNotNull( valid(specificationVersion))
    })

})

