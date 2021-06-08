#!/usr/bin/env sh

cd certlogic-js
./build.sh
cd ..

cd certlogic-kotlin
mvn clean install
cd ..

cd certlogic-validation
./build.sh
cd ..

