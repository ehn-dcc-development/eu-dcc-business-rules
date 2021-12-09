# DCC Business Rules Utilities


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


## Licensing

Copyright (c) 2021 Meinte Boersma (as working for the [Dutch Ministry of Health, Science, and Sports](https://www.rijksoverheid.nl/ministeries/ministerie-van-volksgezondheid-welzijn-en-sport), and on behalf of/in support of the [European Health Network](https://ec.europa.eu/health/ehealth/policy/network_en)), and all other contributors

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" 
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific 
language governing permissions and limitations under the License.

