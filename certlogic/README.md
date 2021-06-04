<h1 align="center">
 Digital COVID Certificates: CertLogic
</h1>

<p align="center">
    <a href="#about">About</a> •
    <a href="#organisation">Organisation</a> •
    <a href="#testing--status">Testing & Status</a> •
    <a href="#licensing">Licensing</a>
</p>


## About

CertLogic is a standard for expressing logic, such as the kind you find in business/validation rules, in plain JSON format.
CertLogic is a [specified](certlogic-overall/documentation/specification.md) subset of [JsonLogic](https://jsonlogic.com/), extended with necessary custom operations - e.g. for working with dates.
It serves as the basis for defining _interchangeable_ validation rules on top of the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en).


## Organisation

This (part of the) repository contains:

* Reference implementations of CertLogic for various platforms - currently: [JavaScript](./certlogic-js), [Kotlin](./certlogic-kotlin)
* [Platform-independent “stuff”](./certlogic-overall):
    * [Documentation](./certlogic-overall/documentation): [the specification](./certlogic-overall/documentation/specification.md), [design choices](./certlogic-overall/documentation/design-choices.md), etc.
    * [JSON Schemas](./certlogic-overall/schemas) for [CertLogic expressions](./certlogic-overall/schemas/CertLogic-expression.json) and [test suites](./certlogic-overall/schemas/CertLogic-testSuite.json) JSON
    * A comprehensive [test suite](./certlogic-overall/testing) - **TODO**  to expand
    * A [validation tool](./certlogic-overall/validation) - **TODO**


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

