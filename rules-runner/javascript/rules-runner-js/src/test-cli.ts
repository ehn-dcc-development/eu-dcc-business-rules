import * as Mocha from "mocha"

new Mocha()
    .addFile("dist/test-runner.js")
    .run(console.dir)

