# CertLogic: specification


## Version

The semantic version identification of this specification is: **1.3.2**.

The version identification of implementations don't have to be in sync.
Rather, implementations should specify with which version of the specification they're compatible.


## Introduction

CertLogic is a restricted *subset* of JsonLogic, extended with custom operations - e.g. for working with date-times.

The semantics of CertLogic is that of a function which takes a _CertLogic expression_, a _data context_ (structured data), and returns (or: produces/evaluates to) a value.
All three of these values are JSON values that must be _self-contained_, and _non-referential_.
This means that:

* These JSON values can be finitely serialised, and identically deserialised.
* JSON objects anywhere in any of these values have at most one incoming reference (that of their parent), and no outgoing references, except to children.

CertLogic expression objects are of the following form, _except_ for data access (`var`) - see below.

    {
        "<operation id>": [
            <operand 1>,
            <operand 2>,
            // ...
            <operand n>
        ]
    }

The CertLogic evaluator function always evaluates a _valid_ CertLogic expression to some value, never throwing an error.
However, it might throw an error for an _invalid_ expression, meaning it's an expression object with an unknown `<operation id>`, or with a known one with the rest of the object not following the specification for that operation.
This includes type mismatches that aren't detected through upfront validation.
As a result, the CertLogic evaluator does not exhibit undefined behaviour, but simply throws an error.
It's advisable to `try-catch` the evaluation, and return `false` result if that happens when evaluating a validation rule.
(CertLogic expressions are encouraged to _always_ evaluate without error, on any input, not just for "happy paths".)

