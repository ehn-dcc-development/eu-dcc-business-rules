const {deepEqual, throws} = require("chai").assert

import {parseRuleId} from "../index"


describe("parseRuleId", () => {

    it("recognises valid IDs", () => {
        deepEqual(parseRuleId("GR-NL-0037"), { type: "GR", country: "NL", number: "0037" })
        deepEqual(parseRuleId("VR-UK-0000"), { type: "VR", country: "UK", number: "0000" })
        deepEqual(parseRuleId("TR-US-0042"), { type: "TR", country: "US", number: "0042" })
        deepEqual(parseRuleId("RR-MT-0003"), { type: "RR", country: "MT", number: "0003" })
        deepEqual(parseRuleId("IR-DE-0001"), { type: "IR", country: "DE", number: "0001" })
    })

    it("recognises invalid IDs", () => {
        const assert1 = (ruleId: string) => {
            throws(() => { parseRuleId(ruleId) }, Error, /couldn't parse rule ID/)
        }
        assert1("")
        assert1("foo")
        assert1("VR-US-xxxx")
        assert1("VR-US-0037-b")
        assert1("BR-US-0042")
    })

})

