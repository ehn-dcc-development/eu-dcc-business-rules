/**
 * An interface type for reporting validation errors on (sub) expressions.
 */
export interface ValidationError {
    /**
     * A (sub) expression, which isn't necessarily a CertLogic expression because of validation errors.
     */
    expr: any
    /**
     * An error message explaining what's wrong with the {@link expr}.
     */
    message: string
}
