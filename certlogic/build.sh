#!/usr/bin/env sh

(cd specification ; sh check-jsons.sh)

sh build-js.sh

(cd certlogic-kotlin ; mvn clean install)

(cd certlogic-dart ; dart test)

