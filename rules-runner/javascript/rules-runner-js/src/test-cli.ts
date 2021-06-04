import * as Mocha from "mocha"

new Mocha()
    .addFile("dist/test-runner.js")
    .run((nFailures) => {
        console.log(`(${nFailures} failures)`)
    })

