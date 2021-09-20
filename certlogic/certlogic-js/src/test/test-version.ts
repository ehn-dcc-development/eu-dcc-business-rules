const { isTrue } = require("chai").assert

import { implementationVersion, specificationVersion } from "../index"


describe("versions", () => {

    it("should be able to say which implementation version (semver) this engine is at", () => {
        isTrue(implementationVersion.match(/^\d+\.\d+\.\d+$/) !== null)
    })

    it("should be able to say which specification version (semver) this engine is compatible with", () => {
        isTrue(specificationVersion.match(/^\d+\.\d+\.\d+$/) !== null)
    })

})

