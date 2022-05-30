# Change log

## 0.5.0

* Make validation on rule that checks data accesses against `CertificateType` less strict by disregarding access to the EU DCC's `dob` (date-of-birth) field - this was [issue #112](https://github.com/ehn-dcc-development/eu-dcc-business-rules/issues/112)
## 0.4.1

* Upgrade deps, m.n. `certlogic-js` &rarr; 1.2.0


## 0.4.0

* Extract rule selection logic as a separate API endpoint.


## 0.3.0

* Improve description of existing functionality, and of development practices.
* Add a type and functionality for validating a DCC, including rule selection.
* Add types and functionality for “compressing” value sets.
* Clean up scripts.


## 0.2.0

* Add a function `parseRuleId`.


## 0.1.0

* (Initial version.)

