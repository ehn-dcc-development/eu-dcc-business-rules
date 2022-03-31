package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

/**
 * Should be in sync with `describe("plusTime", ...`-part of `test-internals.ts` from `certlogic-js`,
 * except for the `it("yields comparable values"`-part of that which is already covered by the test suite.
 */
internal class PlusTimeTests {

    private fun check(dateTimeLike: String, amount: Int, unit: TimeUnit, expected: String) {
        assertEquals(expected, JsonDateTime.fromString(dateTimeLike).plusTime(amount, unit).asText())
    }

    @Test
    fun `works for 1-day offsets`() {
        check("2021-06-23", 1, TimeUnit.day, "2021-06-24T00:00:00.000Z")
        check("2021-06-23", -1, TimeUnit.day, "2021-06-22T00:00:00.000Z")
    }

    @Test
    fun `works for 1-hour offsets`() {
        check("2021-06-23T00:00:00.000Z", 1, TimeUnit.hour, "2021-06-23T01:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", -1, TimeUnit.hour, "2021-06-22T23:00:00.000Z")
    }

    @Test
    fun `works for day-offsets in hours`() {
        check("2021-06-23T00:00:00.000Z", 24, TimeUnit.hour, "2021-06-24T00:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", 48, TimeUnit.hour, "2021-06-25T00:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", 72, TimeUnit.hour, "2021-06-26T00:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", -24, TimeUnit.hour, "2021-06-22T00:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", -48, TimeUnit.hour, "2021-06-21T00:00:00.000Z")
        check("2021-06-23T00:00:00.000Z", -72, TimeUnit.hour, "2021-06-20T00:00:00.000Z")
    }

    @Test
    fun `not affected by DST transitions`() {
        check("2021-06-23", -180, TimeUnit.day, "2020-12-25T00:00:00.000Z")
    }

    @Test
    fun `works for month offsets`() {
        check("2021-02-01T00:00:00.000Z", 0, TimeUnit.month, "2021-02-01T00:00:00.000Z")
        check("2021-02-01T00:00:00.000Z", 1, TimeUnit.month, "2021-03-01T00:00:00.000Z")
        check("2021-12-01T00:00:00.000Z", 1, TimeUnit.month, "2022-01-01T00:00:00.000Z")
        check("2021-12-01T00:00:00.000Z", -12, TimeUnit.month, "2020-12-01T00:00:00.000Z")
    }

    @Test
    fun `works for year offsets`() {
        check("2021-02-01T00:00:00.000Z", 0, TimeUnit.year, "2021-02-01T00:00:00.000Z")
        check("2021-07-01T00:00:00.000Z", 1, TimeUnit.year, "2022-07-01T00:00:00.000Z")
        check("2021-10-01T00:00:00.000Z", -1, TimeUnit.year, "2020-10-01T00:00:00.000Z")
        check("2021-12-01T00:00:00.000Z", 2, TimeUnit.year, "2023-12-01T00:00:00.000Z")
        check("2004-02-28T00:00:00.000Z", -2, TimeUnit.year, "2002-02-28T00:00:00.000Z")
        check("2004-02-28T00:00:00.000Z", 18, TimeUnit.year, "2022-02-28T00:00:00.000Z")
        check("2004-02-28T00:00:00.000Z", -18, TimeUnit.year, "1986-02-28T00:00:00.000Z")
    }

    @Test
    fun `works for leap days`() {
        check("2020-02-29", 1, TimeUnit.day, "2020-03-01T00:00:00.000Z")
        check("2020-03-01", -1, TimeUnit.day, "2020-02-29T00:00:00.000Z")
        check("2020-02-29", 1, TimeUnit.month, "2020-03-29T00:00:00.000Z")
        check("2020-03-29", -1, TimeUnit.month, "2020-02-29T00:00:00.000Z")
        check("2020-02-29", 1, TimeUnit.year, "2021-03-01T00:00:00.000Z")
        check("2021-03-01", -1, TimeUnit.year, "2020-03-01T00:00:00.000Z")
        check("2020-02-29", -1, TimeUnit.year, "2019-03-01T00:00:00.000Z")
        check("2020-02-29", 4, TimeUnit.year, "2024-02-29T00:00:00.000Z")
        check("2020-02-29", -4, TimeUnit.year, "2016-02-29T00:00:00.000Z")
        check("2004-02-29", 18, TimeUnit.year, "2022-03-01T00:00:00.000Z")
        check("2004-02-29", -18, TimeUnit.year, "1986-03-01T00:00:00.000Z")
        check("2004-02-29", -2, TimeUnit.year, "2002-03-01T00:00:00.000Z")
    }

}
