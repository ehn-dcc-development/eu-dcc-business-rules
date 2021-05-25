<h1 align="center">
 Digital Green Certificates: Business Rules
</h1>

<p align="center">
    <a href="#about">About</a> •
    <a href="#testing--status">Testing & Status</a> •
    <a href="#how-to-contribute">How to Contribute</a> •
    <a href="#licensing">Licensing</a>
</p>


## About

To be able to make decisions based on DGC instances, business rules have to be implemented.
This repository collects “various” relevant artifacts pertaining to business rules.


## Assumptions

Various code in this repo assumes that the following two repos are cloned right next to where this repo's cloned:

* [dgc-testdata](https://github.com/eu-digital-green-certificates/dgc-testdata)
* [ehn-dgc-schema](https://github.com/ehn-digital-green-development/ehn-dgc-schema)


## Testing & Status

- If you found any problems, please create an [Issue](/../../issues).
- Please make sure to review the issues to see if any other members states found issues with your provided test data.
- Current status: _very_ much a Work-In-Progress. 


## Code organization

- [`javascript/`](./javascript): JavaScript “stuff” - see [the README there](./javascript/README.md) for pointers
- [`rules/`](./rules): prelimary implementation of the  in the [JsonLogic](https://jsonlogic.com/) format.
  _Note:_ this has currently **no official status!**.
  [This Confluence page](https://webgate.ec.europa.eu/fpfis/wikis/display/eHN/EU+DGC+Validation+Rules) is leading, and discussions should be conducted there.
- [`jsonLogic/`](jsonLogic): unit tests for testing semantics of JsonLogic + notes.


## How to contribute  

Contribution and feedback is encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](./CONTRIBUTING.md). By participating in this project, you agree to abide by its [Code of Conduct](./CODE_OF_CONDUCT.md) at all times.


## Licensing

Copyright (C) 2021 T-Systems International GmbH and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

