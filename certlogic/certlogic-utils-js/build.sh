#!/usr/bin/env sh

set -e

npm run clean
npm install
npm dedupe # also deduplicate dependencies
npm run build
npm test

# check for circular dependencies, and exit in case one's present:
npm run check-deps

