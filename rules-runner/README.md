<h1 align="center">
 Digital COVID Certificates: Rules runnner
</h1>

<p align="center">
    <a href="#about">About</a> •
    <a href="#organisation">Organisation</a> •
    <a href="#testing--status">Testing & Status</a> •
    <a href="#licensing">Licensing</a>
</p>


## About

A rules runner is a component to run a rule set (for a specific member state) for validating DCCs.


## Organisation

This (part of the) repository contains (or will contain):

* Implementations of rules runner components for various platforms/programming languages - currently:

  * [JavaScript](./javascript/rules-runner-js) (as NPM package)
  * [Kotlin](./rules-runner-kotlin) (as Maven/Kotlin module)

* _Simplistic_ JSON Schema for [rule sets](./resources/schemas/RuleSet.json) - the actual JSON Schema for rules can be found [here](https://github.com/eu-digital-green-certificates/dgc-gateway/blob/feat/validation-rules/src/main/resources/validation-rule.schema.json)

* The [JSON data containing the value sets](./resources/valueSets.json) necessary for executing the validation rules.
    These are computed from [the value sets in the eHN DCC schema-repository](https://github.com/ehn-dcc-development/ehn-dcc-valuesets) by running

        $ ./prepare-valueSetsJson.sh

    on the CLI inside `rules-runner/resources`.

    Prerequisites for running this command are:

    * The [eHN DCC schema-repository](https://github.com/ehn-dcc-development/ehn-dcc-schema) should be cloned locally next to this `dgc-business-rules` repository.
    * The [`jq` tool](https://stedolan.github.io/jq/) should be installed.
        E.g., on Mac you can install it as follows using [Homebrew](https://brew.sh/):

            $ brew install jq

* A [build script](./build.sh) to build `rules-runner-js`, and `rules-runner-kotlin`.


## Testing & Status

- If you found any problems, please create an [Issue](/../../issues).
- Current status: Work-In-Progress.


## Licensing

Copyright (c) 2021 Dutch Ministry of Health, Welfare and Sport, and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific
language governing permissions and limitations under the License.

