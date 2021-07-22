import 'dart:core';
import 'dart:io';
import 'package:certlogic_dart/certlogic_dart.dart';
import 'package:test/test.dart';
import 'models.dart';

void main() {
  const dirPath = '../specification/testSuite';

  late final Directory dataDir;

  setUp(() async {
    dataDir = Directory(dirPath);
  });

  test('validate test suite', () async {
    final entries = dataDir.listSync(recursive: true).toList();
    final files = entries.where((element) => element.path.endsWith('.json')).map((element) => File(element.path));
    final failedNames = [];
    var success = 0;
    for (final file in files) {
      final jsonString = await file.readAsString();
      final testSuite = TestSuite.fromJson(jsonString);
      print('=========');
      print('${testSuite.name}: ${testSuite.cases.length}');
      testSuite.cases.forEach((testCase) {
        print('=========');
        print('${testSuite.name}: ${testSuite.cases.length}');
        testCase.assertions.forEach((assertion) {
          try {
            final result = CertLogic.evaluate(assertion.certLogicExpression ?? testCase.certLogicExpression, assertion.data);
            print(assertion.message);
            expect(result, assertion.expected);
            success++;
          } catch (e) {
            failedNames.add(assertion.message ?? testCase.name);
          }
        });
      });
    }
    if (failedNames.isNotEmpty) {
      print('failed: [\n${failedNames.join('\n')}\n]');
    }
    print('$success succeeded and ${failedNames.length} failed');
    expect(failedNames.length, 0);
  });
}

void printDebug(dynamic value) {
  print(value); // ignore: avoid_print
}
