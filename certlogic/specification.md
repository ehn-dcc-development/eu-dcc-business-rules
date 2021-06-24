# CertLogic: specification

CertLogic is a restricted *subset* of JsonLogic, extended with custom operations - e.g. for working with date-times.

The semantics of CertLogic is that of a function which takes a _CertLogic expression_, a _data context_ (structured data), and returns a value.
All three of these values are JSON values that must be _self-contained_, and _non-referential_.
This means that:

* These JSON values can be finitely serialised, and identically deserialised.
* JSON objects anywhere in any of these values have at most one incoming reference (that of their parent), and no outgoing references, except to children.

CertLogic _logical_ expressions are of the following form, _except_ for data access (`var`) - see below.

    {
        "<operation id>": [
            <first argument>,
            <second argument>,
            // ...
            <last argument>
        ]
    }

The CertLogic evaluator function always evaluates a _valid_ CertLogic expression to some value, never throwing an error.
Operating on a `null` value evaluates to `null` in most, but not all, cases.
However, it might throw on an _invalid_ expression, which is any expression object with an unknown `<operation id>`, or with a known one that doesn't follow the specification.
As a result, the CertLogic evaluator does not exhibit undefined behaviour, but simply errors out.
It's advisable to `try-catch` the evaluation, and return `false` result if that happens when evaluating a validation rule.

A JSON array evaluates to an array with every item evaluated separately.
If a JSON object (not an array) is a literal, being a boolean, an integer, or a string, it evaluates to itself.


## Truthy and falsy

Allowed falsy values are: `false`, `null`, the empty string (`""`), the zero integer (`0`), the empty array (`[]`), and the empty object (`{}`).
Allowed truthy values are: `true`, any non-empty string (meaning: length > 0), any non-zero integer, any non-empty array, and any object with at least one key-value-pair.
Using other values that are “traditionally” falsy or truthy is regarded as undefined behaviour.

The reason to do this is that JsonLogic has a notion of truthy/falsy that differs from the usual JavaScript one, precisely to aid in cross-platform adoption.
CertLogic restricts this notion even further to avoid confusion, or unjust reliance on behaviour that's perceived as “common” but isn't (cross-platform).

Note: `null`, the empty string, the zero integer, the empty array, and the empty object all being falsy (and not truthy) is useful for checking the presence/existence of values in the data context.


## Literals: arrays, booleans, integers, and strings

The usual array, boolean, integer (as a subset of JavaScript's `Number` type), and string literals are allowed.
Literal for the following (types of) values are not allowed: objects, `null`, and date-times.


## Dates and date-times

Dates, and date-times (so: timestamps) can only be constructed by performing a `plusTime` operation, with a certain amount of hours or days added.
Add 0 hours/days to represent the date(-time) as-is.
This makes it possible to ensure consistent date/date-time representations across platforms, without being able to implicitly rely on the behaviour of native date/date-time types in combination with the other (allowed) operations.

The following date and date-time formats are allowed:

	YYYY-MM-DD
	YYYY-MM-DDThh:mm:ssZ
	YYYY-MM-DDThh:mm:ss[+-]hh
	YYYY-MM-DDThh:mm:ss[+-]hhmm
	YYYY-MM-DDThh:mm:ss[+-]hh:mm
	YYYY-MM-DDThh:mm:ss.S+Z
	YYYY-MM-DDThh:mm:ss.S+[+-]hh
	YYYY-MM-DDThh:mm:ss.S+[+-]hhmm
	YYYY-MM-DDThh:mm:ss.S+[+-]hh:mm

The last four formats specify sub-second time info, with any number of decimals being accepted.
Any date(-time) is always normalised to milliseconds, with 3 places behind the decimal dot.
All decimals beyond the 3rd one are ignored, effectively rounding _down_ to the nearest millisecond.

Effectively, any date is always converted to the corresponding ms-precise date-time at midnight of that date.
Note that that doesn't properly reflect the resolution of the input date.
That effect has to be taken into account by the logic implementor.


## Data access (`var`)

The data context can be accessed through an operation of the following form:

    { "var": "<path>" }

The `<path>` is a string containing a path that “drills down into” the current data context.
It must be composed of “path fragments” which are either “Lispy” words (starting with a word character followed by any number of word or number characters, or hyphens), or integers, and which are separated by periods (`.`).
It must match the regular expression `/^((\w[\w\d-]*)|\d+)(\.((\w[\w\d-]*)|\d+))*$/`.

In terms of most mainstream programming languages: if `it` is a variable/slot holding the current data context, then `{ "var": "<path>" }` essentially means `it.<path>`.
Data access of a `null` or non-existing value evaluates to `null`.
In particular, accessing a non-existent property on an object evaluates to `null`.

An integer path fragment signifies array indexing.
Array indices are 0-based, and accessing a non-existing index evaluates to `null`.

The empty path `""` serves as a shorthand for accessing the entire data context - alternatively, you can read it as `it` (or `this`).
The variant `{ "var": <integer index> }` is superfluous as `{ "var": "<integer index>" }` achieves the same result.
The variant which provides a default value instead of a missing/`null` result is (currently) not allowed.

As noted before: the `var` data access operation is the only type of expression that can have a non-array argument specification.


## If-then-else (`if`)

Conditional logic can be implemented through an operation of the following form:

    {
        "if": [
            <guard>,
            <then>,
            <else>
        ]
    }

If the `<guard>` evaluates to a truthy value, then the `<guard>` expression is evaluated, otherwise the `<else>` expression.


## Operations with infix operators

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

The `and` operator can be used _variadically_: it can have any number of operands greater than 1.
All operands must be either truthy or falsy - no “inbetween” values that are neither are allowed.
An operation with the `and` operator returns the first of its operand that evaluates to a falsy value, or the evaluation of the last value.

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


## Negation (`!`)

The negation operation takes one operand, and returns `true` if that operand's falsy, and `false` if it's truthy.
It's an error if any operand is neither falsy, nor truthy.


## Offset date-time (`plusTime`)

A date-time offset operation has the following form:

    {
        "plusTime": [
            <operand that evaluates to a string with a date-time in the allowed format>,
            <integer: the number of days/hours to add (may be negative)>,
            <"day" or "hour">
        ]
    }

This operation is the *only* way to construct date-time values.
Offsetting a date-time isn't affected by daylight saving time (DST transitions), nor by leap seconds.


## Reduction (`reduce`)

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


## Evolution of this specification

This specification can evolve over time, based on necessary clarifications, or required additional functionality.
In any case, at least the behaviour of the “allowed”-part of the specification should be covered by the [test suite](./testSuite).

