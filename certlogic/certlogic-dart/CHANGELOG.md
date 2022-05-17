## 0.1.2 2022-05-17

* Fix incorrect specification number (1.3.1 &rarr; 1.3.2)


## 0.1.1 2022-05-12

* Extend `plusTime` operation to coincide with `dccDateOfBirth` on partial dates


## 0.1.0 2022-04-08

* Align implementation of `and` operation with the specification: operands are evaluated lazily.
* Fix `plusTime` operation w.r.t. behaviour for leap days.
* Add a `dccDateOfBirth` operation to convert date of birth (DOB) values in the EU DCC to a date.
  Such DOBs may be “partial dates” of the form YYYY or YYYY-MM.
  See [the specification](../specification/README.md#) for more details.


## 0.0.6 2021-12-28

* Implemented `extractFromUVCI` with alias `extractFromUCI`


## 0.0.5

* Invalid data access (`var` operation) on `null` now also throws
* Cleanup `reduce` function data


## 0.0.4

* Fixed bugs for `and`, `reduce` and Dates
* Added tests


## 0.0.3

* Fixed bug where year and month only add one


## 0.0.2

* Fixed bug where year and month throw errors


## 0.0.1+1

* Fixed incorrect example in README


## 0.0.1

* Implemented CertLogic in Dart

