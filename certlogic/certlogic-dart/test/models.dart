import 'dart:convert';

enum TestDirective {
  SKIP,
  ONLY,
  UNDEFINED,
}

TestDirective testDirectiveFromString(String? directive) {
  switch (directive) {
    case "skip":
      return TestDirective.SKIP;
    case "only":
      return TestDirective.ONLY;
    default:
      return TestDirective.UNDEFINED;
  }
}

class Assertion {
  dynamic data;
  dynamic expected;
  TestDirective directive;
  dynamic certLogicExpression;
  String? message;
  Assertion({
    required this.data,
    required this.expected,
    required this.directive,
    required this.certLogicExpression,
    required this.message,
  });

  factory Assertion.fromMap(Map<String, dynamic> map) {
    return Assertion(
      data: map['data'],
      expected: map['expected'],
      directive: testDirectiveFromString(map['directive']),
      certLogicExpression: map['certLogicExpression'],
      message: map['message'],
    );
  }

  factory Assertion.fromJson(String source) =>
      Assertion.fromMap(json.decode(source));
}

class TestCase {
  String name;
  TestDirective directive;
  dynamic certLogicExpression;
  List<Assertion> assertions;

  TestCase({
    required this.name,
    required this.directive,
    required this.certLogicExpression,
    required this.assertions,
  });

  factory TestCase.fromMap(Map<String, dynamic> map) {
    return TestCase(
      name: map['name'],
      directive: testDirectiveFromString(map['directive']),
      certLogicExpression: map['certLogicExpression'],
      assertions: List<Assertion>.from(
          map['assertions']?.map((x) => Assertion.fromMap(x)) ?? []),
    );
  }

  factory TestCase.fromJson(String source) =>
      TestCase.fromMap(json.decode(source));
}

class TestSuite {
  String name;
  TestDirective directive;
  List<TestCase> cases;

  TestSuite({
    required this.name,
    required this.directive,
    required this.cases,
  });

  factory TestSuite.fromMap(Map<String, dynamic> map) {
    return TestSuite(
      name: map['name'],
      directive: testDirectiveFromString(map['directive']),
      cases: List<TestCase>.from(map['cases']?.map((x) => TestCase.fromMap(x))),
    );
  }

  factory TestSuite.fromJson(String source) =>
      TestSuite.fromMap(json.decode(source));
}
