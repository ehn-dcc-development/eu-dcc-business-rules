# TODO  check whether ../../ehn-dgc-schema/valuesets/*.json exists, and is non-empty
VALUESETS_PATH=../../../ehn-dgc-schema/valuesets
if [[ -d "$VALUESETS_PATH" ]]
then
  jq --slurp 'map( { (.valueSetId): .valueSetValues|keys }) | add' $VALUESETS_PATH/*.json > valueSets.json
else
  echo "expected $VALUESETS_PATH to exist"
fi
