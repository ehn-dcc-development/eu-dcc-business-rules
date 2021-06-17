cd ../rules-runner/javascript/rules-runner-js
RULESETS=../../../rulesets
VALUESETS_JSON=../../resources/valueSets.json
RUN_CMD="node dist/test-cli.js"

EU_RULESET=$RULESETS/EU
$RUN_CMD --rule-set=$EU_RULESET/template-ruleset.json --tests=$EU_RULESET/tests --value-sets=$VALUESETS_JSON

NL_RULESET=$RULESETS/NL
$RUN_CMD --rule-set=$NL_RULESET/NL-specific-ruleset.json --tests=$NL_RULESET/tests --value-sets=$VALUESETS_JSON

