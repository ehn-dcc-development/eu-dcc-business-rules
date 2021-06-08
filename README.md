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

This leads to the following requirements on the business rules:

1. They must be executable on a number of platforms/programming languages.
2. The verifier apps must be updatable with new (versions of) business rules without needing to update the entire app.
3. They must be freely exchangable between participating nations, so that travelers can determine _beforehand_ whether they're going to be deemed fit-for-travel.

A good way to respect these requirements is to express these business rules in a plain JSON format:

1. Their formulation is effectively platform/programming language-aspecific.
2. They can be downloaded to verifier apps “just as data”, decreasing the danger of being seen to violate e.g. Apple's “no code injection”-policies, and of slow app updates.

It was initially proposed to use [JsonLogic](https://jsonlogic.com/) to formulate business rules.
JsonLogic has implementations of its engine for a variety of platforms/programming languages.
However, the following problems were found with (using) JsonLogic:

* The implementations had differing behaviour/semantics.
  In theory, this could be mitigated by patching implementations to align their behaviour/semantics.
* No support for dates and datetimes was provided out-of-the-box.
  In theory, this could be mitigated by adding custom operations, but unfortunately, not every implementation allows that.
* JsonLogic provides more than is required for the purpose here, which would mean that much testing is required to ensure that behaviour is consistent across implementations.

To mitigate these problems, a subset of JsonLogic, called **CertLogic**, has been specified, and adorned with a test suite, validator tooling, and own implementations for a number of platforms/programming languages.
A set of validation rules (or _rule set_) is then executed, or “run” by a CertLogic engine against JSON data consisting of a DCC payload, and an external parameters object with value sets, validation clock, etc.

For the moment, [this Confluence page](https://webgate.ec.europa.eu/fpfis/wikis/display/eHN/EU+DGC+Validation+Rules) is the authoritative source of information.


## Assumptions

Various code in this repo assumes that the following two repos are cloned right next to where this repo's cloned:

* [dgc-testdata](https://github.com/ehn-dcc-development/dgc-testdata)
* [ehn-dgc-schema](https://github.com/ehn-dcc-development/ehn-dgc-schema)


## Organisation

This repository contains the following:

* [Documentation](./documentation): currently only [design choices](./documentation/design-choices.md).
* [CertLogic](./certlogic/README.md): a specification, reference implementations for various platforms, a test suite, and a validation tool.
  CertLogic is generic, and not tied to the DCC, to make it easier to understand, test, expand, etc. independently.
* [RulesRunner](./rules-runner/README.md): implementations of components for running rule(set)s against a DCC payload, for various platforms, including testing.
* [Rule sets](./rulesets): implementations of rule sets with unit tests - for now that of the EU-template, but later of possibly various member states as well.

**TODO**  The contents of the [javascript](./javascript) directory still have to be moved to their proper places, and are currently provided as-is *only*, without guarantee of them being useful.


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

