import {CertLogicExpression, TimeUnit, evaluate, isInt} from "certlogic-js"
import {boolsiness} from "certlogic-js/dist/internals"
import {validate} from "certlogic-js/dist/validation"
import {hasConstantValue} from "./compiler-utils"
import {
    And,
    BinaryIntegerPlus,
    BinaryLambda,
    BinarySearchIn,
    BiTriOperation,
    DataAccess, DccDateOfBirth,
    Eq,
    Evaluatable,
    EvaluatableArray,
    ExtractFromUVCI,
    If,
    isLiteral,
    It,
    LinearIn,
    literalValue,
    Not,
    PlusTime,
    Reduce
} from "./evaluatables"


const compileArray = (values: CertLogicExpression[]): Evaluatable => {
    const compiledValues = values.map(compile_)
    return compiledValues.every(isLiteral)
        ? literalValue(compiledValues.map((compiledValue) => compiledValue.evaluateWith(undefined)))
        : new EvaluatableArray(compiledValues)
}


const compileVar = (path: string): Evaluatable =>
    (path === "")
        ? new It()
        : new DataAccess(path.split("."))


const compileIf = (guard: CertLogicExpression, then: CertLogicExpression, else_: CertLogicExpression): Evaluatable => {
    const compiledGuard = compile_(guard)
    if (isLiteral(compiledGuard)) {
        const evalGuard = compiledGuard.evaluateWith(undefined)
        // console.log(`[INFO] optimising "if" operation because guard has static value: ${evalGuard}`)
        switch (boolsiness(evalGuard)) {
            case true: return compile_(then)   // then can't have a static value, or whole "if" would have had a static value
            case false: return compile_(else_)  // ditto
            default: throw new Error(`guard of an "if" operation evaluated to something neither truthy, nor falsy: ${evalGuard}`)
        }
    }
    return new If(compile_(guard), compile_(then), compile_(else_))
}


const comparisonOperatorToLambda = (operator: string): BinaryLambda => {
    switch (operator) {
        case ">":
        case "after": return (l, r) => l > r
        case "<":
        case "before": return (l, r) => l < r
        case ">=":
        case "not-before": return (l, r) => l >= r
        case "<=":
        case "not-after": return (l, r) => l <= r
        default: throw new Error(`can't derive lambda for comparison operator: ${operator}`)
    }
}


const compileInfix = (operator: string, values: CertLogicExpression[]): Evaluatable => {
    switch (operator) {
        case "===": return new Eq(compile_(values[0]), compile_(values[1]))
        case "in": {
            if (hasConstantValue(values[1])) {
                const rhs = evaluate(values[1], undefined)
                if (!Array.isArray(rhs)) {
                    throw new Error(`right-hand side of an "in" operation must be an array`)
                }
                // console.log(`[INFO] optimising an "in" operation with static right-hand side: [ ${rhs.map((item) => `"${item}"`).join(", ")} ]`)
                switch (rhs.length) {
                    case 0: return literalValue(false)
                    case 1: return new Eq(compile_(values[0]), literalValue(rhs[0]))
                    default: {
                        rhs.sort()
                        return new BinarySearchIn(compile_(values[0]), rhs)
                    }
                }
            }
            return new LinearIn(compile_(values[0]), compile_(values[1]))
        }
        case "+": return new BinaryIntegerPlus(compile_(values[0]), compile_(values[1]))
        case "<":
        case ">":
        case "<=":
        case ">=": return new BiTriOperation(values.map(compile_), comparisonOperatorToLambda(operator), "int")
        case "after":
        case "before":
        case "not-after":
        case "not-before": return new BiTriOperation(values.map(compile_), comparisonOperatorToLambda(operator), "date")
        case "and": {
            switch (values.length) {
                case 0: return literalValue(true)
                case 1: return compile_(values[0])
                default: return new And(values.map(compile_))
            }
        }
        default: throw new Error(`can't compile infix operator: ${operator}`)
    }
}


const tryOptimise = (expr: CertLogicExpression, unoptimised: (compiledOperand: Evaluatable) => Evaluatable): Evaluatable => {
    const compiledExpr = compile_(expr)
    return isLiteral(compiledExpr)
        ? literalValue(evaluate(expr, undefined))   // have to evaluate the entire expression using the evaluator, to trigger type checks
        : unoptimised(compiledExpr)
}


const compileNot = (operand: CertLogicExpression): Evaluatable =>
    tryOptimise(operand, (compiledOperand) => new Not(compiledOperand))


const compilePlusTime = (operand: CertLogicExpression, amount: number, unit: TimeUnit): Evaluatable =>
    tryOptimise(operand, (compiledOperand) => new PlusTime(compiledOperand, amount, unit))


const compileReduce = (operand: CertLogicExpression, lambda: CertLogicExpression, initial: CertLogicExpression): Evaluatable =>
    new Reduce(compile_(operand), compile_(lambda), compile_(initial))


const compileExtractFromUVCI = (operand: CertLogicExpression, index: number): Evaluatable =>
    tryOptimise(operand, (compiledOperand) => new ExtractFromUVCI(compiledOperand, index))


const compileDccDateOfBirth = (operand: CertLogicExpression): Evaluatable =>
    tryOptimise(operand, (compiledOperand) => new DccDateOfBirth(compiledOperand))


const compile_ = (expr: CertLogicExpression): Evaluatable => {
    if (hasConstantValue(expr)) {
        // console.log(`[INFO] optimised as constant value: ${JSON.stringify(expr, null, 2)}`)
        return literalValue(evaluate(expr, undefined))
    }
    if (typeof expr === "string" || isInt(expr) || typeof expr === "boolean") {
        return literalValue(expr)
    }
    if (Array.isArray(expr)) {
        return compileArray(expr)
    }
    if (typeof expr === "object") { // That includes Date objects, but those have no keys, so are returned as-is.
        const operator = (Object.keys(expr))[0]
        const values = (expr as any)[operator]
        if (operator === "var") {
            return compileVar(values)
        }
        if (operator === "if") {
            const [ guard, then, else_ ] = values
            return compileIf(guard, then, else_)
        }
        if ([ "===", "and", ">", "<", ">=", "<=", "in", "+", "after", "before", "not-after", "not-before" ].indexOf(operator) > -1) {
            return compileInfix(operator, values)
        }
        if (operator === "!") {
            return compileNot(values[0])
        }
        if (operator === "plusTime") {
            return compilePlusTime(values[0], values[1], values[2])
        }
        if (operator === "reduce") {
            return compileReduce(values[0], values[1], values[2])
        }
        if (operator === "extractFromUVCI") {
            return compileExtractFromUVCI(values[0], values[1])
        }
        if (operator === "dccDateOfBirth") {
            return compileDccDateOfBirth(values[0])
        }
    }
    throw new Error(`could not compile CertLogic expression`)
}


export const compile = (expr: CertLogicExpression): Evaluatable => {
    if (validate(expr).length > 0) {
        throw new Error(`can't compile an invalid CertLogic expression`)
    }
    return compile_(expr)
}

