#!/usr/bin/env sh

cd certlogic
./build.sh
cd ..

cd rules-runner
./build.sh
cd ..

cd rulesets
./run-tests.sh
cd ..

