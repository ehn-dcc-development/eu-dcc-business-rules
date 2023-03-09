# ROADMAP for _partial evaluation_

This is an addition to the [overall CertLogic roadmap](../ROADMAP.md), specific to this `certlogic-util-js` package, and even more specifically the partial evaluation part of it.

The following roadmap items are (roughly) in order of importance.
Items 1 through to 4 “shore up” current capabilities, while items 5 and 6 extend those.

1. Run against the test suite, to ensure that the implementation is on par with the original evaluator(s).
(This item might require doing items 2 and 3 first as well.)

2. Represent a runtime failure explicitly, including the expression that it was evaluated from.
This corresponds to occurrences of `throw new Error(...)` in the code of either the original or partial evaluator, and typically is due to type problems/incompatibilities.
The advantage of this is that sub expressions can be partial-evaluated eagerly.
A failure of e.g. the `else`-operand of an `if`-expression can be disregarded without problem if the `guard`-operand evaluates to a truthy value.

3. Wrap a JS `Date` object explicitly, including the expression that it was evaluated from.

4. Consider introducing an explicit _object algebra_ - see below.

5. Parametrise the **unknown** value with predicates such as `dob before 2004` or `dn > sd`.
   This reduces the need to:
   * Replace certain sub expressions with constant values - e.g., regarding detection/exemption of minors;
   * Run the partial evaluation with many variations of the input data - e.g. with many combination of values for the `dn`/`sd` fields.
Consider passing these conditions not through “unknown” values directly, but as a set of additional conditions?

6. Consider wrapping every evaluation result explicitly, including the expression that it was evaluated from. This is a “self-tracing” of sorts.

Much of this would benefit from implementing the [overall CertLogic roadmap](../ROADMAP.md) first.


## Object algebras

Types encountered in expression languages like CertLogic typically exhibit both hierarchical and recursive relations.
E.g., an _addition_ is also a _binary operation_ which, turn is an _expression_, (sub typing), and at the same time composes two _expressions_ (the left and right operands).
In TypeScript:

```typescript
type Expr = | number | Add

type BinOp = {
   operator: string
   left: Expression
   right: Expression
}

type Add = BinOp & {
   operator: "+"
}
```

It's often problematic to represent such types using the type system of a statically-typed GPL, for two reasons:

1. To _extend_ the language with another expression type, we would have to extend the `Expr` type, e.g.
```typescript
type ExtExpr = | Expr | Mult

type Mult = BinOp & {
   operator: "*"
}
```
But now we also would have to _modify_ the existing type `BinOp` to have `left` and `right` fields of type `ExtExpr`.

2. Suppose that we defined some function `F: Expr => RT` which performs evaluation or similar semantics.
After extending `Expr` to `ExtExpr` we also have to redefine `F` - let's name the redefinition `extF`.
Because `Expr` is a recursive type, `F` is typically recursive as well.
That means you have to really re-implement `extF` “from the ground up”.
`extF` can't just handle a `Mult` instance separately, and hand off to `F` for everything else, because `F` doesn't know how to deal with `Mult` instances in the `left` or `right` operand of an `Add` instance.

The combination of these two phenomena is often called the _“Expression Problem”_, and essentially means that recursive type hierarchies statically-typed GPLs don't mix very well.
An object algebra is an approach to represent recursive types in a way that solves the Expression Problem.
The “trick” is to have use type parameters to encapsulate the semantics of recursive types.

For the example above this could be made to work as follows in TypeScript:
```typescript
interface Expr<E> {
    num: (n: number) => E
    add: (left: E, right: E) => E
}
```

The function `F` from before would be an implementation of this `Expr<E>` interface, with a concrete type `E` that's usually of the form `(...) => RT`.
Extending `Expr` is then done as follows:

```typescript
interface ExtExpr<E> extends Expr<E> {
    mult: (left: E, right: E) => E
}
```

Extending `F` is then a matter of extending the implementation of `Expr<E>` to extend `ExtExpr<E>`.

Using an object algebra to solve the Expression Problem is nevertheless a trade-off.
Expressions represented using them are captured in “lazily-executed semantics” (e.g. in the form of “thunks” `() => RT` or similar closures) instead of objects (or data) of the GPL.
That also means you can't directly inspect those expressions (and their sub expressions).
This trade-off would be fine for the purposes of (partially) evaluating CertLogic expressions, though.

Some links (not properly attributed - see link targets) on object algebras:

* https://blog.acolyer.org/2015/11/13/scrap-your-boilerplate-with-object-algebras/
* https://oleksandrmanzyuk.wordpress.com/2014/06/18/from-object-algebras-to-finally-tagless-interpreters-2/
* https://www.cs.utexas.edu/~wcook/Drafts/2012/ecoop2012.pdf
* https://homepages.cwi.nl/~storm/; several articles, talks, etc., among which:
  * https://www.infoq.com/presentations/object-algebras/
  * https://github.com/tvdstorm/oalgcomp

