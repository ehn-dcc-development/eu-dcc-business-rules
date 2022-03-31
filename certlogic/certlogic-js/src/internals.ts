import { TimeUnit } from "./typings"


export type Dictionary = { [key: string]: any }

/**
 * @returns Whether the given `value` is a "dictionary object".
 */
export const isDictionary = (value: unknown): value is Dictionary =>
        typeof value === "object"
    &&  value !== null
    &&  (value.toString() === "[object Object]")
    &&  !Array.isArray(value)


/**
 * @returns Whether the given `value` is considered *falsy* by CertLogic.
 * Note: the notions of both falsy and truthy are narrower than those of JavaScript, and even of JsonLogic.
 * Truthy and falsy values can be used for conditional logic, e.g. the guard of an `if`-expression.
 * Values that are neither truthy nor falsy (many of which exist) can't be used for that.
 */
export const isFalsy = (value: unknown) =>
       value === false
    || value === null
    || (typeof value === "string" && value === "")
    || (typeof value === "number" && value === 0)
    || (Array.isArray(value) && value.length === 0)
    || (isDictionary(value) && Object.entries(value).length === 0)

/**
 * @returns Whether the given `value` is considered *truthy* by CertLogic.
 * @see isFalsy
 */
export const isTruthy = (value: unknown) =>
       value === true
    || (typeof value === "string" && value !== "")
    || (typeof value === "number" && value !== 0)
    || (Array.isArray(value) && value.length > 0)
    || (isDictionary(value) && Object.entries(value).length > 0)


/**
 * Type to encode truthy/falsy/neither (AKA “boolsiness”):
 *
 *  * `true` &harr; truthy
 *  * `false` &harr; falsy
 *  * `undefined` &harr; neither
 */
export type Boolsiness = boolean | undefined

/**
 * Determines boolsiness of the given JSON value.
 */
export const boolsiness = (value: unknown): Boolsiness => {
    if (isTruthy(value)) {
        return true
    }
    if (isFalsy(value)) {
        return false
    }
    return undefined
}


/**
 * @returns Whether the given value is an integer number.
 */
export const isInt = (value: unknown): value is number =>
    typeof value === "number" && Number.isInteger(value)


/**
 * A type for all CertLogic single-value literals.
 */
export type CertLogicLiteral = string | number | boolean

/**
 * Determine whether the given value is a valid CertLogic literal expression,
 * meaning: a string, an integer number, or a boolean.
 */
export const isCertLogicLiteral = (expr: any): expr is CertLogicLiteral =>
    typeof expr === "string" || isInt(expr) || typeof expr === "boolean"


/**
 * Named function to check whether something is a {@link Date}.
 * @deprecated from 2.0.0 onwards (planned) - use `value instanceof Date` instead.
 */
export const isDate = (value: unknown): value is Date =>
    value instanceof Date


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


/**
 * @returns A {@link Date} that's the result of parsing `dateTimeLikeStr` as an ISO 8601 string using {@link dateFromString},
 * with the indicated number of time units added to it.
 */
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


const optionalPrefix = "URN:UVCI:"
/**
 * @returns The fragment with given index from the UVCI string
 *  (see Annex 2 in the [UVCI specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/vaccination-proof_interoperability-guidelines_en.pdf)),
 *  or `null` when that fragment doesn't exist.
 */
export const extractFromUVCI = (uvci: string | null, index: number): string | null => {
    if (uvci === null || index < 0) {
        return null
    }
    const prefixlessUvci = uvci.startsWith(optionalPrefix) ? uvci.substring(optionalPrefix.length) : uvci
    const fragments = prefixlessUvci.split(/[/#:]/)
    return index < fragments.length ? fragments[index] : null
}


/**
 * @returns The value found within `data` at the given `path`
 *  - this is the semantics of CertLogic's "var" operation.
 */
export const access = (data: any, path: string): any =>
    path === "" // == "it"
        ? data
        : path.split(".").reduce((acc, fragment) => {
            if (acc === null) {
                return null
            }
            const index = parseInt(fragment, 10)
            const value = isNaN(index) ? acc[fragment] : acc[index]
            return value === undefined ? null : value
        }, data)


/**
 * @returns: A JavaScript {@see Date} representing the given date that may be partial (YYYY[-MM[-DD]]).
 * See [the CertLogic specification](https://github.com/ehn-dcc-development/dgc-business-rules/blob/main/certlogic/specification/README.md) for details.
 */
export const dccDateOfBirth = (str: string): Date => {
    const timeSuffix = "T00:00:00.000Z"
    if (str.match(/^\d{4}$/)) {
        return new Date(`${str}-12-31${timeSuffix}`)
    }
    if (str.match(/^\d{4}-\d{2}$/)) {
        const date = new Date(`${str}-01${timeSuffix}`)
        date.setUTCMonth(date.getUTCMonth() + 1)
        date.setUTCDate(0)
        return date
    }
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return new Date(`${str}${timeSuffix}`)
    }

    throw new Error(`can't parse "${str}" as an EU DCC date-of-birth`)
}

