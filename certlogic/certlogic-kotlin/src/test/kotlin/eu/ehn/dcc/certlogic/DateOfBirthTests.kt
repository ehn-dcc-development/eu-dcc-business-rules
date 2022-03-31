package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

/**
 * Should be in sync with `describe("dccDateOfBirth", ...`-part of `test-internals.ts` from `certlogic-js`.
 */
internal class DateOfBirthTests {

    private fun check(dob: String, expected: String) {
        assertEquals(expected, JsonDateTime.dccDateOfBirth(dob).asText())
    }

    @Test
    fun `works for YYYY`() {
        check("2004", "2004-12-31T00:00:00.000Z")
        check("2021", "2021-12-31T00:00:00.000Z")
    }

    @Test
    fun `works for YYYY-MM`() {
        check("2004-01", "2004-01-31T00:00:00.000Z")
        check("2004-02", "2004-02-29T00:00:00.000Z")
        check("2003-02", "2003-02-28T00:00:00.000Z")
        check("2004-03", "2004-03-31T00:00:00.000Z")
        check("2004-04", "2004-04-30T00:00:00.000Z")
        check("2004-05", "2004-05-31T00:00:00.000Z")
        check("2004-06", "2004-06-30T00:00:00.000Z")
        check("2004-07", "2004-07-31T00:00:00.000Z")
        check("2004-08", "2004-08-31T00:00:00.000Z")
        check("2004-09", "2004-09-30T00:00:00.000Z")
        check("2004-10", "2004-10-31T00:00:00.000Z")
        check("2004-11", "2004-11-30T00:00:00.000Z")
        check("2004-12", "2004-12-31T00:00:00.000Z")
    }

    @Test
    fun `works for YYYY-MM-DD`() {
        check("2021-05-04", "2021-05-04T00:00:00.000Z")
    }

}
