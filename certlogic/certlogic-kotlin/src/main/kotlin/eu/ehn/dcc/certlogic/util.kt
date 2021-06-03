package eu.ehn.certlogic

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import java.io.File

val objectMapper = jacksonObjectMapper()

inline fun <reified T> readJson(file: File): T = objectMapper.readValue(file)


operator fun File.div(other: String): File = resolve(other)


fun File.fileNameWithoutExt(): CharSequence {
    val asStr = this.absolutePath
    val slashIndex = asStr.lastIndexOf('/')
    val dotIndex = asStr.lastIndexOf('.')
    return asStr.subSequence(slashIndex + 1, dotIndex)
}

