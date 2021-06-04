package eu.ehn.dcc.rulesets

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import java.io.File


val objectMapper = jacksonObjectMapper().also {
    it.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
}

inline fun <reified T> readJson(file: File): T = objectMapper.readValue(file)


operator fun File.div(other: String): File = resolve(other)

