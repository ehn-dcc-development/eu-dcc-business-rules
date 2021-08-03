# CertLogic implementations

Several implementations of CertLogic and compatible implementations of JsonLogic exist - links to these are given below.
Note that the compatibility of JsonLogic implementations does not necessarily include the custom operations, such as `plusTime`, and `extractFromUVCI`.
These custom operations:

* Are defined in the [CertLogic specification](../certlogic/specification/README.md).
* Can be implemented by mimicking any of the existing implementations in
  * [Java-/TypeScript](../certlogic/certlogic-js/src/internals.ts),
  * [Kotlin](../certlogic/certlogic-kotlin/src/main/kotlin/eu/ehn/dcc/certlogic/internals.kt),
  * or [Dart](../certlogic/certlogic-dart/lib/src/internals.dart).
* Can be tested using the [test suite](../certlogic/specification/testSuite), and by mimicking the various unit tests available, such as:
  * in [Java-/TypeScript](../certlogic/certlogic-js/src/test/test-internals.ts)
  * in [Kotlin](../certlogic/certlogic-kotlin/src/test/kotlin/eu/ehn/dcc/certlogic/internalTests.kt)
  * in [Dart](../certlogic/certlogic-dart/test/internals_test.dart).


## JavaScript (TypeScript)

[`certlogic-js`](../certlogic/certlogic-js): a TypeScript implementation, usable from JavaScript as well, and available as [NPM package](https://www.npmjs.com/package/certlogic-js).
It can be installed by running

    $ npm certlogic-js

and adding the following import to TS/ES6+ source

    import { evaluate } from "certlogic-js"

or the equivalent ES6- statement

    const { evaluate } = require("certlogic-js")


## JVM

* [`certlogic-kotlin`](../certlogic/certlogic-kotlin): a greenfield Kotlin implementation, 
    Releases are available [on GitHub](https://github.com/ehn-dcc-development/dgc-business-rules/releases/tag/latest), and also as [GitHub Package](https://github.com/ehn-dcc-development/dgc-business-rules/packages/849466).
    Note that you have to modify your `~/.m2/settings.xml` to be able to retrieve a GitHub Package: see [this page](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry).

* [`json-logic-java`](https://github.com/jamsesso/json-logic-java): Java implementation of JsonLogic which has been verified to comply with the CertLogic test suite.
    Releases are available [on GitHub](https://github.com/jamsesso/json-logic-java/releases), and also on [Maven Central](https://search.maven.org/artifact/io.github.jamsesso/json-logic-java).


## Swift

[`json-logic-swift`](https://github.com/eu-digital-green-certificates/json-logic-swift): a Swift implementation of JsonLogic, conforming to the CertLogic spec.
  Releases are available [on GitHub](https://github.com/eu-digital-green-certificates/json-logic-swift/releases/latest).


## Go

* [`json-logic-go`](https://github.com/IBM/json-logic-go): an implementation of JsonLogic in Go, contributed through the hard work of Ilie Circiumaru.


## Dart

* [`certlogic-dart`](../certlogic/certlogic-dart): a Dart implementation of CertLogic.

