package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

/**
 * Should be in sync with `validation/test-data-accesses.ts` from `certlogic-js`.
 */
internal class DataAccessesTests {

    @Test
    fun `should produce correct context (1)`() {
        val expr = makeVar("ci")
        assertEquals(
            mapOf("ci" to jsonArray(expr)).toString(),
            dataAccessesWithContext(expr).toString()
        )
    }

    @Test
    fun `should produce correct context (2)`() {
        val expr = jsonObject("extractFromUVCI" to jsonArray(makeVar("ci"), 1.asJson()))
        println(dataAccessesWithContext(expr))
        assertEquals(
            mapOf("ci" to jsonArray(expr)).toString(),
            dataAccessesWithContext(expr).toString()
        )
    }

}

