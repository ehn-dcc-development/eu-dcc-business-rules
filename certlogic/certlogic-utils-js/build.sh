#!/usr/bin/env sh

set -e

npm run clean
npm install
npm dedupe    # also deduplicate dependencies
npm run build
# generate “extended” operations types from a specification:
node dist/partial-evaluator/meta/operations-generator.js
npm test

# check for circular dependencies, and exit in case one's present:
npm run check-deps

