import { applyLogic, extendJsonLogic } from "../extend-JsonLogic"
import { runTestsWith } from "./test-suites"

extendJsonLogic()

runTestsWith(applyLogic)

