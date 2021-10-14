# CertLogic in Kotlin

This module contains the reference implementation of CertLogic, written in Kotlin/Java.
It's compatible with version **1.2.2** of the CertLogic specification.

Apart from test sources, it consists of the following files:

* [CertLogic type defs and evaluator](./src/main/kotlin/eu/ehn/dcc/certlogic/certlogic.kt)
* A [JsonDateTime](./src/main/kotlin/eu/ehn/dcc/certlogic/JsonDateTime.java) Java class which is used to represent date-times, as if they were just another type of JSON values.
* A [TimeUnit](./src/main/kotlin/eu/ehn/dcc/certlogic/TimeUnit.java) Java enum with all the time units available for use in combination with the `plusTime` operation
* A [validator](./src/main/kotlin/eu/ehn/dcc/certlogic/validator.kt) function to (format-)`validate` CertLogic expressions
* A [dataAccesses](./src/main/kotlin/eu/ehn/dcc/certlogic/dataAccesses.kt) utility with functions that compute data accesses that may happen in a given CertLogic expression

The implementation relies on Jackson's types to represent JSON values.

