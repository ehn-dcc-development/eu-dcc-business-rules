#!/usr/bin/env sh

# TODO  check whether ../../ehn-dcc-valuesets/*.json exists, and is non-empty
# TODO  check whether jq is installed
VALUESETS_PATH=../../../ehn-dcc-valuesets
if [ -d "$VALUESETS_PATH" ]
then
  jq --slurp 'map( { (.valueSetId): .valueSetValues|keys }) | add' $VALUESETS_PATH/*.json > valueSets.json
else
  echo "expected $VALUESETS_PATH to exist"
fi
