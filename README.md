<h1 align="center">
 Digital Green Certificates: Business Rules
</h1>

<p align="center">
    <a href="#about">About</a> •
    <a href="#testing--status">Testing & Status</a> •
    <a href="#licensing">Licensing</a>
</p>


## About

The [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) allows to determine whether a person is fit-for-travel based on their vaccination, test, and recovery status.
To make such determinations, business (or validation) rules have to be implemented in verifier apps.

The architecture chosen for that relies on expressing the validation rules in a plain JSON format, called **CertLogic**.
That makes updating the validation rules without needing to update verifier apps as a whole, and without much danger of triggering e.g. Apple's anti-code injection policy.
A set of validation rules (or _rule set_) is then executed, or “run” by a CertLogic engine against JSON data consisting of a DCC payload, and an external parameters object with value sets, validation clock, etc.

For the moment, [this Confluence page](https://webgate.ec.europa.eu/fpfis/wikis/display/eHN/EU+DGC+Validation+Rules) is the authoritative source of information.


## Assumptions

Various code in this repo assumes that the following two repos are cloned right next to where this repo's cloned:

* [dgc-testdata](https://github.com/eu-digital-green-certificates/dgc-testdata)
* [ehn-dgc-schema](https://github.com/ehn-dcc-development/ehn-dgc-schema)


## Organisation

This repository contains the following:

* [CertLogic](./certlogic): a specification, reference implementations for various platforms, a test suite, and a validation tool.
  CertLogic is generic, and not tied to the DCC, to make it easier to understand, test, expand, etc. independently.
* [RulesRunner](./rules-runner): implementations of components for running rule(set)s against a DCC payload, for various platforms, including testing.
* [Rule sets](./rulesets): implementations of rule sets with unit tests - for now that of the EU-template, but later of possibly various member states as well.

**TODO**  The contents of the [javascript](./javascript) directory still have to be moved to their proper places.


## Testing & Status

- If you found any problems, please create an [Issue](/../../issues).
- Please make sure to review the issues to see if any other members states found issues with your provided test data.
- Current status: Work-In-Progress. 


## Licensing

Copyright (c) 2021 Ministry of Health, Science, and Sports, and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

