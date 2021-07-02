# CertLogic

[CertLogic](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic) is a standard for expressing logic, such as the kind you find in business/validation rules, in plain JSON format.
It is a [specified](https://github.com/ehn-dcc-development/dgc-business-rules/blob/main/certlogic/specification/README.md) subset of [JsonLogic](https://jsonlogic.com/), extended with necessary custom operations - e.g. for working with dates.
It's part of the efforts surrounding the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en), and as such serves as the basis for defining _interchangeable_ validation rules on top of the DCC.

This NPM package consists of a validator for CertLogic, implemented in JavaScript(/TypeScript).


## API

This NPM package exposes the following top-level things:

* `ValidationError`: a TypeScript type for reporting validation errors on (sub) expressions.
* `validateFormat`: a function that validates CertLogic expressions purely based on the CertLogic format, without regarding types.
* `validate`: a function that validates CertLogic expressions, and returns any violations as validation errors.
    Currently, this is effectively an alias for `validateFormat`, but that might change in the future.
* `dataAccesses`: a function that computes all data accesses that may be performed by the given CertLogic expression.

Note that documentation is...sparse outside of the [overall documentation for CertLogic](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/documentation).
In particular, code-level documentation is largely absent.
On the other hand: the [TypeScript source code](./src) is likely easy enough to understand.


## Commandline

This NPM package exposes a CLI command, which can be used as follows:

    $ npx certlogic-validate <path of JSON file containing CertLogic expression>

or as

    $ ./node_modules/.bin/certlogic-validate <path of JSON file containing CertLogic expression>

inside any NPM package that has `certlogic-validation` installed as dependency.


## Testing

Executing the tests requires the [test suite](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic/testSuite), located directly next to this directory.


## Licensing

Copyright (c) 2021 Meinte Boersma (as working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en)), and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

