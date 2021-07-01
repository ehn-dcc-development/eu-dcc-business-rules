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

* The [JSON data containing the value sets](./resources/valueSets.json) necessary for executing the validation rules.
    These are computed from [the value sets in the eHN DCC schema-repository](https://github.com/ehn-dcc-development/ehn-dcc-valuesets) by running

        $ ./prepare-valueSetsJson.sh

    on the CLI inside `rules-runner/resources`.

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