The CertLogic evaluator function checks the validity of the expression first, before evaluating any of its operands, and before producing a value.
In case of an error, generally the first-occurring error is thrown, but this specification doesn't specify a precise meaning for "first-occurring".
(It's not the intent of this specification to be absolutely precise about the order of evaluation of operands in the face of errors occurring.)

Not every operation always evaluates all of its operands: exceptions to this rule are specified below, per applicable operation.
Type mismatches can only be detected after evaluation of operands.
Operating on a `null` value evaluates to `null` in most, but not all, cases - this is specified below, per operation.

A JSON array evaluates to an array with every item evaluated separately.
If a JSON object (not an array) is a literal, being a boolean, an integer, or a string, it evaluates to itself.


## Values

### Truthy and falsy values

Allowed falsy values are: `false`, `null`, the empty string (`""`), the zero integer (`0`), the empty array (`[]`), and the empty object (`{}`).
Allowed truthy values are: `true`, any non-empty string (meaning: length > 0), any non-zero integer, any non-empty array, and any object with at least one key-value-pair.

Truthy and falsy are disjoint notions: no value can be both truthy and falsy.
Values exist which are neither truthy, nor falsy.
The reason to do this is that JsonLogic has a notion of truthy/falsy that differs from the usual JavaScript one, precisely to aid in cross-platform adoption.
CertLogic restricts this notion even further to avoid confusion, or unjust reliance on behaviour that's perceived as “common” but isn't (cross-platform).

Note: `null`, the empty string, the zero integer, the empty array, and the empty object all being falsy (and not truthy) is useful for checking the presence/existence of values in the data context.


### Literal values: arrays, booleans, integers, and strings

The usual array, boolean, integer (as a subset of JavaScript's `Number` type), and string literals are allowed.
Literal for the following (types of) values are not allowed: objects, `null`, and date-times.


### Dates and date-times

Dates, and date-times (so: timestamps) can only be constructed using the following two operations:

* A `plusTime` operation, which parses the given date(-time) string as a date-time, and adds a given amount of years, months, hours or days.
* A `dccDateOfBirth` operation, which parses the given date-of-birth (which may be a partial date), and converts it to a date-time which is a “beneficial interpretation” of that date.

This approach makes it possible to ensure consistent date/date-time representations across platforms, without being able to implicitly rely on the behaviour of native date/date-time types in combination with the other (allowed) operations.

Both operations always result in a date-time with millisecond precision, regardless of the input.
Note that that doesn't always properly reflect the resolution of the input.
That effect has to be taken into account by the logic implementor.


## Operations

### Data access (`var`)

The data context can be accessed through an operation of the following form:

    { "var": "<path>" }

The `<path>` is a string containing a path that “drills down into” the current data context.
A path is composed of “path fragments” that are separated by periods (`.`).

In terms of most mainstream programming languages: if `it` is a variable/slot holding the current data context, then `{ "var": "<path>" }` means `it.<path>`.
Data access of a `null` or non-existing value evaluates to `null`.
In particular, accessing a non-existent property on an object evaluates to `null`.

An integer path fragment signifies array indexing.
Array indices are 0-based, and accessing a non-existing index evaluates to `null`.

The empty path `""` serves as a shorthand for accessing the entire data context - alternatively, you can read it as `it` (or `this`).
The variant `{ "var": <integer index> }` is superfluous as `{ "var": "<integer index>" }` achieves the same result.
The variant which provides a default value instead of a missing/`null` result is (currently) not allowed.

As noted before: the `var` data access operation is the only type of expression that can have a non-array argument specification.


### If-then-else (`if`)

Conditional logic can be implemented through an operation of the following form:

    {
        "if": [
            <guard>,
            <then>,
            <else>
        ]
    }

If the `<guard>` evaluates to a truthy value, then the `<then>` expression is evaluated (and not before), otherwise the `<else>` expression is evaluated (and not before).


### Operations with infix operators

(An infix operator is a binary operator which is notated between its operands.)
The following infix operators known from JavaScript are available: `===`, `and`, `>`, `<`, `>=`, `<=`, `in`, `+`.
A few custom operations have been added specifically for date-time-handling: `after`, `before`, `not-after`, `not-before`.

An operation with an infix operator has the following form (which is decidedly non-infix):

    {
        "<operator>": [
            <operand 1>,
            <operand 2>,
            ...,
            <operand n>
        ]
    }

For the `===`, `in`, and `+` operators, `n` must equal 2.

The `===` operator checks equality without type coercion.
This works reliable on strings and integers, but not on other types.
_Note:_ this might still be restricted further to only allow strings and integers.

The `in` operator checks whether `<operand 1>` is a member of `<operand 2>`, which must be an array - possibly empty.
(This must be checked beforehand through other means: operating on a non-array `<operand 2>` is considered an error.)
Note that `<operand 1>` doesn't need to be a string, and nor does `<operand 2>` need to be an array of strings.
The types of `<operand 1>` and the it

The `and` operator can be used _variadically_: it can have any number of operands greater than 1.
All operands must evaluate to either a truthy or falsy value - no “in between” values that are neither are allowed, and an error is thrown when that happens.
An operation with the `and` operator returns the first of its operand that evaluates to a falsy value, or the evaluation of the last value.
Operands are evaluated lazily (so until one evaluates to a falsy value, or an error occurs because of the evaluation of one), and in order.

The comparison operators `>`, `<`, `>=`, `<=`, `after`, `before`, `not-after`, `not-before` (but not equality `===`) can be used in (the customary) infix form (`n` = 2), or in the ternary form (`n` = 3).
The ternary form

    {
        "<op>": [
            <operand 1>,
            <operand 2>,
            <operand 3>
        ]
    }

has the following semantics: `(<operand 1> <op> <operand 2>) and (<operand 2> <op> <operand 3>)`.
It's an error if not all operands are of integer type.

The `after`, `before`, `not-after`, and `not-before` operators are the date-time-specific equivalents of the `>`, `<`, `<=`, and `>=` (respectively) operators for integers, including the ternary form.
All operands of an `after`, `before`, `not-after`, or `not-before` operator must be date-times.


### Negation (`!`)

The negation operation takes one operand, and returns `true` if that operand's falsy, and `false` if it's truthy.
It's an error if any operand is neither falsy, nor truthy.


### Offset date-time (`plusTime`)

A date-time offset operation has the following form:

    {
        "plusTime": [
            <operand that evaluates to a string with a date-time in the allowed format>,
            <integer: the number of days/hours to add (may be negative)>,
            <string with a time unit>
        ]
    }

A time unit is one of the following string values: "year", "month", "day", "hour".
To convert a date(-time) string to a date-time value as-is, specify an amount of `0`, and any time unit.
Example:

    { "plusTime": [ <date(-time) string-typed operand>, 0, "day" ] }

(`"day"` can also be `"hour"`, `"month"`, or `"year"`.)

The following date and date-time formats are allowed:

    YYYY
    YYYY-MM
    YYYY-MM-DD
    YYYY-MM-DDThh:mm:ss
    YYYY-MM-DDThh:mm:ssZ
    YYYY-MM-DDThh:mm:ss[+-]h
    YYYY-MM-DDThh:mm:ss[+-]hh
    YYYY-MM-DDThh:mm:ss[+-]hmm
    YYYY-MM-DDThh:mm:ss[+-]hhmm
    YYYY-MM-DDThh:mm:ss[+-]h:mm
    YYYY-MM-DDThh:mm:ss[+-]hh:mm
    YYYY-MM-DDThh:mm:ss.S
    YYYY-MM-DDThh:mm:ss.SZ
    YYYY-MM-DDThh:mm:ss.S[+-]h
    YYYY-MM-DDThh:mm:ss.S[+-]hh
    YYYY-MM-DDThh:mm:ss.S[+-]hmm
    YYYY-MM-DDThh:mm:ss.S[+-]hhmm
    YYYY-MM-DDThh:mm:ss.S[+-]h:mm
    YYYY-MM-DDThh:mm:ss.S[+-]hh:mm

The following items describe this conversion for the `plustime` operation in more detail:

* A *partial date* (`YYYY` or `YYYY-MM`) is parsed as it would be by the `dccDateOfBirth` operation - see below.
  The parsing behaviours of `plusTime` and `dccDateBirth` coincide on dates in the format `YYYY-MM-DD`.
* A missing time part (so for dates) is assumed to be `00:00:00.000`.
* When a timezone offset is missing, the offset `Z` is assumed (including in the previous case).
* The last eight formats specify sub-second time info, with any number of decimals being accepted.
  Any date(-time) is always normalised to milliseconds, with 3 places behind the decimal dot.
  All decimals beyond the 3rd one are ignored, effectively rounding _down_ to the nearest millisecond.
* Offsetting a date-time isn't affected by daylight saving time (DST transitions), nor by leap days or leap seconds.

Note that `plusTime` does not permit anything other than a string in one of the formats above such as date-time values: expressions such as `plusTime(plusTime("...", 0, "hour")`, 10, "day") are not valid.


#### Leap days

Note the following behaviour:

| date | amount | time unit | result     |
|-----|--------|------------|------------|
| 2020-02-29 | 1 | day        | 2020-03-01 |
| 2020-02-29 | 1 | month      | 2020-03-29 |
| 2020-02-29 | 1 | year       | 2021-03-01 |

The precise offsetting behaviour of `plusTime` is determined by the following JavaScript methods on the `Date` class:

| time unit | JS methods | postfix |
|-----------|------------|---------|
| year      | `setUTCFullYear`, `getUTCFullYear` | `FullYear`
| month     | `setUTCMonth`, `getUTCMonth` | `Month`
| day       | `setUTCDate`, `getUTCDate` | `Date`
| hour      | `setUTCHours`, `getUTCHours` | `Hours`

These methods are then used as follows:

```javascript
dateTime.setUTC<postfix>(dateTime.getUTC<postfix> + amount)
```

where `dateTime` is the given date-time string converted to a `Date` object, `amount` is the given integer amount, and `<postfix>` can be read off from the table above.

See [the (most recent) ECMA specification of the `Date` class](https://tc39.es/ecma262/#sec-date-objects) for more details.


### DCC Date of birth (`dccDateOfBirth`)

A DCC represents the date of birth of the DCC's holder in the `dob` field as a string in one of the following formats:

    YYYY
    YYYY-MM
    YYYY-MM-DD

The `dccDateOfBirth` operation performs a conversion of a string value in any of these formats to a date-time, as follows:

* `YYYY` is converted to `YYYY-12-31T00:00:00.000Z`.
* `YYYY-MM` is converted to `YYYY-MM-DDT00:00:00.000Z`, with `DD` = last day of the month `YYYY-MM`.
* `YYYY-MM-DD` is converted to `YYYY-MM-DDT00:00:00.000Z` the same way that `{ "plusTime": [ "<YYYY-MM-DD>", 0, "<any time unit>" ] }` does.

As a mnemonic: `dccDateOfBirth` returns the last date consistent with the provided data.

The primary use case for this operation is to check whether the DCC's holder is a minor, i.e. less than 18 years old.
This can be achieved as follows:

    {
        "after": [
            { "dccDateOfBirth": [ { "var": "payload.dob" } ] },
            { "plusTime": [ { "var": "external.validationClock" }, -18, "year" ] }
        ]
    }

This CertLogic expression yields `true` if the DCC's holder is deemed to be a minor, and `false` otherwise.


### Reduction (`reduce`)

A reduction operation has the following form:

    {
        "reduce": [
            <operand>,
            <lambda>,
            <initial>
        ]
    }

The `<operand>` must be an array - possibly non-empty.
This must be checked beforehand by other means.
Often, the expression `{ "var": "<operand>.0" }` can be used to check that `<operand>` is a non-empty array.

The `reduce` operation is equivalent to a left-fold over the array `<operand>` with `<initial>` prepended, using the provided `<lambda>` function.
That function is provided with a modified data context of the form `{ "current": <current>, "accumulator": <accumulator> }`, with the `<current>` equalling the items of the array (in that order), and `<accumulator>` equalling the result of the left-fold so far.
In particular, the `reduce` of an empty-array `<operand>` evaluates to `<initial>`.
This is essentially equivalent to JavaScript's `Array.reduce` function.

All other special array operations can be implemented using (only) a `reduce` operation with a suitable `<lambda>`.

To be able to access values in the original data context, CertLogic *may* expand beyond JsonLogic at some point by also adding a key-value pair with key `"data"` to the data object passed to the `<lambda>`, whose value is the original data context.


### Extract data from an UCI (`extractFromUVCI`)

A DCC can contain UCIs - see [Annex 2 of this document](https://ec.europa.eu/health/sites/default/files/ehealth/docs/vaccination-proof_interoperability-guidelines_en.pdf).

*Note* that since the publication of that document the term “Unique Vaccination Certificate Identifier” and its abbreviation “UVCI” have been deprecated in favour of “Unique Certificate Identifier” (UCI).
For backward compatibility, code and data may still use “UVCI”.
In particular, the optional prefix of a UCI's prefix is still `URN:UVCI:`.

Use cases exist which make it necessary to make decisions based on information contained in a UCI.
For more background information on the UCI format, and design decisions around this operation: see [here](../../documentation/design-choices.md#operation-extract-from-UVCI).

An UCI-extraction operation has the following form:

    {
        "extractFromUVCI": [
            <operand>,
            <index>
        ]
    }

The `<operand>` must be a string value, or `null`: anything else is an error.
The `<index>` must be an integer.
If the operand is `null`, `null` will be returned.

The `extractFromUVCI` operation tries to interpret the given operand (now assumed to be not `null`, and a string) as a UCI string according to Annex 2 of [this document](https://ec.europa.eu/health/sites/default/files/ehealth/docs/vaccination-proof_interoperability-guidelines_en.pdf).
It's *not* checked for compliance with this specification: see the [design decisions](../../documentation/design-choices.md#operation-extract-from-UVCI) for an explanation why that is.

The string is split on separator characters (`/`, `#`, `:`) into string fragments.
The operation returns the string fragment with the given `<index>` (0-based), or `null` if no fragment with that index exists.
The `URN:UVCI:` prefix is optional, and initial fragments `[ "URN", "UVCI" ]` will be ignored.
The string `"a::c/#/f"` contains 6 fragments: `"a"`, `""`, `"c"`, `""`, `""`, `"f"`.


## Other aspects


### Evolution of this specification

This specification can evolve over time, based on necessary clarifications, or required additional functionality.
In any case, at least the behaviour of the “allowed”-part of the specification should be covered by the test suite - see directly below.


### Test suite

A comprehensive test suite for checking evaluator functions is contained in the [`testSuite` directory](./testSuite), as a collection of JSON files.
These files conform to a [JSON Schema](./schemas/CertLogic-testSuite.json).
The evaluator test suite is validated and executed by the following automated tests in this repository:
* [a Mocha test](../certlogic-js/src/test/run-testSuite.ts) for JavaScript
* [`EvaluatorTests` JUnit/Kotlin ](../certlogic-kotlin/src/test/kotlin/eu/ehn/dcc/certlogic/evaluatorTests.kt) for Kotlin
* [a Dart unit test](../certlogic-dart/test/test_suite_test.dart)

A test suite for checking validation functions is contained in the [`validation-testSuite` directory](./testSuite), as a collection of JSON files.
These files conform to a [JSON Schema](./schemas/CertLogic-validation-testSuite.json).
The validation test suite is executed by the following automated tests in this repository:
* [a Mocha test](../certlogic-js/src/test/run-validation-testSuite.ts) for JavaScript
* [`ValidatorTests` JUnit/Kotlin ](../certlogic-kotlin/src/test/kotlin/eu/ehn/dcc/certlogic/validatorTests.kt) for Kotlin
* (the Dart implementation doesn't cater for separate validation, outside of evaluation)

Both collections of JSON files can be checked against their JSON Schemas by running the [`check-jsons.sh` script](./check-jsons.sh), which requires Node with NPM.


### Schemas

Two JSON Schemas are provided as part of this specification:

* A [schema for CertLogic expressions](./schemas/CertLogic-expression.json).
    Note that this schema can't fully determine whether a given JSON conforms to the specification above.
    Use the provided validator for that - see below.
* A [schema for files](./schemas/CertLogic-testSuite.json) that are part of the [test suite](./testSuite/).


### Validator

A validator is provided in the form of the [`certlogic-js/validation` NPM sub package](../certlogic-js/README.md).


### Differences with JsonLogic implementations

CertLogic is a subset of JsonLogic, but with custom operations that are specific to the domain of DCC added - currently: `plusTime`, `extractFromUVCI`, and `dccDateOfBirth`.
Implementors of the DCC validator using a JsonLogic implementation instead of a CertLogic implementation need to provide these custom operations to JsonLogic as well - see the [first paragraph of this document](../../documentation/implementations.md).

