# How-To

We explain how to implement business/validation/verification rules on top of the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en).
From now on, we'll drop the adjectives, and stick to _“rule”_.


## Concepts

A **rule** in the context of the DCC consists mainly of a logical expression with an outcome `true` or `false` that operates on a specific data structure.
Rules are executed by a _rule engine_.
An outcome `true` of a rule's execution/evaluation indicates that the rule _“passes”_, while an outcome `false` is grounds for denying fit-for-travel status.

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

The “compressed” value sets are derived from the [value sets in the DCC Schema repo](https://github.com/ehn-dcc-development/ehn-dcc-schema/tree/main/valuesets).
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
For more information about CertLogic: read its [specification](../certlogic/specification.md).
(For more information on the reasoning behind this setup: see the [design choices document](./design-choices.md).)

Although CertLogic is a fairly easy format, some help with authoring rule expressions is desirable.
The following things can be helpful:

* Validate a CertLogic expression in JSON using the [CertLogic JSON Schema](../certlogic/schemas/CertLogic-expression.json).
    Many IDEs (such as IntelliJ/IDEA) provide the possibility to configure schema mappings: a mapping from a specific JSON Schema file to specific JSON files (or directories containing those).
    This has the effect that the IDE validates JSON files in the mapping on-the-fly, and provides content assist(/“Intellisense”), etc.

* The CertLogic specification is stricter than what can be expressed in a JSON Schema.
    To validate a CertLogic expression against the specification, the [`certlogic-validation`](../certlogic/certlogic-validation) can be used.
    This is an NPM package that can be installed using the CLI command

        $ npm add <relative path to>/certlogic-validation

    (The `$` represents the CLI prompt.)
    This commands takes one CLI argument: a path to a JSON file containing a CertLogic expression.
    It will print a list of validation errors to `stdout` - if that's empty, the CertLogic expression is correct.

    It requires [NPM](https://www.npmjs.com/) ([Node.js](https://nodejs.org/)'s package manager) or its alternative [yarn](https://yarnpkg.com/).
    For the moment, this tool has to be installed from this GitHub repository, using a relative path.

    The tool exposes an executable `certlogic-validate`, which can be run from the CLI as follows:

        $ npx certlogic-validate <path to JSON file containing a single CertLogic expression>

    or as

        $ ./node_modules/.bin/certlogic-validate <path to JSON file containing a single CertLogic expression>

    This works from the directory where you installed `certlogic-validation`.
    Alternatively, you can use `npx` (when installed, and when `certlogic-validation` is available in the NPM Registry) to directly execute it.
    Inside NPM `scripts`, you can remove the `./node_modules/.bin/` prefix.

* The `certlogic-validation` tool does not have or use any knowledge about the shape of the data the given CertLogic expression is validated against.
    That will be addressed later on.


## Writing a rule set

A **rule set** is a set of rules for a certain legislative region, such as an EU Member State, or the EU as a whole.
The EU-template rule set can be found [here](../rulesets/EU/template-ruleset.json).

A rule set is written in a JSON format that relies on CertLogic.
Its [RuleSet JSON Schema](../rules-runner/resources/schemas/RuleSet.json) can help with authoring a JSON file containing a rule set.

_Note:_ this schema is expected to change in the near future.
The various components (rules runners, validators) should reflect those changes.


## Testing rules

Any rule should come with automated tests that exercise it.
Such tests corroborate the rule writer's intention, but can also be used to check the validity of the execution of the same rule by different rules engines.
That's particularly helpful with implementors of verifier apps having free choice in what rules engine to use.

The `rules-runner-js` NPM package exposes a CLI command `test-rule-set` to test the rules in a rule set on a per-rule basis.
The usage of this CLI command is as follows:

    $ ./node_modules/.bin/test-rule-set --rule-set=<path to JSON file with rule set> --value-sets=<path to JSON with value sets> --tests=<path to directory with rule tests>

Tests for a rule reside in a JSON file with file name equal to the rule's ID, and which conforms [the RuleTests JSON Schema](../rules-runner/resources/schemas/RuleTests.json).
The `test-rule-set` command tries to load the rule set, and value sets JSON files, and all JSON files in the indicated `tests` directory.
It then runs all rules' tests, checking whether the rule evaluates without erroring on each test, and matches the expected outcome.
`test-rule-set` also checks whether the test files are in 1-to-1 correspondence to the rules in the rule set, reporting when a rule does not have a corresponding test file, and vice versa.

To test this functionality you can run the script `run-tests.sh`, which tests all rule sets present against their (respective) tests.

    $ (rulesets) ./run-tests.sh


## Running rules (or a rule set)

Rule sets can be run using _rules runners_ for JavaScript and for Kotlin/Java.
These rules runners rely on a CertLogic rule engine, written in the same languages (respectively).
All rules runners can be found [here](../rules-runner/README.md).


### Running rules in JavaScript

The `rules-runner-js` NPM package exposes (among other things) the `runRule` and `runRuleSet` functions, and the `run-rule-set` and `test-rule-set` CLI commands.
Install this package from the CLI, as follows:

    $ npm add <relative path to>/rules-runner-js

(The relative path is needed as long as this package didn't land in the NPM Registry.)

You should most likely only use the `runRuleSet` function, as follows:

```typescript
import { runRuleSet } from "rules-runner-js"

runRuleSet(<JSON of a rule set>, <data context>)
```

You have to take care yourself of reading a JSON file containing the rule set, and assembling a data context.
Also make sure to have a look at the [TypeScript typings involved](../rules-runner/javascript/rules-runner-js/src/typings.ts).

You can also run rules directly from the CLI, as follows:

    $ ./node_modules/.bin/run-rule-set <#1: rule set> <#2: value sets> <#3: DCC payload> <#4: extra parameters>

These CLI arguments are positional, and represent paths to JSON files with the indicated role.
This CLI command will output the evaluation result of the rule set to `stdout`.

Running rules like this is *not* recommended for actual use: the main use of this method is for learning and testing purposes.


### Running rules in Kotlin

To be able to use the `rules-runner-kotlin` Maven/Kotlin module, you must build it and (first) its dependency `certlogic-kotlin`.
You can do that either by running the [central build script](../build.sh), or by running

    $ mvn install

directly in in the roots of those modules.

The `rules-runner-Kotlin` Maven/Kotlin module exposes the `Rule.runRule` and `RuleSet.runRuleSet` extension methods in the package `eu.ehn.dcc.rulesets`.
The latter can be used as follows:

```kotlin
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.JsonNodeFactory
import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import java.io.File

val objectMapper = jacksonObjectMapper().also {
    it.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
}

inline fun <reified T> readJson(file: File): T = objectMapper.readValue(file)


val ruleSet = readJson<RuleSet>(File(<path to JSON file with rule set>))
val data = JsonNodeFactory.instance.objectNode()
    .set<ObjectNode>("payload", payload)
        .set<ObjectNode>("external", JsonNodeFactory.instance.objectNode()
            .set<ObjectNode>("valueSets", valueSets)
            .put("validationClock", validationClock)
        )

runRuleSet(ruleSet, data)
```

Feel free to replace the use of `java.io.File` with an alternative more suitable in the context of e.g. Android.


#### Gradle

The following `build.gradle` Gradle build script fragment sets up the dependencies on `rules-runner-kotlin` and `certlogic-kotlin`:

```groovy
dependencies {
    implementation project(':decoder')
    implementation 'eu.ehn.dcc.certlogic:certlogic-kotlin:0.7.7-SNAPSHOT'
    implementation 'eu.ehn.dcc:rules-runner-kotlin:0.5.0-SNAPSHOT'
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


#### Maven

The following XML fragment specifies the dependencies in a `pom.xml` when using Maven:

```XML
<dependencies>
    <dependency>
        <groupId>eu.ehn.dcc.certlogic</groupId>
        <artifactId>certlogic-kotlin</artifactId>
        <version>0.7.7-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>eu.ehn.dcc</groupId>
        <artifactId>rules-runner-kotlin</artifactId>
        <version>0.7.7-SNAPSHOT</version>
    </dependency>
</dependencies>
```

For now, this assumes that both modules have been `mvn install`-ed to the local Maven repository (usually physically located in `~/.m2`).
When the Kotlin Certlogic and rules-runner modules are available on Maven Central, `0.7.7-SNAPSHOT` (or whatever snapshot version number is mentioned) should be replaced with non-snapshot version numbers.

