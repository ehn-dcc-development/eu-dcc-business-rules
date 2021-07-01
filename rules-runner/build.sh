#!/usr/bin/env sh

(cd javascript/rules-runner-js && sh build.sh)

(cd rules-runner-kotlin && mvn clean install)

