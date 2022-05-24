# TODOs

* Align compiler implementation with work done on partial evaluation, specifically how to detect whether something is constant.
  * The idea of adding types to make evaluation/compilation an endomorphism might be useful.
      That means that sub trees can be compiled first, and when it turns out that the compiled expression is constant, that knowledge can be used further.

* Optimisation opportunity: memoise data accesses.
    At interpretation time, this relies to some extent on lookup in a (hash-)map being efficient.
    When compiling, we can implement a memoising table, which evaluates lazily, and is indexed by integers assigned by the compiler.
    We could even do that across evaluations, as long as `data` is used immutably, so when not using the `"reduce"` operation...

