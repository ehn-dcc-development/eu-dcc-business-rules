import * as Mocha from "mocha"

new Mocha()
    .addFile("dist/test-runner.js")
    .run((nFailures) => {
        console.log(`(${nFailures} failures)`)
        if (nFailures > 0) {
            process.exit(1)
        }
    })

