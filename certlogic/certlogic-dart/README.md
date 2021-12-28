# certlogic_dart

[![pub package](https://img.shields.io/pub/v/certlogic_dart.svg)](https://pub.dartlang.org/packages/certlogic_dart)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://mit-license.org/)

[CertLogic](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic) is a standard for expressing logic, such as the kind you find in business/validation rules, in plain JSON format.
It is a [specified](https://github.com/ehn-dcc-development/dgc-business-rules/blob/main/certlogic/specification/README.md) subset of [JsonLogic](https://jsonlogic.com/), extended with necessary custom operations - e.g. for working with dates.
It's part of the efforts surrounding the [Digital COVID Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en), and as such serves as the basis for defining _interchangeable_ validation rules on top of the DCC.

This Dart package consists of an implementation of CertLogic in Dart(/Flutter), compatible with version **1.2.4** of the CertLogic specification.



## Install

Install from [pub.dev](https://pub.dev/packages/certlogic_dart/install)

## Example for dgc-business-rules

### Prepare your data

```dart
final data = {
    'payload': payload, // Your DCC
    'external': {
        'valueSets': _valueSets, // The valuesets as provided by the EU GW
        'validationClock': DateTime.now().toIso8601String(), // The validation time
    },
};
```

### Evaluate a single rule

```dart
CertLogic.evaluate(rule.logic, data) as bool
```

### Evaluate a list of rules and return all failed rules

```dart
final failedRules = validationRules
    ?.map(
        (rule) => CertLogic.evaluate(rule.logic, data) as bool == true ? null : rule,
    )
    .whereType<ValidationRule>()
    .toList();
```

## Run tests

Executing the tests requires the [test suite](https://github.com/ehn-dcc-development/dgc-business-rules/tree/main/certlogic/specification/testSuite), located in a `specification` folder, directly next to this directory.

```
dart test
```

The output should be as follows:
```
00:01 +16: test/test_suite_test.dart: validate test suite
--- ../specification/testSuite ---
181 succeeded and 0 failed
--- test/testSuite ---
14 succeeded and 0 failed
✓ validate test suite
00:01 +17: All tests passed!
```