#!/usr/bin/env sh

set -e

npm run clean
npm install
npm test  # also builds the source

# check for circular dependencies, and exit in case one's present:
npx dpdm dist/ --circular --exit-code circular:1
# Don't use npm run check-deps to avoid re-transpiling the source (and missing the exit code).

