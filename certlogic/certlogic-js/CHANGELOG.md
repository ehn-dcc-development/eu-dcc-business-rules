# Change log

# 1.0.1

* Fix that the `validate` function in `certlogic-js` threw an exception for a `plusTime` operation with invalid time unit.
* Update dev-dependencies of `certlogic-js`.


# 1.0.0

* **breaking change:** Expose implementation and specification versions separately


# 0.12.0

* Implement a desugaring operation in the `misc` sub package


# 0.11.0

* Implement type guard functions `isCertLogicExpression` and `isCertLogicOperation` for the CertLogic types


# 0.10.0

* Add a `dataAccessesWithContext` function in the `validation` sub package
* Provide better format validations error in case an operation has no values/operands


## 0.9.2

* Add `extractFromUVCI` operation to the TypeScript typings


## 0.9.1

* Handle `extractFromUVCI` operation in the `validation/dataAccesses` function


## 0.9.0

* Implement the `extractFromUVCI` operation


## 0.8.2

* Integrate everything from the `certlogic-validation` NPM package back into this `certlogic-js` NPM package


## 0.8.1

* Invalid data access (`var` operation) on `null` now also throws
* Fix bugs in `certlogic-validation`

