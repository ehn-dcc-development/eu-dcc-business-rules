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
        return DateTime.utc(dateTime.year + amount, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
    }
  }
}
