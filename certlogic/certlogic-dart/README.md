# certlogic_dart

A package that can evaluate certlogic

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