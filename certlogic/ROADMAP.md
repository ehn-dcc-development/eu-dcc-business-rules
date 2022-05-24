# Roadmap

Because the EU DCC project is winding down at the time of writing (2022-05-17), it doesn't make sense to make large changes to CertLogic.
That doesn't mean, however, that no opportunities exist to improve CertLogic.
I'm writing down this roadmap as a record of insights we gained the past year, but weren't able to execute on due to time or other constraints.

Pertains to:
* Specification version 1.3.2
* JS implementation version 1.2.2
* Kotlin implementation version 0.11.2


## Core aspects

By “core” I mean: “directly related to the evaluator function” which is the only functionality directly used/run by/inside verifier apps.

### Strictly separate format-validation from execution

Currently, both the evaluator and format-validator perform validation.
That has the following disadvantages:
* The evaluator and format-validator functions have quite some duplicated code.
* The evaluator function takes a slight performance hit.

Strictly separating format-validation from execution requires the following actions:
* Remove all format-validation code from the evaluator function.
  (Runtime type checking of evaluated sub operands remains.)
* Use the format-validator function as a type guard.

Doing so has the following advantages:
* No (or much less) duplicated code.
  That also means that it becomes easier to make any of the changes to CertLogic proposed below.
* The evaluator function is slightly faster.

