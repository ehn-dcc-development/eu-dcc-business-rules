# DCC Business Rules Utilities

This NPM package contains a number of useful “things” for working with EU DCC business rules conforming to the [EU DCC Validation Rules specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/eu-dcc_validation-rules_en.pdf) (link to PDF).
These things are:

* A TypeScript type for a rule: `Rule`.
* A `validateRule` function that validates a rule against the JSON Schema, as well as against a number of other constraints (most of which are also checked for by the EU DCC Gateway).
* A `normalCopyOf` function to make a copy of a `Rule` object with fields in a normalised key order.
* A `hasRulesForAllEventTypes` function that checks for a rule set whether it covers all events.
    That's useful to avoid that a rule set doesn't have rules for a particular event type (recovery, test, vaccination), which is not the same as not accepting any DCC of that missing event type.
    Note: this function only looks at the rules' stated value of `CertificateType`, regardless of whether that value matches the actual `Logic`.


## Development

Transpiling the TypeScript source to JavaScript can be done by running any of the following:

    $ tsc
    $ npm run build

The transpiled source is located in `dist/`.

Checking for circular dependencies in the transpiled source can be done as follows:

    $ [npx ] npx dpdm dist/ --circular --exit-code circular:1
    $ npm run check-deps

(The latter command also transpiles the source.)
This command should exit with error code 1 in case of a circular dependency in the transpiled source.


## Licensing

Copyright (c) 2021 Meinte Boersma (as working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en)), and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

