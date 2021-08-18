import * as React from "react"

import { CertLogicExpression, isInt } from "certlogic-js"


/**
 * A stateless React component that renders a CertLogic expression in a notation that's more compact than the underlying JSON.
 * The resulting DOM is static, so can be statically rendered.
 */
export const CompactExprRendering = ({ expr }: { expr: CertLogicExpression }) => {
    if (typeof expr === "string") {
        return <span className="simple-value">{expr}</span>
    }
    if (isInt(expr)) {
        return <span className="simple-value">{expr}</span>
    }
    if (typeof expr === "boolean") {
        return <span className="simple-value">{expr ? "true" : "false"}</span>
    }
    if (Array.isArray(expr)) {
        return <div className="array">
            <span className="keyword push-right">[</span>
            {(expr as CertLogicExpression[]).map((subExpr, index) =>
                <div className="inline" key={index}>
                    {index > 0 && <span className="push-right">,</span>}
                    <CompactExprRendering expr={subExpr} key={index} />
                </div>
            )}
            <span className="keyword push-left">]</span>
        </div>
    }
    if (typeof expr === "object") {
        const keys = Object.keys(expr)
        const operator = keys[0]
        const values = (expr as any)[operator]
        switch (operator) {
            case "var": {
                return <div className="operation">
                    <span className="keyword">/</span><span className="path">{values}</span>
                </div>
            }
            case "if": {
                const [ guard, then, else_ ] = values
                return <div className="operation">
                    <span className="keyword push-both">if</span>
                    <CompactExprRendering expr={guard} />
                    <span className="keyword push-both">then</span>
                    <CompactExprRendering expr={then} />
                    <span className="keyword push-both">else</span>
                    <CompactExprRendering expr={else_} />
                </div>
            }
            case "and": {
                if (values.length === 2) {
                    return <div className="operation">
                        <CompactExprRendering expr={values[0]} />
                        <span className="keyword push-both">and</span>
                        <CompactExprRendering expr={values[1]} />
                    </div>
                }
                return <div className="operation">
                    <span className="variadic-operator">and</span>
                    <div className="indent">
                        {values.map((subExpr: CertLogicExpression, index: number) => <div key={index}><CompactExprRendering expr={subExpr} /></div>)}
                    </div>
                </div>
            }
            case "===":
            case ">":
            case "<":
            case ">=":
            case "<=":
            case "after":
            case "before":
            case "not-after":
            case "not-before":
            case "+":
            case "in": {
                return <div className="operation">
                    <CompactExprRendering expr={values[0]} />
                    <span className="keyword push-both">{operator}</span>{/* TODO  prettify operator */}
                    <CompactExprRendering expr={values[1]} />
                </div>
            }
            case "!": {
                return <div className="operation">
                    <span className="keyword push-right">!</span>
                    <CompactExprRendering expr={values[0]} />
                </div>
            }
            case "plusTime": {
                const [ operand, amount, unit ] = values
                return <div className="operation">
                    <CompactExprRendering expr={operand} />
                    {amount >= 0 && <span className="keyword push-both">+</span>}
                    <span className="simple-value">{amount}</span>
                    <span className="push-left keyword">{unit + (amount === 1 ? "" : "s")}</span>
                </div>
            }
            case "reduce": {
                return <div className="operation">
                    <CompactExprRendering expr={values[0]} />
                    <span className="keyword">.reduce(</span><span className="signature push-right">(accumulator, current) &rarr;</span>
                    <CompactExprRendering expr={values[1]} />
                    <span className="keyword push-right">,</span>
                    <span className="signature push-right">initial:</span>
                    <CompactExprRendering expr={values[2]} />
                    <span className="keyword">)</span>
                </div>
            }
            case "extractFromUVCI": {
                return <div className="operation">
                    <CompactExprRendering expr={values[0]} />
                    <span className="keyword">.extractFromUVCI(#</span>
                    <span className="simple-value">{values[1]}</span>
                    <span className="keyword">)</span>
                </div>
            }
        }
    }
    return <span className="error">no rendering defined (yet) for: {JSON.stringify(expr)}</span>
}

