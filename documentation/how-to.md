# How-To

We explain how to implement business/validation/verification rules on top of the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en).
From now on, we'll drop the adjectives, and stick to _“rule”_.

A **rule** in the context of the DCC consists mainly of a logical expression with an outcome `true` or `false` that operates on a specific data structure.
This data structure can be rendered in JSON format as follows:

```json
{
  "payload": <the DCC JSON payload>,
  "external": {
    "valueSets": <the “compressed” value sets>,
    // ...<all other external parameters>
  }
}
```

An outcome `true` indicates that the rule _“passes”_, an outcome `false` is grounds for denying fit-for-travel status.
Rules are executed by a _rule engine_.

A rule may also come to contain the following metadata:

* Validity range: valid from a certain date(-time), until (exclusive) a certain date(-time).
    Either end of a validity range may be undefined, meaning since/until forever, resp.

* Human-readable messages explaining (both) the outcomes.


## Writing rule expressions

The logical expression of a rule is written in a JSON format called **CertLogic**.
This is a subset of the [JsonLogic](https://jsonlogic.com/) format, a relatively well-known format/framework for expressing business logic on structured data, restricted to and expanded with what's needed for DCC-rules.
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

        $ ./node_modules/bin/certlogic-validate 

    This works from the directory where you installed `certlogic-validation`.
    Alternatively, you can use `npx` (when installed, and when `certlogic-validation` is available in the NPM Registry) to directly execute it.
    Inside NPM `scripts`, you can drop the `./node_modules/.bin/` prefix.

* The `certlogic-validation` tool does not have or use any knowledge about the shape of the data the given CertLogic expression is validated against.
    That will be addressed the later on.


## Writing rule sets

A **rule set** is a set of rules for a certain legislative region, such as an EU member state, or the EU as a whole.

A rule set is written in a JSON format that relies on CertLogic.
Its [JSON Schema](../rules-runner/resources/schemas/RuleSet.json) can help with authoring a JSON file containing a rule set.


## Running rules

Rule sets can be run using _rules runners_ for JavaScript and for Kotlin/Java.
These rules runners rely on a CertLogic rule engine, written in the same languages (respectively).
They can be found [here](../rules-runner/README.md).

**TODO**  explanation of how to hook up the runners

