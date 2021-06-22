const { isTrue } = require("chai").assert

import { version } from "../index"


describe("version", () => {

    it("should be able to say which (semver) version this engine is at", () => {
        isTrue(version.match(/^\d+\.\d+\.\d+$/) !== null)
    })

})

