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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A class to represent dates and date-time's with as a {@link com.fasterxml.jackson.databind.JsonNode JSON value}.
 * All date-time's are represented internally as an {@link OffsetDateTime}.
 * Dates are converted to date-time's by assuming midnight Zulu-time (UTC+0).
 */
public class JsonDateTime extends ValueNode implements Comparable<JsonDateTime> {

    private static final long serialVersionUID = 1L;

    private final OffsetDateTime _value;

    /**
     * @param str a string with either a date or a date-time in any of the supported formats - see the approved documentation
     * @return a {@link JsonDateTime JSON date-time} of the given date/date-time
     */
    public static JsonDateTime fromString(String str) {
        if (str.matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            return JsonDateTime.fromStringInternal(str + "T00:00:00Z");
        }
        final Pattern pattern = Pattern.compile("^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(\\.\\d+?)?(Z|(([+-])(\\d{1,2}):?(\\d{2})?))?$");
        //                                        1        2        3        4        5        6       7          8  910    11          12
        Matcher matcher = pattern.matcher(str);
        if (matcher.matches()) {
            String reformatted = String.format("%s-%s-%sT%s:%s:%s", matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5), matcher.group(6));
            if (matcher.group(7) != null) {
                reformatted += String.format("%-4s", matcher.group(7)).replace(' ', '0').substring(0, 4);
            }
            if (matcher.group(8) == null || matcher.group(8).equals("Z")) {
                reformatted += "Z";  // Assume timezone offset 'Z' when missing.
            } else {
                reformatted += matcher.group(10) + String.format("%2s", matcher.group(11)).replaceAll(" ", "0") + ":" + (matcher.group(12) != null ? matcher.group(12) : "00");
            }
            return JsonDateTime.fromStringInternal(reformatted);
        }
        throw new DateTimeParseException("not an allowed date or date-time format", str, 0);
    }

    /**
     * @param dateTimeString a string with a date-time <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6">compliant with RFC3339</a> but optionally with added milliseconds
     * @return a {@link JsonDateTime JSON date-time} of the given date-time
     */
    private static JsonDateTime fromStringInternal(String dateTimeString) {
        try {
            return new JsonDateTime(OffsetDateTime.parse(dateTimeString));
        } catch (DateTimeParseException e) {
            throw e;
        }
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

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ");

    @Override
    public String asText() {
        return formatter.format(this._value);
    }

}
