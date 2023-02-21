# Partial evaluation

The idea of [partial evaluation](https://en.wikipedia.org/wiki/Partial_evaluation) is that you _transform_ a “program” (an expression, in the case of CertLogic) knowing some of its input data (the “_partial_ input data”) in advance (“statically”).
This yields a reduced program (again, an expression in our case) which can operate only on input data that matches with the partial input data.
This can serve several purposes, such as optimized execution.
We'll use this technique, as implemented by this sub package, in the [EU DCC Business Rules Analysis repo](https://github.com/ehn-dcc-development/eu-dcc-business-rules-analysis) to analyze a CertLogic expression, and see whether it can be reduced to e.g. a date range comparison.

The main function in this sub package is `evaluatePartially` in [`partial-evaluator.ts`](./partial-evaluator.ts).
Examples of usage can be found in the [unit tests](../test/partial-evaluator/test-partial-evaluator.ts).

Status: &beta; - not suitable for general production use. <br/>
Note: the partial evaluator currently doesn't pass the test suite from the specification yet (!).


## Motivation

CertLogic's `evaluate` function takes a CertLogic expression and input data, evaluates that expression against that data, and either returns the result, or throws an exception in case the CertLogic expression given is not valid, or a runtime type error occurs during its evaluation.
In other words: this function performs a _complete interpretation_ of the CertLogic expression.
This is usually what we need, e.g. to evaluate the logic part of a business rule.
This complete interpretation is possible because the input data is given completely.
In other words: every data access, or (instance of the) `var` operation evaluates to a value, and that value can be used as an operand of an expression that nested that `var` operation.

What could we do if we only knew part of the input data?
I can think of two use cases where that could happen:

1. Some values in the input we know, but other values are not.
    That doesn't mean that these values are `undefined`, because `undefined` indicates a value is *missing* entirely.
2. We want to reason about the result of evaluating an expression against a whole class of input data.
    That's equivalent to evaluating that expression with some values of the input data kept unknown.

    A specific example is finding under which condition a specific vaccine is valid in the sense of business rules accepting a DCC for a vaccination with that vaccine.
    Ideally, such a condition boils down to a specific validity range such as from 14 days until 270 days relative to the date of vaccination.
    By being able to evaluate the logic parts of the business rules involved with this validity, we could reduce that logic to a CertLogic expression that's relatively simple to recognise as a condition for a validity range.

This documentation develops the idea of _partial evaluation_: evaluating a CertLogic expression against data which may be partial.
(This is sometimes also referred to as _abstract interpretation_.)
Take the following example expression:

```json
{
  "if": [
    {
      "var": "dob"
    },
    {
      "not-before": [
        {
          "plusTime": [
            {
              "var": "dob"
            },
            0,
            "day"
          ]
        },
        {
          "plusTime": [
            "2000-01-01",
            0,
            "day"
          ]
        }
      ]
    },
    false
  ]
}
```

The intention of this expression is to try and determine whether a person is from Generation Alpha or not, given some personal data.
It returns `true` when that's the case, and `false` either when not, or when it couldn't be determined.
The outer `if` operation ensures that the `not-before` operation is not evaluated if the date-of-birth is not given.
That evaluation would fail with a runtime type error if the value of the `dob` field in the input were not a string containing a date(-time).

Evaluating this expression against the empty object `{}` always produces `false` as result.
Let's say we have a way of indicating that the value of `dob` is present (so: not equal to `undefined`), but otherwise “unknown”:

```typescript
{
    "dob": Unknown
}
```

(We can't use `unknown` to identify the “unknown” value: that would clash with TypeScript's `unknown` _type_.) 
What can we say about the example CertLogic expression above?
If we assume that `Unknown` represents a truthy value, then every occurrence of `{ "var": "dob" }` would evaluate to something truthy.
As a consequence, we'd know that the example CertLogic expression would evaluate to the same result as the following expression, given the same, complete input data:

```json
{
  "not-before": [
    {
      "plusTime": [
        {
          "var": "dob"
        },
        0,
        "day"
      ]
    },
    {
      "plusTime": [
        "2000-01-01",
        0,
        "day"
      ]
    }
  ]
}
```

This expression can be written more succinctly in compact notation as: `/dob >= 2000-01-01"`.
This may not seem like a big improvement.
However, more complicated expressions -especially when they access the same value in the input data multiple times- can reduce more drastically.
Such a reduction is often relatively easy to rewrite as a simple condition.


## Extending CertLogic expression types

Both the CertLogic expression and input data are plain JSON, although the expression is strictly typed through the following type definition, as well as additional validations:

```typescript
export type CertLogicExpression =
    | CertLogicExpression[]
    | CertLogicOperation
    // literals:
    | boolean
    | number    // ...which should be an integer...
    | string
```

What can we say about the type of the result of the evaluation?
To answer that question, we have to look a bit closer at the various types of CertLogic expressions - and especially the operations.
From now on, we're going to assume that the evaluation doesn't throw any exception, meaning that the given expression is valid and type-safe over its entire range of input data.

Let's start with the literals: a CertLogic expression that's a boolean, an integer, or a string evaluates to itself.
An expression that's an array of items evaluates to the array of evaluations of those items.

The data access or `var` operation is the only operation that allows us to access values in the input data, and so is the most interesting.
That means that the result of the evaluation of a `var` operation can be any JSON value: `undefined`, `null`, a boolean, a number, a string, an array, or an object.
(The only way that a `var` operation can return `undefined` is when the path equals `""` and the data argument is `undefined`.)

There are three problems with this freedom in output:

1. The result can be a JSON value that _is_ a valid CertLogic operation.
   That would mean that part of input data effectively gets executed!
   This is similar to remote code execution, and means that the meaning of the expression is subverted by the input data if happens to be evaluated against.
2. The result can be a JSON value that's not a valid CertLogic expression, such as `null` or an object.
3. The result can be an array that's used as operand for a `reduce` operation.

We'll solve this problem by suitably _wrapping_ the result of a `var` operation, if it happens to be an object, or another value that is not a valid CertLogic expression.
Effectively, we extend the notion of a CertLogic expression a little bit.
We can now change the CertLogic `evaluate` function so that its first _<expr>_ argument has that extended type.
With that modification, that function becomes an [endomorphism](https://en.wikipedia.org/wiki/Endomorphism).
(We also say that that function is “endomorphic”.)

Let's call this new type `CLExtExpr` where the prefix “CL” is shorthand for “CertLogic”.
Let's call the modified version of the `evaluate` function `evaluatePartially`.

The tricky bit is that the `CertLogicExpression` type is _recursive_: nested parts of that type's definition reference the type itself.
We can already see that from the first line in the type definition above: `CertLogicExpression[]`.
(Such a type definition defines a _sum type_: any instance of any of its _summands_ is an instance of the sum type.)
We also see that in the definition of e.g. the `reduce` operation:

```typescript
export type CertLogicOperation =
    // ...
    | { "reduce": [ CertLogicExpression, CertLogicExpression, CertLogicExpression ] }
    // ...
```

The type `CertLogicOperation` is a summand of the `CertLogicExpression`.
So, the summand of `CertLogicOperation` that corresponds to the `reduce` operation is a _“sub-summand”_ of `CertLogicExpression`.
But that sub-summand also references `CertLogicExpression`, which means that `CertLogicExpression` is a recursive type.

The `evaluatePartially` operation in `CLExtExpr` should have operands of type `CLExtExpr` as well.
This means that the part of type definition for the `reduce` operation should be changed to look as follows:

```typescript
    // ...
    | { "reduce": [ CLExtExpr, CLExtExpr, CLExtExpr ] }
    // ...
```

**TODO**  continue (?)


## Implementation details

TypeScript doesn't allow us to write down a type definition for `CertLogicExpression` that we could reuse in `CLExtExpr`, precisely because that type is inherently recursive.
Instead, we implement `CLExtExpr` as a completely new recursive type.
As a nod to convenience, we _generate_ the required [operation types](./operations_gen.ts) from [a specification](./meta/certlogic-operation-specs.json) by [a code generator](./meta/operations-generator.ts) which is run before compilation.
This reduces the amount of manual, error-prone implementation labor somewhat.
The specification has an undocumented ad-hoc format - please inspect the contents of the [`meta/`](./meta) directory for an idea of how this works.

This specification should be moved to the CertLogic specification (with a proper documentation of its format), so that its implementations can generate type definitions from that specification.
Provided these generators are properly parametrized (e.g. in the name of the top-level type, such as `CertLogicExpression` or `CLExtExpr`), they could also be used to generate the extended types here.

At the moment, I find it undesirable to change either the CertLogic specification or its TypeScript implementation.
Either change would necessitate getting reviewed and accepted at a time that this stuff has become much less relevant than before - even if changes only happens at the “meta-level” without either changing the language specification, or any of the TypeScript code that would run in Production.
That's why I integrated this generation step in this package instead, for now.
Later on, the specification could be migrated to the CertLogic specification, and the generator to (a generative stage of) its TypeScript implementation.

There _are_ ways to define types in TypeScript (and other statically-typed languages) for CertLogic in a way that make these types extensible (without resorting to a generative stage), using so-called _object algebras_.
That would mean extending CertLogic with the necessary expression types to make the extended language endomorphic becomes much simpler(/easier/less work).
Using object algebras would amount to a complete rewrite of its TypeScript implementation, which I will not undertake for the same reason as stated above.
Instead, that rewrite should come in a new major version of the CertLogic TypeScript implementation.

