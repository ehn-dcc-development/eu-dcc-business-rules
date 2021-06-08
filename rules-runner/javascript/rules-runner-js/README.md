# JavaScript rules runner

This NPM package exposes functionality to

1. Run rule (sets) programmatically
2. Run rule sets from CLI
3. Run tests from CLI

A rule set is a JSON file that adheres to [this JSON Schema](../../resources/schemas/RuleSet.json).


## Run rule (sets) programmatically

The NPM package exposes two functions: `runRule` and `runRuleSet`.
Both take a second parameter of the following form:

```
{
    payload: <DCC payload>,
    external: {
        valueSets: <value sets>,
        // any other parameters, such as "validationClock"
    }
}
```


## Run rule sets from CLI

The `run-rule-set` script placed in NPM's `.bin` takes 4 parameters, which are paths to JSON files containing (in this order):

1. the rule set
2. the value sets
3. the DCC payload
4. the external parameters but *not* containing the value sets


## Run tests from CLI

The `test-rule-set` script  placed in NPM's `.bin` takes 3 _named_ parameters of the form `--<name>=<value>`, which are paths to the following:

* `rule-set`: a path to a JSON file containing the rule set
* `value-sets`: a path to a JSON file containing the value sets
* `tests`:  a path to a directory containing the tests

