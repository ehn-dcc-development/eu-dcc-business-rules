package eu.ehn.dcc.certlogic

import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class JsonDateTimeTests {

    @Test
    fun `construct a date from a string without time information (compliant with a JSON Schema "date" formatted string)`() {
        assertEquals("2021-05-04T00:00:00Z", JsonDateTime.fromString("2021-05-04").asText())
    }

    @Test
    fun `construct date-times from strings in RFC 3339 format (compliant with a JSON Schema "date-time" formatted string)`() {
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromString("2021-05-04T13:37:42Z").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromString("2021-05-04T13:37:42+00:00").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromString("2021-05-04T13:37:42-00:00").asText())
        assertEquals("2021-08-20T12:03:12+02:00", JsonDateTime.fromString("2021-08-20T12:03:12+02:00").asText())   // (keeps timezone offset)
    }

    @Test
    fun `construct date-times from strings in non-RFC 3339 but ISO 8601 formats`() {
        assertEquals("2021-08-20T12:03:12+02:00", JsonDateTime.fromString("2021-08-20T12:03:12+02").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromString("2021-05-04T13:37:42+0000").asText())
        assertEquals("2021-05-04T13:37:42Z", JsonDateTime.fromString("2021-05-04T13:37:42-0000").asText())
        assertEquals("2021-08-20T12:03:12+02:00", JsonDateTime.fromString("2021-08-20T12:03:12+0200").asText())
    }

}
