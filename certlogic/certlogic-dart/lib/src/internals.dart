import 'package:certlogic_dart/src/typings.dart';

class CertLogicInternals {
  static bool isFalsy(dynamic value) =>
      value == false ||
      value == null ||
      (value is String && value.isEmpty) ||
      (value is num && value == 0) ||
      (value is Iterable && value.isEmpty) ||
      (value is Map && value.isEmpty);

  static bool isTruthy(dynamic value) => !isFalsy(value);

  /// NOTE:
  /// Effectively, any date is always converted to the corresponding ms-precise date-time
  /// at midnight of that date. Note that that doesn't properly reflect the resolution of
  /// the input date. That effect has to be taken into account by the logic implementor.
  static DateTime dateFromString(String str) {
    DateTime? dateTime;
    if (str.length == 10) {
      // No TZ is added
      final date = DateTime.parse(str);
      dateTime = DateTime.utc(date.year, date.month, date.day); // Set it to midnight as per specs
    }
    final regex = r'(^[T,\-,:,\.0-9]{10,}[+,-])([0-9]|[0-9]{3}|[0-9]:[0-9]{2})$';
    str = str.replaceAllMapped(RegExp(regex), (match) => '${match.group(1)}0${match.group(2)}');
    dateTime ??= DateTime.parse(str);
    return DateTime.utc(dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
  }

  static DateTime plusTime(String dateTimeLikeStr, int amount, CertLogicTimeUnit unit) {
    final dateTime = dateFromString(dateTimeLikeStr);
    switch (unit) {
      case CertLogicTimeUnit.HOUR:
        return DateTime.utc(dateTime.year, dateTime.month, dateTime.day, dateTime.hour + amount, dateTime.minute, dateTime.second, dateTime.millisecond);
      case CertLogicTimeUnit.DAY:
        return DateTime.utc(dateTime.year, dateTime.month, dateTime.day + amount, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
      case CertLogicTimeUnit.MONTH:
        return DateTime.utc(dateTime.year, dateTime.month + amount, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
      case CertLogicTimeUnit.YEAR:
        if (dateTime.month == DateTime.february && dateTime.day == 29)
          return DateTime.utc(dateTime.year + amount, dateTime.month, dateTime.day - 1, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
        return DateTime.utc(dateTime.year + amount, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
    }
  }

  static const optionalPrefix = "URN:UVCI:";

  /// returns The fragment with given index from the UVCI string
  ///  (see Annex 2 in the [UVCI specification](https://ec.europa.eu/health/sites/default/files/ehealth/docs/vaccination-proof_interoperability-guidelines_en.pdf)),
  ///  or `null` when that fragment doesn't exist.
  static String? extractFromUVCI(String? uvci, int index) {
    if (uvci == null || index < 0) {
      return null;
    }
    final prefixlessUvci = uvci.startsWith(optionalPrefix) ? uvci.substring(optionalPrefix.length) : uvci;
    final fragments = prefixlessUvci.split(RegExp(r'[/#:]'));
    return index < fragments.length ? fragments[index] : null;
  }
}
