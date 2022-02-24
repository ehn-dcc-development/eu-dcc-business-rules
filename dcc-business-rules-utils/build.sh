#!/usr/bin/env sh

set -e

rm -rf dist/
rm -rf node_modules/
npm install

rm yarn.lock  # (For some reason, running yarn with an existing Yarn lock file often seems to error on this repo.)
yarn

echo "Downloading JSON Schema for rules..."
curl --silent https://raw.githubusercontent.com/eu-digital-green-certificates/dgc-gateway/main/src/main/resources/validation-rule.schema.json > src/validation-rule.schema.json

npm run build
cp src/validation-rule.schema.json dist/

npm test

# check for circular dependencies, and exit in case one's present:
npx dpdm dist/ --circular --exit-code circular:1

