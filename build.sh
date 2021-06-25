#!/usr/bin/env sh

(cd certlogic ; sh build.sh)

(cd rules-runner ; sh build.sh)

(cd rulesets ; sh run-tests.sh)

