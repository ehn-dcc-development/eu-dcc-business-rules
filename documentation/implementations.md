# CertLogic implementations

Several implementations of CertLogic and compatible implementations of JsonLogic exist.
Links to these are:


## JavaScript (TypeScript)

[`certlogic-js`](../certlogic/certlogic-js) is a TypeScript implementation, usable from JavaScript as well, and available as [NPM package](https://www.npmjs.com/package/certlogic-js).
It can be installed by running

    $ npm certlogic-js

and adding the following import to TS/ES6+ source

    import { evaluate } from "certlogic-js"

or the equivalent ES6- statement

    const { evaluate } = require("certlogic-js")

[`certlogic-validation`](../certlogic/certlogic-validation) is an [NPM package](https://www.npmjs.com/package/certlogic-validation) that exposes validators for CertLogic expressions.


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

A Go version is in the works.

