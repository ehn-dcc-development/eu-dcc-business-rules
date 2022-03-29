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
        check("2004", "2005-01-01T00:00:00.000Z")
        check("2021", "2022-01-01T00:00:00.000Z")
    }

    @Test
    fun `works for YYYY-MM`() {
        check("2004-01", "2004-02-01T00:00:00.000Z")
        check("2004-02", "2004-03-01T00:00:00.000Z")
        check("2003-02", "2003-03-01T00:00:00.000Z")
        check("2004-03", "2004-04-01T00:00:00.000Z")
        check("2004-04", "2004-05-01T00:00:00.000Z")
        check("2004-05", "2004-06-01T00:00:00.000Z")
        check("2004-06", "2004-07-01T00:00:00.000Z")
        check("2004-07", "2004-08-01T00:00:00.000Z")
        check("2004-08", "2004-09-01T00:00:00.000Z")
        check("2004-09", "2004-10-01T00:00:00.000Z")
        check("2004-10", "2004-11-01T00:00:00.000Z")
        check("2004-11", "2004-12-01T00:00:00.000Z")
        check("2004-12", "2005-01-01T00:00:00.000Z")
    }

    @Test
    fun `works for YYYY-MM-DD`() {
        check("2021-05-04", "2021-05-04T00:00:00.000Z")
    }

}
