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

public class JsonDateTime extends ValueNode implements Comparable<JsonDateTime> {

    private static final long serialVersionUID = 1L;

    private final OffsetDateTime _value;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static JsonDateTime fromIso8601(String dateTimeString) {
        try {
            return new JsonDateTime(OffsetDateTime.parse(dateTimeString, formatter));
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

    @Override
    public String asText() {
        return formatter.format(this._value);
    }

}
