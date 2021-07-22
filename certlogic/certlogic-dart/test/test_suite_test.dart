import 'dart:core';
import 'dart:io';
import 'package:certlogic_dart/certlogic_dart.dart';
import 'package:test/test.dart';
import 'models.dart';

void main() {
  const dirPath = '../../../specification/testSuite';

  late final Directory dataDir;

  setUp(() async {
    dataDir = Directory(dirPath);
  });

  test('validate test suite', () async {
    final entries = dataDir.listSync(recursive: true).toList();
    final files = entries.where((element) => element.path.endsWith('.json')).map((element) => File(element.path));
    for (final file in files) {
      late TestCase model;
      final jsonString = await file.readAsString();
      model = TestCase.fromJson(jsonString);
      model.assertions.forEach((element) {
        final result = CertLogic.evaluate(element.certLogicExpression, element.data) as bool;
        print(element.message);
        expect(result, element.expected);
      });
    }
  });
}

void printDebug(dynamic value) {
  print(value); // ignore: avoid_print
}