(This was [issue #103](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/103).)


### Implement tree mappers

Most API functions on CertLogic expressions are *tree (flat) maps*: they follow the tree structure of the CertLogic expression, and do something per node of the tree, but usually only after mapping children of that node in the same way.
This pattern is also called a *depth-first tree traversal*, a **DFTT**.
In particular, evaluation is a DFTT, as well as functions such as determining data accesses.
(Format-validation is a DFTT, but not on the CertLogic expression type, since we don't know yet if it's valid.)

It'd be good to implement a mapper type, and higher-order function to transform instances of that mapper type to tree (flat) map functions.
The interface could look something like this in TypeScript:

```typescript
type CLExpr = CertLogicExpression       // (short alias)
export interface CertLogicMapper<RT> {  // RT ~ Return Type
    literal(value: CertLogicLiteral): RT
    array(values: CLExpr[]): RT
    dataAccess(path: string): RT
    ifThenElse(guard: CLExpr, then: CLExpr, else_: CLExpr): RT
    eq(left: CLExpr, right: CLExpr): RT
    in(left: CLExpr, right: CLExpr): RT
    plus(left: CLExpr, right: CLExpr): RT
    and(operands: CLExpr[]): RT
    numberCompare(operator: ">" | "<" | ">=" | "<=", operands: CLExpr[]): RT
    dateCompare(operator: "after" | "before" | "not-after" | "not-before", operands: CLExpr[]): RT
    not(operand: CLExpr): RT
    plusTime(dateTimeString: CLExpr, amount: number, unit: TimeUnit): RT
    reduce(operand: CLExpr, lambda: CLExpr, initial: CLExpr): RT
    extractFromUVCI(uvciString: CLExpr, index: number): RT
    dccDateOfBirth(dateString: String): RT
}
```

Various higher-order functions could be implemented, such as:
* tree map
* tree flat map
* tree walk
* Any of the above but with lazy evaluation of operands.

The advantage of this is that it becomes easier, and more convenient to write DFTTs, using less and simultaneously more type-safe code.

(This approach “sneakily“ points to the concept of an *object algebra*.
 There's probably also some opportunity to phrase things in terms of [hylomorphisms](https://en.wikipedia.org/wiki/Hylomorphism_(computer_science)) and related concepts as well, to help even more with the recursive nature.)


### Meta generation for operations

The CertLogic specification is written up in English, in a precise but still informal way.
It's practically possible to formalise certain aspects of the specification.
One opportunity is to type-specify all operations other than `var`.
Such an operation specification specifies what operands that operation can have in terms of number, type, optionality.

These operation specifications should be precise enough to generate the following:
1. The operations part of the JSON Schema.
2. The `CertLogicOperation` type (at least in TypeScript).
  (For later waypoints on the roadmap, it's useful to be able to parametrise this generation with the name of the base type - currently `CertLogicExpression`.)
3. The `CertLogicMapper` type.
4. Potentially: format-validation for operations.

The advantage of implementing meta generation is that it becomes easier to expand/extend CertLogic.


### Miscellaneous changes to CertLogic

The following miscellaneous improvements could be made as well:

1. Introduce an alias `extractUCI` for `extractUVCI`, because the UVCI has officially been relabeled as UCI.
  (This has already been done for the Dart implementation.)
  This is not so useful, because that operation doesn't seem to be used at all.
  (This was [issue #89](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/89).)
2. Make the amount operand of the `plusTime` operation an evaluated operand.
  This makes it possible to transform expressions like `if (<condition>) then plusTime(<expr>, 10, "day") else plusTime(<expr>, 20, "day")` (in compact notation) into the shorter `plusTime(<expr>, if (<condition>) then 10 else 20, "day")`.
3. Make the `in` operator work with a map as the second, right-hand-side operand.
  In this situation, the operation checks whether the left-hand-side operand is a key of a key-value-pair in the map.
  This is useful if e.g. value sets are passed in “uncompressed” form.
   (This was [issue #28](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/28).)

In both cases, this could be achieved through a *desugaring* transformation.
This keeps CertLogic small, targeted, and devoid of unnecessary complexity.
(In hindsight, the same could be said for the trinary comparison operations.)


### Test runtime type checking

Currently, only “happy paths” are tested: CertLogic expressions that are valid, evaluate to a value, and don't throw an error.
Automated tests should be implemented that explicitly test situations where an error (due to a runtime type mismatch) is thrown.
This ensures that changes of the evaluator function don't break anything, and match the specification.
(This was [issue #104](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/104).)


### TODOs w.r.t. testing of format-validation

(The following TODOs were [issue #121](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/121).)

* (must-have:) Implement runners of validation test suite for Dart and Swift.
  Note: the Dart implementation currently doesn't have a validator at all.
* Consider renaming the “normal” test suite to “semantic test suite”.
* W.r.t. the validation test suite format:
    * Consider assuming that the message (of every issue) is always about the whole expression.
    * Consider widening the format to have two layers like the semantics' test suite.
        * Consider a structure that's “arbitrarily“ nested.
* Add additional test cases.
    * Consider using fuzzing to come up with cases.


## Utility aspects

### Strictly separate core from utility functionality

Core functionality should be separated lifecycle-wise from utility functionality.
The former should be (as a deployable package) small and as stable as possible, while the latter could evolve much more quickly and fluidly.
Note that the type definitions should reside next to the evaluator.
Format-validation - being the corresponding type guard - could exist outside of core packages, because validation of CertLogic expressions would typically not happen by verifier apps.
Instead, expressions should be validated before: during development/staging/pre-production, and latest during uploading to the EU DCC Gateway.

To facilitate that separation, util packages (one per implementation target) should be created.
“Package” here means: NPM package, Kotlin module, Dart package, tec.

Other existing functionality, such as that in the `misc` sub package of `certlogic-js`, is also not core to CertLogic, and should go in util packages as well.
Other waypoints on the roadmap mentioned below should also go into these packages.
Such relocations constitute breaking interface changes, so major version numbers should then be incremented as well.

(This was [issue #90](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/90), and obliquely fixes [issue #55](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/55) as well.)


### Implement partial evaluation

It's useful to be able to evaluate CertLogic expressions partially against input data in which some parts have been explicitly marked as **unknown** (which is different from `undefined`/`null`).
Partial evaluation has already been implemented to analyse business rules pertaining to vaccination in an efficient manner: see [this repository](https://github.com/ehn-dcc-development/eu-dcc-business-rules-analysis) - and specifically [this part of that](https://github.com/ehn-dcc-development/eu-dcc-business-rules-analysis/tree/main/src/reducer).
This implementation should be made more generally available, through the following steps:

1. Move it to the util packages.
2. (Clean it up where necessary.)
3. Finish its documentation.
4. Make use of the parametrised meta generation described above to have type-safe code, with an extended base type for CertLogic expressions that makes partial evaluation an endomorphism.

After these steps, partial evaluation could be improved, e.g. by parametrising the **unknown** value with predicates such as `dob before 2004` or `dn > sd`.
This reduces the need to:
* replace certain sub expressions with constant values - e.g., regarding detection/exemption of minors;
* run the partial evaluation with many variations of the input data - e.g. with many combination of values for the `dn`/`sd` fields.

It's not entirely unthinkable that partial evaluation wouldn't end up being used in verifier apps, so it could go (eventually) in the core packages.


### Implement a compiler

For performance reasons, it might be advantageous to be able to compile CertLogic expressions into something that's able to execute a lot faster than dynamic interpretation.
(This was [issue #97](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/97).)

A compiler/transpiler targeting TypeScript has already been implemented experimentally, showing a performance improvement on the order of 10 times.
This is achieved by compiling an expression from its JSON form into a tree of objects which can be effectively JIT-ed by the executing VM.
This work can be found [in the `certlogic-utils-js` package](./certlogic-utils-js/src/compiler).


### Implement a type system

Currently, format-valid CertLogic expressions could run into runtime type mismatches.
When the input data is strictly governed by a JSON Schema, there's no reason that CertLogic expressions can't be statically analysed beforehand to check whether such mismatches could occur at all.
To that end, a type system could be implemented.
Some experimental work has been done on that already.
The type system should be able to compute effective runtime types for CertLogic expressions given a JSON Schema for the input data.
In a sense, this is quite similar to partial evaluation.
(This was [issue #94](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/94).)


## Implement a tracing evaluator

Implement a variant of the regular evaluator function that traces its execution.
We can use that tracing information, and present it for “static debugging” e.g. in [CertLogic Fiddle](https://certlogic-fiddle.vercel.app/).
(This was [issue #41](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/41).)


## Implement an own Swift implementation

Currently, [the Swift implementation of CertLogic](https://github.com/eu-digital-green-certificates/json-logic-swift) is a fork of [this repository](https://github.com/advantagefse/json-logic-swift).
The disadvantages of that setup are:
* The fork will probably not be actively maintained (by TSi) anymore in the near future.
  In particular: propagating a change to CertLogic to the Swift implementation is likely going to be much more cumbersome, and time-consuming, and therefore potentially obstructing.
  (We already saw this with the introduction of the `dccDateOfBirth` operation: it took TSi a long time to properly release updated versions of the Swift implementation, and the Android and iOS wrapper libraries.)
* It's an implementation of JsonLogic, which encompasses much more functionality than just CertLogic.
  That makes it possible for developers using the Swift implementation to develop and test rules with expressions that are not strictly CertLogic.

It's desirable to produce an own Swift implementation of CertLogic, independent of any existing JsonLogic implementation.
That means that one of the most popular platforms for verifier apps (iOS) can be catered for completely in parallel with JS and Android, independent of TSi.
Ideally, the iOS wrapper library should be migrated to use the independent Swift implementation as well.


## Usability: implement an editor

CertLogic expressions tend to be quite unwieldy in their JSON format.
The `asCompactText` function, and `certlogic-html` package provide a compact notation, but without edit functionality.
That notation simply puts parentheses around every sub expression to not have to introduce the notation of operator precedence/priority, making the expression less readable than possible.

The notation could be improved by laying out an expression visually so that larger expressions remain readable, and the use of “virtual” parentheses is minimised.
Then, an editor should be implemented for that notation.
Ideally, this would be an editor that's easy to integrate in Web apps, for maximum portability.


## Infrastructure

* Publish Kotlin module to Maven Central - this was [issue #79](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/79).
* (how-to:) Publish [the Dart package](https://pub.dev/packages/certlogic_dart).

