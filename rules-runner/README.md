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

A rules runner is a component to run a ruleset (for a specific member state) for validating DCCs.


## Organisation

This (part of the) repository contains (or will contain):

* Reference implementations of CertLogic for various platforms - **TODO**
* [General information about JsonLogic](./javascript/jsonlogic) (as the basis for CertLogic).
* The [JSON data containing the value sets](./resources/valueSets.json) necessary for executing the validation rules.
  These are computed from [the value sets in the EHN DCC schema-repository](https://github.com/ehn-digital-green-development/ehn-dgc-schema/tree/main/valuesets) by running the [this script](../rules-runner/resources/prepare-valueSetsJson.sh) on the commandline.


## Testing & Status

- If you found any problems, please create an [Issue](/../../issues).
- Please make sure to review the issues to see if any other members states found issues with your provided test data.
- Current status: Work-In-Progress.


## Licensing

Copyright (c) 2021 Ministry of Health, Welfare and Sport, and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific
language governing permissions and limitations under the License.

