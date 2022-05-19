import {
    boolsiness,
    dccDateOfBirth,
    extractFromUVCI,
    isDate,
    plusTime
} from "certlogic-js/dist/internals"
import {TimeUnit, isInt} from "certlogic-js"


export interface Evaluatable {
    evaluateWith: (data: any) => any
}


export class LiteralValue implements Evaluatable {
    private readonly value: any
    constructor(value: any) {
        this.value = value
    }
    evaluateWith(_: any): any {
        return this.value
    }
}

export const isLiteral = (value: Evaluatable): boolean =>
    value instanceof LiteralValue


const trueLiteralValue = new LiteralValue(true)
const falseLiteralValue = new LiteralValue(false)
const literalValues: { [ value: string | number ]: LiteralValue } = {}
export const literalValue = (value: boolean | string | number | Date | any[]) => {
    if (typeof value === "boolean") {
        return value ? trueLiteralValue : falseLiteralValue
    }
    if (typeof value === "string" || typeof value === "number") {
        if (!(value in literalValues)) {
            literalValues[value] = new LiteralValue(value)
        }
        return literalValues[value]
    }
    /*
    if (!(value instanceof Date) || !Array.isArray(value)) {
        console.log(`[ERROR] unexpected literal value (typeof = "${typeof value}": ${value}`)
    }
     */
    // value must be either a Date, or an array ==> pass-through without trying to memois:
    return new LiteralValue(value)
}


export class EvaluatableArray implements Evaluatable {  // ("Array" is already in global scope)
    private readonly items: Evaluatable[]
    constructor(items: Evaluatable[]) {
        this.items = items
    }
    evaluateWith(data: any): any[] {
        return this.items.map((item) => item.evaluateWith(data))
    }
}


export class It implements Evaluatable {
    evaluateWith(data: any): any {
        return data
    }
}


export type Fragment = string | number

export class DataAccess implements Evaluatable {
    private readonly fragments: Fragment[]
    constructor(fragments: Fragment[]) {
        this.fragments = fragments
    }
    evaluateWith(data: any): any {
        return this.fragments.reduce((acc, fragment) => {
            if (acc === null) {
                return null
            }
            const value = acc[fragment]
            return value === undefined ? null : value
        }, data)
    }
}


export class If implements Evaluatable {
    private readonly guard: Evaluatable
    private readonly then: Evaluatable
    private readonly else_: Evaluatable
    constructor(guard: Evaluatable, then: Evaluatable, else_: Evaluatable) {
        this.guard = guard
        this.then = then
        this.else_ = else_
    }
    evaluateWith(data: any): any {
        const evalGuard = this.guard.evaluateWith(data)
        switch (boolsiness(evalGuard)) {
            case true: return this.then.evaluateWith(data)
            case false: return this.else_.evaluateWith(data)
            default: throw new Error(`guard of an "if" operation evaluates to something neither truthy, nor falsy: ${evalGuard}`)
        }
    }
}


export class And implements Evaluatable {
    private readonly operands: Evaluatable[]
    constructor(operands: Evaluatable[]) {
        this.operands = operands
    }
    evaluateWith(data: any): any {
        return this.operands.reduce(
            (acc, operand) => {
                switch (boolsiness(acc)) {
                    case false: return acc
                    case true: return operand.evaluateWith(data)
                    default: throw new Error(`all operands of an "and" operation must be either truthy or falsy`)
                }
            },
            true
        )
    }
}


export class BinaryIntegerPlus implements Evaluatable {
    private readonly leftOperand: Evaluatable
    private readonly rightOperand: Evaluatable
    constructor(leftOperand: Evaluatable, rightOperand: Evaluatable) {
        this.leftOperand = leftOperand
        this.rightOperand = rightOperand
    }
    evaluateWith(data: any): any {
        const l = this.leftOperand.evaluateWith(data)
        const r = this.rightOperand.evaluateWith(data)
        if (!isInt(l) || !isInt(r)) {
            throw new Error(`operands of a "+" operation must both be integers`)
        }
        return l + r
    }
}


export class Eq implements Evaluatable {
    private readonly leftOperand: Evaluatable
    private readonly rightOperand: Evaluatable
    constructor(leftOperand: Evaluatable, rightOperand: Evaluatable) {
        this.leftOperand = leftOperand
        this.rightOperand = rightOperand
    }
    evaluateWith(data: any): any {
        return this.leftOperand.evaluateWith(data) === this.rightOperand.evaluateWith(data)
    }
}


export type BinaryLambda = (left: any, right: any) => any

