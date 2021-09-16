import { desugar } from "./desugar"
import { isCertLogicExpression } from "../typings"


process.stdin.resume()
process.stdin.setEncoding("utf-8")

let exprAsText = ""

process.stdin.on("data", (inputStdin) => {
    exprAsText += inputStdin
})

process.stdin.on("end", (_: any) => {
    try {
        const expr = JSON.parse(exprAsText)
        const desugaredExpr = desugar(expr)
        if (!isCertLogicExpression(desugaredExpr)) {
            console.warn("desugared expression is (still) not a valid CertLogic expression")
        }
        console.log(JSON.stringify(desugaredExpr, null, 2))
    } catch (e: any) {
        console.error(`could not parse JSON: ${e.message}`)
    }
})

