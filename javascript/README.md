# JavaScript stuff

Requires [Node.js](https://nodejs.org/), at least version 15.8.0.
Run

    $ npm install

or

    $ yarn

to download NPM-dependencies, and set up the [`out`](./out/) temporary directory.

Most important/interesting thing is to run

    $ node dist/run-rules.js

to run all [these rules](../rules/EU-Level-business-rules.json) on all DGC payloads in the [dgc-testdata](https://github.com/eu-digital-green-certificates/dgc-testdata) repo.

Code is written in TypeScript, with typings serving as documentation.


## Organization

* `dist/`: result of compiling TypeScript code to JavaScript.
    Run

        $ node dist/<scriptName>.js

    on the CLI.

* `src/`: TypeScript code.
    Run `tsc` to compile that (non-bundled) to `dist/`.
    See comments in those files to find out their purposes.
    Entrypoints are: [run-rules](./src/run-rules.ts), [run-query](./src/run-query.ts).


## Development

Run

    $ npm run watch

(or `$ yarn watch`) to continually (and incrementally) compile all TypeScript code.

