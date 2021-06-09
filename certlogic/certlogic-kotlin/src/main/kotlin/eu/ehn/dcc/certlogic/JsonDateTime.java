package eu.ehn.dcc.certlogic;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.node.JsonNodeType;
import com.fasterxml.jackson.databind.node.ValueNode;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * A class to represent date-time's with as a {@link com.fasterxml.jackson.databind.JsonNode JSON value}.
 * All date-time's are represented internally as an {@link OffsetDateTime}.
 * Dates are converted to date-time's by assuming midnight Zulu-time (UTC+0).
 */
public class JsonDateTime extends ValueNode implements Comparable<JsonDateTime> {

    private static final long serialVersionUID = 1L;

    private final OffsetDateTime _value;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    /**
     * @param dateTimeString a string with a date-time <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6">compliant with RFC3339</a>
     * @return a {@link JsonDateTime JSON date-time} of the given date-time
     */
    public static JsonDateTime fromRfc3339dateTime(String dateTimeString) {
        try {
            return new JsonDateTime(OffsetDateTime.parse(dateTimeString, formatter));
        } catch (DateTimeParseException e) {
            throw e;
        }
    }

    /**
     * @param dateString a string with a date in the format "YYYY-MM-DD"
     * @return a {@link JsonDateTime JSON date-time} at midnight UTC+0 on the given date.
     */
    public static JsonDateTime fromIso8601date(String dateString) {
        return JsonDateTime.fromRfc3339dateTime(dateString + "T00:00:00Z");
    }

    public OffsetDateTime temporalValue() {
        return this._value;
    }

    protected JsonDateTime(OffsetDateTime dateTime) {
        this._value = dateTime;
    }

    public JsonDateTime plusTime(int amount, TimeUnit unit) {
        switch (unit) {
            case day: return new JsonDateTime(this._value.plusDays(amount));
            case hour: return new JsonDateTime(this._value.plusHours(amount));
            default: throw new RuntimeException(String.format("time unit \"%s\" not handled", unit));
        }
    }

    @Override
    public int compareTo(@NotNull JsonDateTime o) {
        return this._value.compareTo(o._value);
    }

    @Override
    public int hashCode() {
        return this._value.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof JsonDateTime && this.compareTo((JsonDateTime) o) == 0;
    }

    @Override
    public JsonToken asToken() {
        return null;
    }

    @Override
    public void serialize(JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        // (unimplemented)
    }

    @Override
    public JsonNodeType getNodeType() {
        return JsonNodeType.OBJECT;
    }

    @Override
    public String asText() {
        return formatter.format(this._value);
    }

}
