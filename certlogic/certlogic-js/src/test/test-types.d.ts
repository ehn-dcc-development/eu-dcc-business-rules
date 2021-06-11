import { CertLogicExpression } from "../typings"

export type TestDirective = "skip" | "only" | undefined

export interface Assertion {
    data: any
    expected: any
    directive: TestDirective
    certLogicExpression?: CertLogicExpression
    message?: string
}
export interface TestCase {
    name: string
    directive: TestDirective
    certLogicExpression?: CertLogicExpression
    assertions: Assertion[]
}
export interface TestSuite {
    name: string
    directive: TestDirective
    cases: TestCase[]
}

