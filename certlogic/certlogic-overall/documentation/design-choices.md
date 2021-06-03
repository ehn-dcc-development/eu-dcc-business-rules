# CertLogic: design choices

Regarding the relation of CertLogic with JsonLogic, and the DCC validation rules:

* Any DCC validation rule must be expressed according to CertLogic, and **may not** use JsonLogic in a way that's inconsistent with CertLogic, or not provided for by CertLogic.
  In particular, only JsonLogic constructs present in this CertLogic specification may be used.
* Rule implementors may use any of the CertLogic reference implementations, or any of the existing JsonLogic engines, but must ensure that these produce the same results on test suites for both the core evaluation, as for the rules themselves.
* The use of “truthy”/“falsy” values that are not already JSON Booleans is discouraged, and limited.
  In particular, DCC-validation rules should evaluate to a JSON Boolean, not to any “truthy”/“falsy”.
* The semantics of the validation rules may be _expressed_ in CertLogic, but are **not** (strictly) _defined_ by it: all implementations should pass the unit tests assertions defined for the validation rules, and should pass additional tests that ascertain the intent of the validation rule.
* This specification can be expanded when the needs arises, but never shrunken.
* The intention is that CertLogic remains compatible with JsonLogic (with JsonLogic restricted to the constructs allowed from CertLogic), but may _expand_ on JsonLogic when and where necessary.
  If that happens, that would probably require patching of a JsonLogic engine.
* In the interest of testability and risk mitigation, CertLogic is kept as small and simple as possible, without any “programmers' convenience”.
* CertLogic is a standalone specification, intrinsically not coupled to the DCC (or its schema), to be able to test engine implementations in isolation.

