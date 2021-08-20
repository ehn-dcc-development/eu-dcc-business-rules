import { CertLogicOperation } from "./typings"

export type OperationData = {
    operator: string
    values: string | any[]
}

export const extractOperationData = (expr: CertLogicOperation): OperationData => {
    const keys = Object.keys(expr)
    if (keys.length !== 1) {
        throw new Error(`expression object must have exactly one key, but it has ${keys.length}`)
    }
    const operator = keys[0]
    const values = (expr as any)[operator]
    return { operator, values }
}


// NOTE  don't merge unless this is used!

