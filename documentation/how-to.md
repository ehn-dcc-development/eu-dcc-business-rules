# How-To

We explain how to implement business/validation/verification rules on top of the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en).
From now on, we'll drop the adjectives, and stick to _“rule”_.


## Concepts

A **rule** in the context of the DCC consists of a logical expression, and some meta data.
The logical expression operates on a specific data structure, and should produce a value`true` or `false`.
Rules are executed by a _rule engine_.
A `true` result of a rule's execution/evaluation indicates that the rule _“passes”_, while a `false` is grounds for denying fit-for-travel status.

The data structure a rule operates on can be rendered in JSON format as follows:

```json
{
  "payload": <the DCC JSON payload>,
  "external": {
    "valueSets": <the “compressed” value sets>,
    // ...<all other (extra) external parameters>
  }
}
```

The DCC payload JSON _must_ conform to the [DCC JSON Schema](https://github.com/ehn-dcc-development/ehn-dcc-schema/blob/main/DCC.combined-schema.json) (currently at version/release **1.3.0**), as well as to the [technical specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf) for it.

The “compressed” value sets are derived from the [eHN value sets repo](https://github.com/ehn-dcc-development/ehn-dcc-valuesets).
The (extra) external parameters may consist of data like the validation clock.

Apart from its logic -a CertLogic expression- a rule comes with metadata:

* An **id** to identify the rule with.
    A rule is immutable, with identity provided by its immutable ID.

* Validity range: valid from a certain date(-time), until (exclusive) a certain date(-time).
    Either end of a validity range may be undefined, meaning since/until forever, resp.

* Human-readable message(s) explaining (both) the outcome(s).

It's desirable that each rule has a single responsibility, and accesses as little data from the DCC and extra external parameters as possible.
This keeps rules understandable, testable, and individually replaceable.
The full fit-for-travel determination must therefore take the form of a *set of rules*.


## Writing rule expressions

The logical expression of a rule is written in a JSON format called **CertLogic**.
CertLogic is a subset of the [JsonLogic](https://jsonlogic.com/) format, a relatively well-known format/framework for expressing business logic on structured data, restricted to and expanded with what's needed for DCC-rules.
For more information about CertLogic: read its [specification](../certlogic/specification/README.md).
(For more information on the reasoning behind this setup: see the [design choices document](./design-choices.md).)

Although CertLogic is a fairly easy format, some help with authoring rule expressions is desirable.
The following things can be helpful:

* Validate a CertLogic expression in JSON using the [CertLogic JSON Schema](../certlogic/schemas/CertLogic-expression.json).
    Many IDEs (such as IntelliJ/IDEA) provide the possibility to configure schema mappings: a mapping from a specific JSON Schema file to specific JSON files (or directories containing those).
    This has the effect that the IDE validates JSON files in the mapping on-the-fly, and provides content assist(/“Intellisense”), etc.

* The CertLogic specification is stricter than what can be expressed in a JSON Schema.
    To validate a CertLogic expression against the specification, the [`certlogic-js/validation` NPM sub package](../certlogic-js/README.md) can be used.
    The `certlogic-js` NPM module exposes an executable `certlogic-validate`, which can be run from the CLI as follows:

        $ npx certlogic-validate <path to JSON file containing a single CertLogic expression>

    or as

        $ ./node_modules/.bin/certlogic-validate <path to JSON file containing a single CertLogic expression>

    (The `$` represents the CLI prompt.)
    This commands takes one CLI argument: a path to a JSON file containing a CertLogic expression.
    It will print a list of validation errors to `stdout` - if that's empty, the CertLogic expression is correct.
    This works from the directory where you installed `certlogic-js`.
    Alternatively, you can use `npx` (when installed) to directly execute it.
    Inside NPM `scripts`, you can remove the `./node_modules/.bin/` prefix.

    The `certlogic-js` validator tool does not have or use any knowledge about the shape of the data the given CertLogic expression is executed against.
    (That will be addressed later on.)


## Using CertLogic as dependency

### NPM

The `certlogic-js` [NPM](https://www.npmjs.com/) package can be installed using the CLI command

    $ npm add certlogic-js

NPM is the package manager shipped by default with [Node.js](https://nodejs.org/).
Its alternative is [yarn](https://yarnpkg.com/).


### Gradle

The following `build.gradle` Gradle build script fragment sets up the dependency on the `certlogic-kotlin` module:

```groovy
dependencies {
    implementation project(':decoder')
    implementation 'eu.ehn.dcc.certlogic:certlogic-kotlin:0.7.7-SNAPSHOT'
    // …
}
```

This assumes that Gradle knows about local installations of modules.
You can achieve that through a project root-level `build.gradle` that looks as follows:

```groovy
buildscript {
    repositories {
        google()
        mavenCentral()
        mavenLocal()
    }
    dependencies {
        classpath Deps.tools_gradle_android
        classpath Deps.tools_kotlin
        classpath Deps.androidx_navigation
        classpath Deps.hilt_plugin
        classpath Deps.google_licenses_plugin
    }
}
allprojects {
    repositories {
        google()
        mavenCentral()
        mavenLocal()
    }
}
```


### Maven

The following XML fragment specifies the dependencies in a `pom.xml` when using Maven:

```XML
<dependencies>
    <dependency>
        <groupId>eu.ehn.dcc.certlogic</groupId>
        <artifactId>certlogic-kotlin</artifactId>
        <version>0.7.7-SNAPSHOT</version>
    </dependency>
</dependencies>
```

For now, this assumes that this module has been `mvn install`-ed to the local Maven repository (usually physically located in `~/.m2`).
When the Kotlin Certlogic module is available on Maven Central, `0.7.7-SNAPSHOT` (or whatever snapshot version number is mentioned) should be replaced with non-snapshot version numbers.

