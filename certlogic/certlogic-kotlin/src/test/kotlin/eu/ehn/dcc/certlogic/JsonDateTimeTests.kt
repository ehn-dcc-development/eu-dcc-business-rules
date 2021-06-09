package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Test
import java.time.format.DateTimeParseException
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class JsonDateTimeTests {

    @Test
    fun `date without time information (compliant with a JSON Schema "date" formatted string)`() {
        assertEquals("2021-05-04T00:00:00Z", JsonDateTime.fromIso8601date("2021-05-04").asText())
    }

    @Test
    fun `construct datetimes in RFC 3339 format (compliant with a JSON Schema "date-time" formatted string)`() {
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromRfc3339dateTime("2021-05-04T13:37:42Z").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromRfc3339dateTime("2021-05-04T13:37:42+00:00").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromRfc3339dateTime("2021-05-04T13:37:42-00:00").asText())
        assertEquals("2021-08-20T12:03:12+02:00", JsonDateTime.fromRfc3339dateTime("2021-08-20T12:03:12+02:00").asText())   // (keeps timezone offset)
    }

    @Test
    fun `try to construct datetimes in non-RFC 3339 but ISO 8601 formats`() {
        // fails:
        assertFailsWith(DateTimeParseException::class) { JsonDateTime.fromRfc3339dateTime("2021-05-04T13:37:42+0000") }
        assertFailsWith(DateTimeParseException::class) { JsonDateTime.fromRfc3339dateTime("2021-05-04T13:37:42-0000") }
        assertFailsWith(DateTimeParseException::class) { JsonDateTime.fromRfc3339dateTime("2021-08-20T12:03:12+0200") }
        // succeeds, even though not compliant with RFC 3339:
        assertEquals("2021-08-20T12:03:12+02:00", JsonDateTime.fromRfc3339dateTime("2021-08-20T12:03:12+02").asText())
    }

}
