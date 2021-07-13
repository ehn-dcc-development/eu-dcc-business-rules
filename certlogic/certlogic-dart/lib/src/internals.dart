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
    if (str.length == 10) {
      // No TZ is added
      final date = DateTime.parse(str);
      return DateTime.utc(date.year, date.month, date.day); // Set it to midnight as per specs
    }
    return DateTime.parse(str).toUtc();
  }

  static DateTime plusTime(String dateTimeLikeStr, int amount, CertLogicTimeUnit unit) {
    final dateTime = dateFromString(dateTimeLikeStr);
    switch (unit) {
      case CertLogicTimeUnit.DAY:
        return dateTime.add(Duration(days: amount));
      case CertLogicTimeUnit.HOUR:
        return dateTime.add(Duration(hours: amount));
      case CertLogicTimeUnit.MONTH:
        return DateTime(dateTime.year, dateTime.month + amount, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
      case CertLogicTimeUnit.YEAR:
        return DateTime(dateTime.year + amount, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
    }
  }
}
