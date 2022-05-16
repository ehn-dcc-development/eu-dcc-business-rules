package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.time.format.DateTimeParseException
import kotlin.test.assertEquals

/**
 * Should be in sync with the `describe("parsing of dates/date-times", ...`-part of `test-internals.ts` from `certlogic-js`.
 */
internal class JsonDateTimeTests {

    private fun check(dateTimeLike: String, expected: String, message: String? = null) {
        assertEquals(expected, JsonDateTime.fromString(dateTimeLike).asText(), message)
    }

    @Test
    fun `construct a date from a string without time information (compliant with a JSON Schema "date" formatted string)`() {
        check("2021-05-04", "2021-05-04T00:00:00.000Z")
    }

    @Test
    fun `construct date-times from strings in RFC 3339 format (compliant with a JSON Schema "date-time" formatted string)`() {
        check("2021-05-04T13:37:42Z", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42+00:00", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42-00:00", "2021-05-04T13:37:42.000Z")
        check("2021-08-20T12:03:12+02:00", "2021-08-20T12:03:12.000+02:00")     // (keeps timezone offset)
    }

    @Test
    fun `construct date-times from strings in non-RFC 3339 but ISO 8601 formats`() {
        check("2021-08-20T12:03:12+02", "2021-08-20T12:03:12.000+02:00")
        check("2021-05-04T13:37:42+0000", "2021-05-04T13:37:42.000Z")
        check("2021-05-04T13:37:42-0000", "2021-05-04T13:37:42.000Z")
        check("2021-08-20T12:03:12+0200", "2021-08-20T12:03:12.000+02:00")
    }

    @Test
    fun `construct date-times from strings which also have millisecond info`() {
        check("2021-08-01T00:00:00.1Z", "2021-08-01T00:00:00.100Z")       // 100 ms
        check("2021-08-01T00:00:00.01Z", "2021-08-01T00:00:00.010Z")      //  10 ms
        check("2021-08-01T00:00:00.001Z", "2021-08-01T00:00:00.001Z")     //   1 ms
        check("2021-08-01T00:00:00.0001Z", "2021-08-01T00:00:00.000Z")    // 100 µs
        check("2021-08-01T00:00:00.00001Z", "2021-08-01T00:00:00.000Z")   //  10 µs
        check("2021-08-01T00:00:00.000001Z", "2021-08-01T00:00:00.000Z")  //   1 µs
    }

    @Test
    fun `construct date-times from strings which lack a timezone offset`() {
        check("2021-08-01", "2021-08-01T00:00:00.000Z")
        check("2021-08-01T00:00:00", "2021-08-01T00:00:00.000Z")
    }

    @Test
    fun `construct date-times from strings which have a "short" timezone offset`() {
        check("2021-08-01T00:00:00+1:00", "2021-08-01T00:00:00.000+01:00")
        // java.time.OffsetDateTime keeps the timezone offset, and doesn't normalise to `Z`
    }

    @Test
    fun `should work for some samples from the QA test data`() {
        check("2021-05-20T12:34:56+00:00", "2021-05-20T12:34:56.000Z", "SI")
        check("2021-06-29T14:02:07Z", "2021-06-29T14:02:07.000Z", "BE")
    }

    @Test
    fun `should work for partial dates and empty strings`() {
        fun shouldFail(str: String) {
            val exception = assertThrows<DateTimeParseException> {
                JsonDateTime.fromString(str)
            }
            assertEquals("not an allowed date or date-time format: $str", exception.message)
        }
        shouldFail("")
        /*
         * Note: YYYY and YYYY-MM are supported (since specification version 1.3.2) by #fromString.
         * This is necessary, because of how `plusTime` is invoked from the evaluator, as
         *
         *    JsonDateTime.fromString(<operand's value>).plusTime(<amount>, <unit>)
         *
         * Other implementations have an “atomic” `plusTime` operation, which parses and offsets at the same time.
         * Such implementations should check whether inputs such as `"1997"`, and `"1997-04"` fail, but not here.
         */
    }

}
