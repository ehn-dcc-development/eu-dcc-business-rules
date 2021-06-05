import { TimeUnit } from "./typings"

/**
 * @returns whether the given `value` is considered *falsy* by CertLogic.
 * Note: the notions of both falsy and truthy are narrower than those of JavaScript, and even of JsonLogic.
 * Truthy and falsy values can be used for conditional logic, e.g. the guard of an `if`-expression.
 * Values that are neither truthy nor falsy (many of which exist) can't be used for that.
 */
export const isFalsy = (value: any) => value === false || value === null
/**
 * @returns whether the given `value` is considered *truthy* by CertLogic.
 * @see isFalsy
 */
export const isTruthy = (value: any) => value === true || (Array.isArray(value) ? value.length > 0 : (typeof value === "object" && value !== null))


export const isInt = (value: any): value is number => typeof value === "number" && Number.isInteger(value)

export const isDate = (value: any): value is Date => typeof value === "object" && "toISOString" in value


export const plusTime = (dateTimeStr: string, amount: number, unit: TimeUnit): Date => {
    const dateTime = new Date(dateTimeStr)
    if (unit === "day") {
        dateTime.setDate(dateTime.getDate() + amount)
    } else if (unit === "hour") {
        dateTime.setHours(dateTime.getHours() + amount)
    }
    return dateTime
}

