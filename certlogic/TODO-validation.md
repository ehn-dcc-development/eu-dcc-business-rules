# TODOs w.r.t. validation

* [&#10003;] Add validation of JSON Schemas.
* [&#10003;] Add validation of test suite JSON files.
  * [&#10003;] Add new operations to JSON Schema.
* [&#10003;] Design and introduce a JSON format to define test cases for validation.
  (Inspiration: ../certlogic-js/src/test/validation/test-format-validator.ts)
  * [&hellip;] Implement runners for that format (TS/JS, Kotlin/Java, Dart(, Swift)).
    Note: Dart impl. doesn't have a validator at all.
* [&#10003;] Migrate existing test cases in TS to that format.
  * [ ] Consider assuming that the message (of every issue) is always about the whole expression.
  * [ ] Consider widening the format to have two layers like the semantics' test suite.
    * [ ] Consider a structure that's “arbitrarily“ nested.
* [ ] Add additional test cases.
  * [ ] Consider using fuzzing to come up with cases.
* [ ] Consider renaming the “normal” test suite to “semantic test suite”. 
* [ ] Update documentation.

