# JavaScript stuff

Requires [Node.js](https://nodejs.org/), at least version 15.8.0.
Run

    $ npm install

or

    $ yarn

to download NPM-dependencies.

Most important/interesting thing is to run

    $ npm start

to run all [these rules](../rules/EU-Level-validation-rules.json) on all payloads in the [dgc-testdata](https://github.com/eu-digital-green-certificates/dgc-testdata) repo.

Code is written in TypeScript, with typings serving as documentation.


## Organization

* `dist/`: result of compiling TypeScript code to JavaScript.
    Run

        $ node dist/<scriptName>.js

    on the CLI.

* `src/`: TypeScript code.
    Run `tsc` to compile that (non-bundled) to `dist/`.
    See comments in those files to find out their purposes.
    Entrypoints are: [run-rules-on-testData](./src/testData/run-rules-on-testData.ts), [validate-testData-dcc](./src/testData/validate-testData-dcc.ts), and [run-query](./src/testData/run-query.ts).


## Development

Run

    $ npm run build-watch

(or `$ yarn build-watch`) to continually (and incrementally) compile all TypeScript code.

Run

    $ npm test

(or `$ yarn test`) to run unit tests once.

Run

    $ npm run test-watch

(or `$ yarn test-watch`) to run unit tests once.

For testing, make sure to build first, or build in watch-mode.

