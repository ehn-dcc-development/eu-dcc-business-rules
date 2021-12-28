import 'dart:core';
import 'dart:io';
import 'package:certlogic_dart/certlogic_dart.dart';
import 'package:test/test.dart';
import 'models.dart';

void main() {
  const sharedTestSuitePath = '../specification/testSuite';
  const localTestSuitePath = 'test/testSuite';

  test('validate test suite', () async {
    for (final path in [sharedTestSuitePath, localTestSuitePath]) {
      final directory = Directory(path);
      final entries = directory.listSync(recursive: true).toList();
      final files = entries.where((element) => element.path.endsWith('.json')).map((element) => File(element.path));
      final failedNames = [];
      var success = 0;
      for (final file in files) {
        final jsonString = await file.readAsString();
        final testSuite = TestSuite.fromJson(jsonString);
        if (testSuite.directive == TestDirective.SKIP) continue;
        testSuite.cases.forEach((testCase) {
          if (testCase.directive == TestDirective.SKIP) return;
          testCase.assertions.forEach((assertion) {
            if (assertion.directive == TestDirective.SKIP) return;
            try {
              var result;
              try {
                result = CertLogic.evaluate(assertion.certLogicExpression ?? testCase.certLogicExpression, assertion.data);
              } catch (e) {
                if (e is CertLogicException) {
                  result = null;
                } else {
                  rethrow;
                }
              }
              expect(result, assertion.expected);
              success++;
            } catch (e) {
              failedNames.add('${testCase.name} - ${assertion.message}');
            }
          });
        });
      }
      print('--- ${path} ---');
      if (failedNames.isNotEmpty) {
        print('failed: [\n${failedNames.join('\n')}\n]');
      }
      print('$success succeeded and ${failedNames.length} failed');
      expect(failedNames.length, 0);
    }
  });
}

void printDebug(dynamic value) {
  print(value); // ignore: avoid_print
}
