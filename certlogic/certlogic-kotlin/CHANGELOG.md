# Change log

# 0.11.1

* Align implementation of `and` operation with the specification: operands are evaluated lazily.


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

