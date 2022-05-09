import {TestDirective} from "./test-types"

export const testDirective2MochaFunc = (testDirective: TestDirective, mochaFunc: any) =>
    testDirective === undefined ? mochaFunc : mochaFunc[testDirective]

