import 'package:certlogic_dart/certlogic_dart.dart';
import 'package:test/test.dart';

void main() {

  group('truthy and falsy', () {
    test('truthy', () {
      expect(CertLogicInternals.isTruthy(null), false);
      expect(CertLogicInternals.isTruthy(false), false);
      expect(CertLogicInternals.isTruthy(true), true);
      expect(CertLogicInternals.isTruthy([]), false);
      expect(CertLogicInternals.isTruthy(['foo']), true);
      expect(CertLogicInternals.isTruthy({}), false);
      expect(CertLogicInternals.isTruthy({'foo': 'bar'}), true);
      expect(CertLogicInternals.isTruthy('foo'), true);
      expect(CertLogicInternals.isTruthy(''), false);
      expect(CertLogicInternals.isTruthy(42), true);
      expect(CertLogicInternals.isTruthy(0), false);
    });

    test('falsy', () {
      expect(CertLogicInternals.isFalsy(null), true);
      expect(CertLogicInternals.isFalsy(false), true);
      expect(CertLogicInternals.isFalsy(true), false);
      expect(CertLogicInternals.isFalsy([]), true);
      expect(CertLogicInternals.isFalsy(['foo']), false);
      expect(CertLogicInternals.isFalsy({}), true);
      expect(CertLogicInternals.isFalsy({'foo': 'bar'}), false);
      expect(CertLogicInternals.isFalsy('foo'), false);
      expect(CertLogicInternals.isFalsy(''), true);
      expect(CertLogicInternals.isFalsy(42), false);
      expect(CertLogicInternals.isFalsy(0), true);
    });

    test('boolsiness', () {
      expect(CertLogicInternals.boolsiness(null), false);
      expect(CertLogicInternals.boolsiness(false), false);
      expect(CertLogicInternals.boolsiness(true), true);
      expect(CertLogicInternals.boolsiness([]), false);
      expect(CertLogicInternals.boolsiness(['foo']), true);
      expect(CertLogicInternals.boolsiness({}), false);
      expect(CertLogicInternals.boolsiness({'foo': 'bar'}), true);
      expect(CertLogicInternals.boolsiness('foo'), true);
      expect(CertLogicInternals.boolsiness(''), false);
      expect(CertLogicInternals.boolsiness(42), true);
      expect(CertLogicInternals.boolsiness(0), false);
    });
  });

  group('parsing of dates/date-times', () {
    void check(String dateTimeLike, String expected, [String? message]) {
      expect(CertLogicInternals.dateFromString(dateTimeLike).toUtc(),
          DateTime.parse(expected).toUtc(),
          reason: message);
    }

    test(
        'construct a date from a string without time information (compliant with a JSON Schema \'date\' formatted string)',
        () {
      check('2021-05-04', '2021-05-04T00:00:00.000Z');
    });

    test(
        'construct date-times from strings in RFC 3339 format (compliant with a JSON Schema \'date-time\' formatted string)',
        () {
      check('2021-05-04T13:37:42Z', '2021-05-04T13:37:42.000Z');
      check('2021-05-04T13:37:42+00:00', '2021-05-04T13:37:42.000Z');
      check('2021-05-04T13:37:42-00:00', '2021-05-04T13:37:42.000Z');
      check('2021-08-20T12:03:12+02:00',
          '2021-08-20T10:03:12.000Z'); // (keeps timezone offset)
    });

    test(
        'construct date-times from strings in non-RFC 3339 but ISO 8601 formats',
        () {
      check('2021-08-20T12:03:12+02', '2021-08-20T10:03:12.000Z');
      check('2021-05-04T13:37:42+0000', '2021-05-04T13:37:42.000Z');
      check('2021-05-04T13:37:42-0000', '2021-05-04T13:37:42.000Z');
      check('2021-08-20T12:03:12+0200', '2021-08-20T10:03:12.000Z');
    });

    test('construct date-times from strings which also have millisecond info',
        () {
      check('2021-08-01T00:00:00.1Z', '2021-08-01T00:00:00.100Z'); // 100 ms
      check('2021-08-01T00:00:00.01Z', '2021-08-01T00:00:00.010Z'); //  10 ms
      check('2021-08-01T00:00:00.001Z', '2021-08-01T00:00:00.001Z'); //   1 ms
      check('2021-08-01T00:00:00.0001Z', '2021-08-01T00:00:00.000Z'); // 100 µs
      check('2021-08-01T00:00:00.00001Z', '2021-08-01T00:00:00.000Z'); //  10 µs
      check(
          '2021-08-01T00:00:00.000001Z', '2021-08-01T00:00:00.000Z'); //   1 µs
    });

    test('construct date-times from strings which lack a timezone offset', () {
      check('2021-08-01', '2021-08-01T00:00:00.000Z');
      check('2021-08-01T00:00:00', '2021-08-01T00:00:00.000Z');
    });

    test(
        'construct date-times from strings which have a "short" timezone offset',
        () {
      check('2021-08-01T00:00:00+1:00', '2021-07-31T23:00:00.000Z');
    });

    test('should work for some samples from the QA test data', () {
      check('2021-05-20T12:34:56+00:00', '2021-05-20T12:34:56.000Z', 'SI');
      check('2021-06-29T14:02:07Z', '2021-06-29T14:02:07.000Z', 'BE');
    });

    test('should fail on partial dates and empty strings', () {
      void shouldFail(String str) {
        expect(
          () => CertLogicInternals.dateFromString(str),
          throwsException,
          reason: 'not an allowed date or date-time format: ${str}'
        );
      }
      shouldFail('');
      shouldFail('1997');
      shouldFail('1997-04');
    });

  });

  group('plusTime', () {
    void check(String dateTimeLike, int amount, CertLogicTimeUnit unit,
        String expected) {
      expect(CertLogicInternals.plusTime(dateTimeLike, amount, unit).toUtc(),
          DateTime.parse(expected).toUtc());
    }

    test('works for 1-day offsets', () {
      check('2021-06-23', 1, CertLogicTimeUnit.DAY, '2021-06-24T00:00:00.000Z');
      check(
          '2021-06-23', -1, CertLogicTimeUnit.DAY, '2021-06-22T00:00:00.000Z');
    });

    test('works for 1-hour offsets', () {
      check('2021-06-23T00:00:00.000Z', 1, CertLogicTimeUnit.HOUR,
          '2021-06-23T01:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', -1, CertLogicTimeUnit.HOUR,
          '2021-06-22T23:00:00.000Z');
    });

    test('works for day-offsets in hours', () {
      check('2021-06-23T00:00:00.000Z', 24, CertLogicTimeUnit.HOUR,
          '2021-06-24T00:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', 48, CertLogicTimeUnit.HOUR,
          '2021-06-25T00:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', 72, CertLogicTimeUnit.HOUR,
          '2021-06-26T00:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', -24, CertLogicTimeUnit.HOUR,
          '2021-06-22T00:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', -48, CertLogicTimeUnit.HOUR,
          '2021-06-21T00:00:00.000Z');
      check('2021-06-23T00:00:00.000Z', -72, CertLogicTimeUnit.HOUR,
          '2021-06-20T00:00:00.000Z');
    });

    test('not affected by DST transitions', () {
      check('2021-06-23', -180, CertLogicTimeUnit.DAY,
          '2020-12-25T00:00:00.000Z');
    });

    // The assertions with even index coincide with the assertions of the test case 'comparisons of date-times constructed using plusTime across DST transitions' in `date-times.json` in the test suite:
    test('yields comparable values', () {
      expect(
        CertLogicInternals.plusTime('2020-12-24', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', -180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        false,
      ); // 'd1 more than 180 days before d2'
      expect(
        CertLogicInternals.plusTime('2020-12-24', 180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        false,
      ); // 'd1 more than 180 days before d2'
      expect(
        CertLogicInternals.plusTime('2020-12-25', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', -180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        true,
      ); // 'd1 exactly 180 days before d2'
      expect(
        CertLogicInternals.plusTime('2020-12-25', 180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        true,
      ); // 'd1 exactly 180 days before d2'
      expect(
        CertLogicInternals.plusTime('2020-12-26', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', -180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        true,
      ); // 'd1 less than 180 days before d2'
      expect(
        CertLogicInternals.plusTime('2020-12-26', 180, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch >=
            CertLogicInternals.plusTime(
                    '2021-06-23T00:00:00Z', 0, CertLogicTimeUnit.DAY)
                .millisecondsSinceEpoch,
        true,
      ); // 'd1 less than 180 days before d2'
    });

    test('works for month offsets', () {
      check('2021-02-01T00:00:00.000Z', 0, CertLogicTimeUnit.MONTH,
          '2021-02-01T00:00:00.000Z');
      check('2021-02-01T00:00:00.000Z', 1, CertLogicTimeUnit.MONTH,
          '2021-03-01T00:00:00.000Z');
      check('2021-12-01T00:00:00.000Z', 1, CertLogicTimeUnit.MONTH,
          '2022-01-01T00:00:00.000Z');
      check('2021-12-01T00:00:00.000Z', -12, CertLogicTimeUnit.MONTH,
          '2020-12-01T00:00:00.000Z');
    });

    test('works for year offsets', () {
      check('2021-02-01T00:00:00.000Z', 0, CertLogicTimeUnit.YEAR,
          '2021-02-01T00:00:00.000Z');
      check('2021-07-01T00:00:00.000Z', 1, CertLogicTimeUnit.YEAR,
          '2022-07-01T00:00:00.000Z');
      check('2021-10-01T00:00:00.000Z', -1, CertLogicTimeUnit.YEAR,
          '2020-10-01T00:00:00.000Z');
      check('2021-12-01T00:00:00.000Z', 2, CertLogicTimeUnit.YEAR,
          '2023-12-01T00:00:00.000Z');
      check('2004-02-28T00:00:00.000Z', -2, CertLogicTimeUnit.YEAR,
          '2002-02-28T00:00:00.000Z');
      check('2004-02-28T00:00:00.000Z', 18, CertLogicTimeUnit.YEAR,
          '2022-02-28T00:00:00.000Z');
      check('2004-02-28T00:00:00.000Z', -18, CertLogicTimeUnit.YEAR,
          '1986-02-28T00:00:00.000Z');
    });

    test('works for leap days', () {
      check('2020-02-29', 1, CertLogicTimeUnit.DAY,
          '2020-03-01T00:00:00.000Z');
      check('2020-03-01', -1, CertLogicTimeUnit.DAY,
          '2020-02-29T00:00:00.000Z');
      check('2020-02-29', 1, CertLogicTimeUnit.MONTH,
          '2020-03-29T00:00:00.000Z');
      check('2020-03-29', -1, CertLogicTimeUnit.MONTH,
          '2020-02-29T00:00:00.000Z');
      check('2020-02-29', 1, CertLogicTimeUnit.YEAR,
          '2021-03-01T00:00:00.000Z');
      check('2021-03-01', -1, CertLogicTimeUnit.YEAR,
          '2020-03-01T00:00:00.000Z');
      check('2020-02-29', -1, CertLogicTimeUnit.YEAR,
          '2019-03-01T00:00:00.000Z');
      check('2020-02-29', 4, CertLogicTimeUnit.YEAR,
          '2024-02-29T00:00:00.000Z');
      check('2020-02-29', -4, CertLogicTimeUnit.YEAR,
          '2016-02-29T00:00:00.000Z');
      check('2004-02-29', 18, CertLogicTimeUnit.YEAR,
          '2022-03-01T00:00:00.000Z');
      check('2004-02-29', -18, CertLogicTimeUnit.YEAR,
          '1986-03-01T00:00:00.000Z');
      check('2004-02-29', -2, CertLogicTimeUnit.YEAR,
          '2002-03-01T00:00:00.000Z');
    });
  });

  group('extractFromUVCI', () {
    test('returns null on null operand', () {
      expect(CertLogicInternals.extractFromUVCI(null, -1), null);
      expect(CertLogicInternals.extractFromUVCI(null, 0), null);
      expect(CertLogicInternals.extractFromUVCI(null, 1), null);
    });

    test('works correctly on an empty string', () {
      expect(CertLogicInternals.extractFromUVCI('', -1), null);
      expect(CertLogicInternals.extractFromUVCI('', 0), '');
      expect(CertLogicInternals.extractFromUVCI('', 1), null);
    });

    test('foo/bar::baz#999lizards (without optional prefix)', () {
      const uvci = 'foo/bar::baz#999lizards';
      expect(CertLogicInternals.extractFromUVCI(uvci, -1), null);
      expect(CertLogicInternals.extractFromUVCI(uvci, 0), 'foo');
      expect(CertLogicInternals.extractFromUVCI(uvci, 1), 'bar');
      expect(CertLogicInternals.extractFromUVCI(uvci, 2),
          ''); // not null, but still falsy
      expect(CertLogicInternals.extractFromUVCI(uvci, 3), 'baz');
      expect(CertLogicInternals.extractFromUVCI(uvci, 4), '999lizards');
      expect(CertLogicInternals.extractFromUVCI(uvci, 5), null);
    });

    test('foo/bar::baz#999lizards (with optional prefix)', () {
      const uvci = 'URN:UVCI:foo/bar::baz#999lizards';
      expect(CertLogicInternals.extractFromUVCI(uvci, -1), null);
      expect(CertLogicInternals.extractFromUVCI(uvci, 0), 'foo');
      expect(CertLogicInternals.extractFromUVCI(uvci, 1), 'bar');
      expect(CertLogicInternals.extractFromUVCI(uvci, 2),
          ''); // not null, but still falsy
      expect(CertLogicInternals.extractFromUVCI(uvci, 3), 'baz');
      expect(CertLogicInternals.extractFromUVCI(uvci, 4), '999lizards');
      expect(CertLogicInternals.extractFromUVCI(uvci, 5), null);
    });

    // the example from the specification:
    test('each separator adds a fragment', () {
      const uvci = 'a::c/#/f';
      expect(CertLogicInternals.extractFromUVCI(uvci, 0), 'a');
      expect(CertLogicInternals.extractFromUVCI(uvci, 1), '');
      expect(CertLogicInternals.extractFromUVCI(uvci, 2), 'c');
      expect(CertLogicInternals.extractFromUVCI(uvci, 3), '');
      expect(CertLogicInternals.extractFromUVCI(uvci, 4), '');
      expect(CertLogicInternals.extractFromUVCI(uvci, 5), 'f');
    });
  });

  group('perform data access', () {
    void check(dynamic data, String path, dynamic expected) {
      expect(CertLogicInternals.access(data, path), expected);
      // expect does a deep-equals, apparently?
    }

    test('empty string ~ \'it\'', () {
      check({}, "", {});
      check([], "", []);
      check('', '', '');
      check(null, "", null);
    });

    test('null stays null', () {
      check(null, 'x', null);
      check(null, '10', null);
      check(null, 'x.y', null);
      check(null, 'x.0.z', null);
    });

    test('array access', () {
      const array = [0, 1, 1, 2, 3, 5];
      check(array, '5', 5);
      check(array, '-1', null);
      check(array, '42', null);
    });

    test('access on non-objects/arrays -> null', () {
      check('foo', 'x', null);
      check(42, 'x', null);
      check(true, 'x', null);
    });

    test('object access', () {
      const object = { 'x': 'foo' };
      check(object, 'x', 'foo');
    });

    test('nested object access', () {
      const object = { 'x': [ { 'z': 'foo' } ] };
      check(object, 'x.0.z', 'foo');
    });
  });

  group('dccDateOfBirth', () {
    void check(String dob, String expected) {
      expect(CertLogicInternals.dccDateOfBirth(dob).toUtc(),
          DateTime.parse(expected).toUtc());
    }

    test('works for YYYY', () {
      check('2004', '2004-12-31T00:00:00.000Z');
      check('2021', '2021-12-31T00:00:00.000Z');
    });

    test('works for YYYY-MM', () {
      check('2004-01', '2004-01-31T00:00:00.000Z');
      check('2004-02', '2004-02-29T00:00:00.000Z');
      check('2003-02', '2003-02-28T00:00:00.000Z');
      check('2004-03', '2004-03-31T00:00:00.000Z');
      check('2004-04', '2004-04-30T00:00:00.000Z');
      check('2004-05', '2004-05-31T00:00:00.000Z');
      check('2004-06', '2004-06-30T00:00:00.000Z');
      check('2004-07', '2004-07-31T00:00:00.000Z');
      check('2004-08', '2004-08-31T00:00:00.000Z');
      check('2004-09', '2004-09-30T00:00:00.000Z');
      check('2004-10', '2004-10-31T00:00:00.000Z');
      check('2004-11', '2004-11-30T00:00:00.000Z');
      check('2004-12', '2004-12-31T00:00:00.000Z');
    });

    test('works for YYYY-MM-DD', () {
      check('2021-05-04', '2021-05-04T00:00:00.000Z');
    });
  });

}
