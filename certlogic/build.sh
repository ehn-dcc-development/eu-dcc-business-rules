#!/usr/bin/env sh

./build-js.sh

cd certlogic-kotlin
mvn clean install
cd ..

