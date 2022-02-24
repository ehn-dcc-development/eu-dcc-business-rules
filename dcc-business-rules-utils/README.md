# DCC Business Rules Utilities

Version: 0.4.0

This NPM package contains a number of useful “things” for working with EU DCC business rules conforming to the [EU DCC Validation Rules specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/eu-dcc_validation-rules_en.pdf) (link to PDF).
These things are:

* A TypeScript type for a rule: `Rule`.
* A `normalCopyOf` function to make a copy of a `Rule` object with fields in a normalised key order.
* A `validateRule` function that validates a rule against the JSON Schema, as well as against a number of other constraints (most of which are also checked for by the EU DCC Gateway).
* A `hasRulesForAllEventTypes` function that checks for a set of rules (from one country) whether it covers all DCC *event types* (recovery, test, vaccination).
    That's useful for the following: not having rules for a particular event type is **not** the same as not accepting any DCC of that missing event type.
    In other words: you need to have explicit rules to yield `false` on a DCC having an event type you don't want to accept.
    Note: this function only looks at the rules' stated value of `CertificateType`, regardless of whether that value matches the actual `Logic`.
* A `parseRuleId` function to parse a (valid) rule ID (in field `Identifier` of a `Rule`) into its constituent parts.
    That's useful to perform queries on collections of (versions of) rules.
* A type `ValidationParameters`, and a function `validateDcc` to -you guessed it!- be able to validate a DCC.
    The underlying selection logic is available through the `applicableRuleVersions` function.
* Types `ValueSets`, `CompressedValueSets`, and a function `compressValueSets` to transform value sets coming from the EU DCC Gateway into the format necessary by the `validateDcc` function.


## Development

Building the JavaScript bundle is done by running the build script as follows:

    $ ./build.sh

The bundle is then located in `dist/`.
The build script also checks for circular dependencies, and should exit with error code 1 in case of a circular dependency in the transpiled source.


## Licensing

Copyright (c) 2021- Meinte Boersma (as working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en)), and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

