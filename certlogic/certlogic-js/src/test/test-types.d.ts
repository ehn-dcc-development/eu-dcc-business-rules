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


export interface Issue {
    expr: unknown
    message: string
}

export interface ValidationTestCase {
    name?: string
    directive: TestDirective
    certLogicExpression: unknown
    issues: Issue[]
}

export interface ValidationTestSuite {
    name: string
    directive: TestDirective
    cases: ValidationTestCase[]
}

