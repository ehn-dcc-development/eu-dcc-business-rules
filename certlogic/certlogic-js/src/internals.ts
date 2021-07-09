import { TimeUnit } from "./typings"

const isDictionary = (value: any): value is object =>
    typeof value === "object" && value !== null && !Array.isArray(value)

/**
 * @returns Whether the given `value` is considered *falsy* by CertLogic.
 * Note: the notions of both falsy and truthy are narrower than those of JavaScript, and even of JsonLogic.
 * Truthy and falsy values can be used for conditional logic, e.g. the guard of an `if`-expression.
 * Values that are neither truthy nor falsy (many of which exist) can't be used for that.
 */
export const isFalsy = (value: any) =>
       value === false
    || value === null
    || (typeof value === "string" && value === "")
    || (typeof value === "number" && value === 0)
    || (Array.isArray(value) && value.length === 0)
    || (isDictionary(value) && Object.keys(value).length === 0)

/**
 * @returns Whether the given `value` is considered *truthy* by CertLogic.
 * @see isFalsy
 */
export const isTruthy = (value: any) =>
       value === true
    || (typeof value === "string" && value !== "")
    || (typeof value === "number" && value !== 0)
    || (Array.isArray(value) && value.length > 0)
    || (isDictionary(value) && Object.keys(value).length > 0)


export const isInt = (value: any): value is number => typeof value === "number" && Number.isInteger(value)

export const isDate = (value: any): value is Date => typeof value === "object" && "toISOString" in value


const leftPad = (str: string, len: number, char: string): string => char.repeat(len - str.length) + str

/**
 * @returns A JavaScript {@see Date} object representing the date or date-time given as a string.
 * @throws An {@see Error} in case the string couldn't be parsed as a date or date-time.
 */
export const dateFromString = (str: string) => {
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return new Date(str)
    }
    const matcher = str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+?)?(Z|(([+-])(\d{1,2}):?(\d{2})?))?$/)
    //                                   1      2       3       4       5       6      7        8   910    11          12
    if (matcher) {
        let reformatted = `${matcher[1]}-${matcher[2]}-${matcher[3]}T${matcher[4]}:${matcher[5]}:${matcher[6]}`
        if (matcher[7]) {
            reformatted += matcher[7].padEnd(4, "0").substring(0, 4)
        }
        if (!matcher[8] || (matcher[8] === "Z")) {
            reformatted += "Z"  // Assume timezone offset 'Z' when missing.
        } else {
            reformatted += matcher[10] + leftPad(matcher[11], 2, "0") +  ":" + (matcher[12] || "00")
        }
        return new Date(reformatted)
    }
    throw new Error(`not an allowed date or date-time format: ${str}`)
}


export const plusTime = (dateTimeLikeStr: string, amount: number, unit: TimeUnit): Date => {
    const dateTime = dateFromString(dateTimeLikeStr)
    if (amount === 0) {
        return dateTime
    }
           if (unit === "day") {
        dateTime.setUTCDate(dateTime.getUTCDate() + amount)
    } else if (unit === "hour") {
        dateTime.setUTCHours(dateTime.getUTCHours() + amount)
    } else if (unit === "month") {
       dateTime.setUTCMonth(dateTime.getUTCMonth() + amount)
    } else if (unit === "year") {
       const wasMonth = dateTime.getUTCMonth()
       dateTime.setUTCFullYear(dateTime.getUTCFullYear() + amount)
       if (dateTime.getUTCMonth() > wasMonth) {
           dateTime.setUTCDate(dateTime.getUTCDay() - 1)
       }
    } else {
        throw new Error(`unknown time unit "${unit}"`)
    }
    return dateTime
}

