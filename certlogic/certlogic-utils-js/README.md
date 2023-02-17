# README

This NPM package implements utility functionality for CertLogic, compatible with version **1.2.2** of [the (Type-/)JavaScript implementation](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic/certlogic-js).

Note that parts of this package may be marked as having _&beta;_-status/being experimental.
Those parts might also be out-of-sync with either the specification, or the JS implementation (the `certlogic-js` package).

The intention is to (eventually) move all functionality in `certlogic-js` that's not directly related to/used by the evaluation of CertLogic expressions, in this utility package.
That includes:

* **Validation** (because CertLogic expressions should be validated as such _before_ they are passed into an evaluator function)
* Factory functions
* Desugaring
* Reflection/inspection, e.g. the `dataAccesses` function
* [&#10003;] [Compilation](./src/compiler/index.ts)
* [&#10003;] [Partial evaluation](./src/partial-evaluator/README.md)
* Type system
* etc.

For more information: have a look at [the CertLogic roadmap](../ROADMAP.md).


## Licensing

Copyright (c) 2021-2022 Meinte Boersma, working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en), and all other contributors.

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific
language governing permissions and limitations under the License.

