# CertLogic: design choices

The following requirements are in scope for the business rules:

1. They must be executable on a number of platforms/programming languages.
2. The verifier apps must be updatable with new (versions of) business rules without needing to update the entire app.
3. They must be freely exchangable between participating nations, so that travelers can determine _beforehand_ whether they're going to be deemed fit-for-travel.

A good way to respect these requirements is to express these business rules in a plain JSON format:

1. Their formulation is effectively platform/programming language-aspecific.
2. They can be downloaded to verifier apps “just as data”, decreasing the danger of being seen to violate e.g. Apple's “no code injection”-policies, and of slow app updates.

It was initially proposed to use [JsonLogic](https://jsonlogic.com/) to formulate business rules.
JsonLogic has implementations of its engine for a variety of platforms/programming languages.
However, the following problems were found with (using) JsonLogic:

* The implementations had differing behaviour/semantics.
  In theory, this could be mitigated by patching implementations to align their behaviour/semantics.
* No support for date(-times) was provided out-of-the-box.
  In theory, this could be mitigated by adding custom operations, but unfortunately, not every implementation allows that.
* JsonLogic provides more than is required for the purpose here, which would mean that much testing is required to ensure that behaviour is consistent across implementations.

To mitigate these problems, a subset of JsonLogic, called **CertLogic**, has been specified, and adorned with a test suite, validator tooling, and own implementations for a number of platforms/programming languages.
A set of validation rules (or _rule set_) is then executed, or “run” by a CertLogic engine against JSON data consisting of a DCC payload, and an external parameters object with value sets, validation clock, etc.

For the moment, [this Confluence page](https://webgate.ec.europa.eu/fpfis/wikis/display/eHN/EU+DGC+Validation+Rules) is the authoritative source of information.


## Regarding CertLogic

* CertLogic is a standalone specification, intrinsically not coupled to the DCC (or its schema), to be able to test engine implementations in isolation.

* The use of “truthy”/“falsy” values that are not already JSON Booleans is discouraged, and limited.
  In particular, DCC-validation rules should evaluate to a JSON Boolean, not to any “truthy”/“falsy”.

* This specification can be expanded when the needs arises, but never shrunken.

* The intention is that CertLogic remains compatible with JsonLogic (with JsonLogic restricted to the constructs allowed from CertLogic), but may _expand_ on JsonLogic when and where necessary.
  If that happens, that would probably require patching of a JsonLogic engine.

* In the interest of testability and risk mitigation, CertLogic is kept as small and simple as possible, without any “programmers' convenience”.


## Regarding implementing DCC validation rules with CertLogic

Regarding the relation of CertLogic with JsonLogic, and the DCC validation rules:

* Any DCC validation rule must be expressed according to CertLogic, and **may not** use JsonLogic in a way that's inconsistent with CertLogic, or not provided for by CertLogic.
  In particular, only JsonLogic constructs present in this CertLogic specification may be used.

* Rule implementors may use any of the CertLogic reference implementations, or any of the existing JsonLogic engines, but *must* ensure that these produce the same results on test suites for both the core evaluation, as for the rules themselves.

* The semantics of the validation rules may be _expressed_ in CertLogic, but are **not** (strictly) _defined_ by it: all implementations should pass the unit tests assertions defined for the validation rules, and should pass additional tests that ascertain the intent of the validation rule.

* Rule implementations should not lean on the JSON Schema for the DCC too much.
  In particular, [Postel's law](https://en.wikipedia.org/wiki/Robustness_principle) should be followed.
  While the JSON Schema might imply the existence/presence of a certain value, rule implementations should not blindly assume that.
  Instead, they should check for a value's existence/presence, and produce a sensible result when it's not present.

  Phrased alternatively, every value should in principle have [DICOM Attribute Requirement Type](http://dicomlookup.com/type.asp) 2. 


## Design choices specifics

## Operation: extract from UVCI

An example use case for being able to extract information is the need to invalidate DCCs that have been issued by fraudulent pharmacies which can be identified by a certain part of the UVCI.
The UVCI technical format is clearly defined in Annex 2 in the [UVCI specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/vaccination-proof_interoperability-guidelines_en.pdf).
It has a limited degree of freedom within the format -in particular, the precise format of individual fragments is not pre-defined (outside of the characters allowed).
Also: the `URN:ICVI:` prefix is optional - e.g. UVCIs in DCCs issued by Luxembourg do not have the prefix.

There are several reasons to support extracting information from the UVCI with a specific operation, instead of using a more generic regex-based operation:

1. Regexes live in Pandora's box: they are extremely flexible but are not easy to use well, while it's easy to misuse them, either intentionally, or unintentionally.
2. The CertLogic domain-specific language should be kept small in terms of the ground it can cover, to keep its usage simple, and ensure the language is easy to test.
3. It's more difficult to assess whether a rule implemented using a generic but complex operation is GDPR-compliant than when it uses a simple, functionally-limited/restricted domain-specific operation.

Note that this operation does *not* assume that the given string conforms to the UVCI format.
In particular, it will not check conformance, and will not error on a malformed UVCI.
The rationale for this is a combination of Postel's Law, and the fact that this operation could be used to check for/detect malformed UVCIs.

Point in case: some DCCs have invalid prefixes like `urn:uvci:` (lowercase instead of uppercase-only), and `URN:UCI:` (missing `V`).
To detect such UVCIs, one can use the `extractFromUVCI` operation with indices 0 and 1, because the invalid prefixes will *not* be ignored, but become fragments.

