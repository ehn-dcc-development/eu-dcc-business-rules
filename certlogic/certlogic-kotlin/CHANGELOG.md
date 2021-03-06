# Change log

# 0.11.2

* Extend `plusTime` operation to coincide with `dccDateOfBirth` on partial dates.

Only impacts test code:

* Implemented runner for validation test suite, replacing existing unit tests for validator.
* Replaced use of deprecated `ObjectNode.put`.


# 0.11.1

* Align implementation of `and` operation with the specification: operands are evaluated lazily.
* Fix `plusTime` operation w.r.t. behaviour for leap days.


# 0.11.0

* Add a `dccDateOfBirth` operation to convert date of birth (DOB) values in the EU DCC to a date.
  Such DOBs may be “partial dates” of the form YYYY or YYYY-MM.
  See [the specification](../specification/README.md#) for more details.

* Introduce the concept of “boolsiness” (internally) by means of a type `Boolsiness` and a function `boolsiness`.


# 0.10.0

* Add a `dataAccesses` Kotlin file with `dataAccesses` and `dataAccessesWithContext` functions
* Provide better format validations error in case an operation has no values/operands


## 0.9.0

* Implement the `extractFromUVCI` operation


## 0.8.1

* Implement a validator
* Invalid data access (`var` operation) on `null` now also throws

