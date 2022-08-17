# Change log

## 0.3.1

* Moved contents of `postinstall` NPM scriptlet to `build` scriptlet, to avoid that this package doesn't install on machines without `mkdir -p`.
* Update (and lock) dependencies.
* Update TypeScript compiler configuration.


## 0.3.0

* Add rendering of `dccDateOfBirth` operation.


## 0.2.0

* Fix that not all operands of an infix operator were rendered.
* Don't package with TypeScript source (+ don't emit source maps).
* Upgrade dependencies, and commit Yarn lock file.
* (Add this change log.)

