# CertLogic

[CertLogic](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic) is a standard for expressing logic, such as the kind you find in business/validation rules, in plain JSON format.
It is a [specified](https://github.com/ehn-dcc-development/dgc-business-rules/blob/main/certlogic/specification/README.md) subset of [JsonLogic](https://jsonlogic.com/), extended with necessary custom operations - e.g. for working with dates.
It's part of the efforts surrounding the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en), and as such serves as the basis for defining _interchangeable_ validation rules on top of the DCC.

This NPM package consists of an implementation of CertLogic in JavaScript(/TypeScript) which is compatible with version **1.3.0** of [the specification](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic/specification/README.md).


## API

This NPM package exposes the following top-level features:

* `CertLogicExpression`, `CertLogicOperation`, `TimeUnit`: TypeScript types to capture CertLogic expressions (for generic, respectively operation expressions), and units of time, respectively.
    The first two of these types are backed by type guard functions named `isCertLogicExpression`, and `isCertLogicOperation`, respectively.
* `evaluate`: a function that takes a CertLogic expression, and a data context, and evaluates that expression with the given data context.
  Note that the function will throw an `Error` if it encounters any problem, rather than returning some default value.
* `implementationVersion`: a string constant containing the current *implementation* version (taken from the [`package.json`](./package.json)).
* `specificationVersion`: a string constant containing the latest version of the specification that this CertLogic implementation is compatible with.
* `isInt`: a function to determine whether a given value represents an integer.

It also exposes a sub package `certlogic-js/validation` for validation, which has the following features:

* `ValidationError`: a TypeScript type for reporting validation errors on (sub) expressions.
* `validateFormat`: a function that validates CertLogic expressions purely based on the CertLogic format, without regarding types.
* `validate`: a function that validates CertLogic expressions, and returns any violations as validation errors.
  Currently, this is effectively an alias for `validateFormat`, but that might change in the future.
* `dataAccesses`: a function that computes all data accesses that may be performed by the given CertLogic expression, through contained `var` operations.
* `dataAccessesWithContext`: a variant of the `dataAccesses` function that provides a list of the contexts the reported data accesses happen in.
    Typically, such a context is the "ambient", innermost, encompassing CertLogic expression.
    As an example: for the expression `{ "extractFromUVCI": [ { "var": "ci" }, 1 ] }`, the only data access that happens pertains to `ci`, and its context is this entire expression.

These features can be imported using `import { ... } from "certlogic-js/dist/validation`.
(Unfortunately, for now you need to add the `/dist` fragment to the import path. This will be fixed later on.)

(Formerly, this sub package was the `certlogic-validation` NPM package.)

Finally, it also exposes a sub package `certlogic-js/misc` which contains additional features/conveniences:

* `desugar`: a function to "desugar" "extended CertLogic expression" to proper CertLogic expressions.
    At the moment, this only pertains to an additional `or` expression, which is desugared using [De Morgan's laws](https://en.wikipedia.org/wiki/De_Morgan%27s_laws).
    Note that *no specification is provided* for the "extended CertLogic expressions".
* `asCompactText`: a function to render a CertLogic expression in a compact, textual notation - certainly more compact than the JSON format.
    Note that this notation isn't specified (at this time).

Note that documentation is...sparse outside of the [CertLogic specification](../specification/README.md), and the [overall documentation](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/documentation) around CertLogic and DCC business/validation rules.
In particular, code-level documentation is largely absent.
On the other hand: the [TypeScript source code](./src) is likely easy enough to understand.


## Commandline

This NPM package exposes three CLI commands: `certlogic-run`, `certlogic-validate`, and `desugar-cli`.
These can be used as follows:

    $ npx certlogic-run <path of JSON file containing CertLogic expression> <path of JSON file containing the data context>
    $ npx certlogic-validate <path of JSON file containing CertLogic expression>
    $ npx certlogic-desugar < <path of JSON file containing extended CertLogic expression>

or as

    $ ./node_modules/.bin/certlogic-run <path of JSON file containing CertLogic expression> <path of JSON file containing the data context>
    $ ./node_modules/.bin/certlogic-validate <path of JSON file containing CertLogic expression>
    $ ./node_modules/.bin/certlogic-desugar < <path of JSON file containing extended CertLogic expression>

(respectively).

inside any NPM package that has `certlogic-js` installed as dependency.
Note that for `certlogic-desugar`, the "sugared" expression in input on `stdin`, and the desugared expression is output on `stdout`.


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

Unit tests can be executed by running any of the following:

    $ [npx ] mocha --recursive dist/test
    $ npm test

(The latter command also transpiles the source.)

Some of the unit tests rely on the [test suite](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic/testSuite), which must be present on the relative path `../specification/`.


## Licensing

Copyright (c) 2021 Meinte Boersma (as working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en)), and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

