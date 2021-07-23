enum CertLogicTimeUnit {
  DAY,
  HOUR,
  MONTH,
  YEAR,
}

class CertLogicTimeUnits {
  static String asString(CertLogicTimeUnit unit) {
    switch (unit) {
      case CertLogicTimeUnit.DAY:
        return 'day';
      case CertLogicTimeUnit.HOUR:
        return 'hour';
      case CertLogicTimeUnit.MONTH:
        return 'month';
      case CertLogicTimeUnit.YEAR:
        return 'year';
    }
  }

  static CertLogicTimeUnit fromString(String CertLogictimeUnit) {
    switch (CertLogictimeUnit) {
      case 'day':
        return CertLogicTimeUnit.DAY;
      case 'hour':
        return CertLogicTimeUnit.HOUR;
      case 'month':
        return CertLogicTimeUnit.MONTH;
      case 'year':
        return CertLogicTimeUnit.YEAR;
      default:
        throw Exception('invalid CertLogictimeUnit $CertLogictimeUnit');
    }
  }
}
