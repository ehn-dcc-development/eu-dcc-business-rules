<h1 align="center">
 Digital COVID Certificates: Business Rules
</h1>

<p align="center">
    <a href="#about">About</a> •
    <a href="#assumptions">Assumptions</a> •
    <a href="#organisation">Organisation</a> •
    <a href="#testing--status">Testing & Status</a> •
    <a href="#licensing">Licensing</a>
</p>


## IMPORTANT NOTICE

As of July 1st 2023, the EU DCC project has been handed over to the [WHO](https://github.com/WorldHealthOrganization/smart-trust-network-gateway).
The project has therefore been frozen.
This repository will be placed into archival mode.
It will remain available for the foreseeable future - however, it will no longer be actively maintained.


## About

The [Digital COVID Certificate (DCC)](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) allows to determine whether a person is deemed fit-for-travel into a country-of-arrival (CoA) based on their vaccination, test, and recovery status.
To make such determinations, business (or validation, or verification) rules have to be implemented in verifier apps.

This repository contains a framework to implement (sets of) rules in verifier apps (and backends) using a _rules engine_.
It [explains how to do that](./documentation/how-to.md) in a way that makes these rules interchangeable across implementors.
The advantage of this approach is that it ultimately allows citizens to check their fit-for-travel status into an intended CoA _ahead_ of travel, against the actual rules.
This can be achieved by adhering to a common, and testable and verifiable way of defining, and executing rules.
The interchangeable rules are uploaded to, and can be downloaded from the EU Digital COVID Certificate Gateway (DGCG) - more info can be found [here](./documentation/gateway.md).

An example of a rule can be found [here](documentation/example.adoc).

This work is a result of work done by the EU Taskforce Business Rules, and described in [this document](https://ec.europa.eu/health/sites/default/files/ehealth/docs/eu-dcc_validation-rules_en.pdf).
The (JSON Schema) technical specification for the EU DCC can be found [here](https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf).
More relevant documents and links can be found [here](./documentation/documents-links.md).


## Organisation

This repository contains the following:

* [CertLogic](./certlogic/README.md): a specification, reference implementations for various platforms (JavaScript, Kotlin, Dart), a test suite, a validation tool, and a HTML renderer.
  CertLogic is “mostly generic and independent of the DCC”, to make it easier to understand, test, expand, etc. independently.
  ”Mostly” means: only a small part of it is specific to the purpose of validating DCCs using business rules with logic expressed in CertLogic.
* [DCC Business Rules Utilities](./dcc-business-rules-utils/README.md): a JavaScript library that contains useful “things” for working with EU DCC business rules.
* [Documentation](./documentation/README.md).
* [JsonLogic](./jsonlogic/): documentation and code relating to JsonLogic.
* [CertLogic editor](./mps/README.md): implemented with MPS.


## Testing & Status

- If you found any problems, please create an [Issue](/../../issues).
- Current status: Work-In-Progress.


## Licensing

Copyright (c) 2021 Dutch Ministry of Health, Science, and Sports, and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

