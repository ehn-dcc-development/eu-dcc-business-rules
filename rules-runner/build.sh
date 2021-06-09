#!/usr/bin/env sh

cd resources
./prepare-valueSetsJson.sh
cd ..

cd javascript/rules-runner-js
./build.sh
cd ../..

cd rules-runner-kotlin
mvn clean install
cd ..

