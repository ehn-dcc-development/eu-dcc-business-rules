#!/usr/bin/env sh

sh build-js.sh

(cd certlogic-kotlin ; mvn clean install)