export class BiTriOperation implements Evaluatable {
    private readonly operands: Evaluatable[]
    private readonly lambda: BinaryLambda
    private readonly typeCheck?: "date" | "int"
    constructor(operands: Evaluatable[], lambda: BinaryLambda, typeCheck?: "date" | "int") {
        this.operands = operands
        this.lambda = lambda
        this.typeCheck = typeCheck
    }
    evaluateWith(data: any): any {
        const operate = (l: any, r: any): any => {
            switch (this.typeCheck) {
                case "date": {
                    if (!isDate(l) || !isDate(r)) {
                        throw new Error(`all operands of a date-time comparison operation must be date-times`)
                    }
                    break
                }
                case "int": {
                    if (!isInt(l) || !isInt(r)) {
                        throw new Error(`all operands of an integer comparison operation must be integers`)
                    }
                    break
                }
            }
            return this.lambda(l, r)
        }
        const x = this.operands[0].evaluateWith(data)
        const y = this.operands[1].evaluateWith(data)
        const w = operate(x, y)
        if (this.operands.length === 2) {
            return w
        }
        const z = this.operands[2].evaluateWith(data)
        return w && operate(y, z)
    }
}


export class LinearIn implements Evaluatable {
    private readonly lhs: Evaluatable
    private readonly rhs: Evaluatable
    constructor(lhs: Evaluatable, rhs: Evaluatable) {
        this.lhs = lhs
        this.rhs = rhs
    }
    evaluateWith(data: any): any {
        const evalRhs = this.rhs.evaluateWith(data)
        if (!Array.isArray(evalRhs)) {
            throw new Error(`right-hand side of an "in" operation must be an array`)
        }
        return evalRhs.indexOf(this.lhs.evaluateWith(data)) > -1
    }
}


const binSearch = (lhs: any, items: any[]): boolean => {
    let start = 0, end = items.length - 1
    while (start <= end) {
        const mid = Math.floor((start + end)/2)
        if (items[mid] === lhs) {
            return true
        } else if (items[mid] < lhs) {
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return false
}

export class BinarySearchIn implements Evaluatable {
    private readonly lhs: Evaluatable
    private readonly items: any[]
    constructor(lhs: Evaluatable, items: any[]) {
        this.lhs = lhs
        this.items = items
    }
    evaluateWith(data: any): any {
        const evalLhs = this.lhs.evaluateWith(data)
        return binSearch(evalLhs, this.items)
    }
}


export class Not implements Evaluatable {
    private readonly operandExpr: Evaluatable
    constructor(operandExpr: Evaluatable) {
        this.operandExpr = operandExpr
    }
    evaluateWith(data: any): any {
        const operand = this.operandExpr.evaluateWith(data)
        switch (boolsiness(operand)) {
            case false: return true
            case true: return false
            default: throw new Error(`operand of "!" evaluated to something neither truthy, nor falsy: ${operand}`)
        }
    }
}


export class PlusTime implements Evaluatable {
    private readonly dateOperand: Evaluatable
    private readonly amount: number
    private readonly unit: TimeUnit
    constructor(dateOperand: Evaluatable, amount: number, unit: TimeUnit) {
        this.dateOperand = dateOperand
        this.amount = amount
        this.unit = unit
    }
    evaluateWith(data: any): any {
        const dateTimeStr = this.dateOperand.evaluateWith(data)
        if (typeof dateTimeStr !== "string") {
            throw new Error(`date argument of a "plusTime" operation must be a string`)
        }
        return plusTime(dateTimeStr, this.amount, this.unit)
    }
}


export class Reduce implements Evaluatable {
    private readonly operand: Evaluatable
    private readonly lambda: Evaluatable
    private readonly initial: Evaluatable
    constructor(operand: Evaluatable, lambda: Evaluatable, initial: Evaluatable) {
        this.operand = operand
        this.lambda = lambda
        this.initial = initial
    }
    evaluateWith(data: any): any {
        const evalOperand = this.operand.evaluateWith(data)
        const evalInitial = () => this.initial.evaluateWith(data)
        if (evalOperand === null) {
            return evalInitial()
        }
        if (!Array.isArray(evalOperand)) {
            throw new Error(`operand of a "reduce" operation evaluated to a non-null non-array`)
        }
        return (evalOperand as any[])
            .reduce(
                (accumulator, current) => this.lambda.evaluateWith({ accumulator, current /* (patch:) , data */ }),
                evalInitial()
            )
    }
}


export class ExtractFromUVCI implements Evaluatable {
    private readonly operand: Evaluatable
    private readonly index: number
    constructor(operand: Evaluatable, index: number) {
        this.operand = operand
        this.index = index
    }
    evaluateWith(data: any): any {
        const evalOperand = this.operand.evaluateWith(data)
        if (!(evalOperand === null || typeof evalOperand === "string")) {
            throw new Error(`"UVCI" argument (#1) of "extractFromUVCI" must be either a string or null`)
        }
        return extractFromUVCI(evalOperand, this.index)
    }
}


export class DccDateOfBirth implements Evaluatable {
    private readonly operand: Evaluatable
    constructor(operand: Evaluatable) {
        this.operand = operand
    }
    evaluateWith(data: any): any {
        const evalOperand = this.operand.evaluateWith(data)
        if (!(typeof evalOperand === "string")) {
            throw new Error(`operand of "dccDateOfBirth" must be a string`)
        }
        return dccDateOfBirth(evalOperand)
    }
}

