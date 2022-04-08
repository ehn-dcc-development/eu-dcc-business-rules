import 'package:certlogic_dart/src/internals.dart';
import 'package:certlogic_dart/src/typings.dart';

class CertLogicException implements Exception {
  final String message;

  const CertLogicException(this.message);

  String toString() => 'CertLogicException: $message';
}

/// The library, you can use the static functions, so you don't need to instantiate this class
class CertLogic {
  /// Evaluate a variable
  static dynamic _evaluateVar(dynamic value, dynamic data) {
    if (value is! String) {
      throw CertLogicException("not of the form { 'var': '<path>' }");
    }
    return CertLogicInternals.access(data, value);
  }

  static dynamic _evaluateIf(
      dynamic guard, dynamic then, dynamic elseDo, dynamic data) {
    final dynamic evalGuard = evaluate(guard, data);
    if (CertLogicInternals.isTruthy(evalGuard)) {
      return evaluate(then, data);
    } else {
      return evaluate(elseDo, data);
    }
  }

  static String? _evaluateExtractFromUVCI(
      dynamic operand, int index, dynamic data) {
    final evalOperand = evaluate(operand, data);
    if (evalOperand is! String) {
      throw CertLogicException(
          '"UVCI" argument (#1) of "extractFromUVCI" must be either a string or null');
    }
    return CertLogicInternals.extractFromUVCI(evalOperand, index);
  }

  static DateTime _evaluateDccDateOfBirth(dynamic operand, dynamic data) {
    final evalOperand = evaluate(operand, data);
    if (evalOperand is! String) {
      throw CertLogicException('operand of "dccDateOfBirth" must be a string');
    }
    return CertLogicInternals.dccDateOfBirth(evalOperand);
  }

  static bool Function(dynamic l, dynamic r) _compareFunctionFor(
      String operatorAsString) {
    return (dynamic l, dynamic r) {
      num left = 0;
      if (l is DateTime) {
        left = l.millisecondsSinceEpoch;
      } else if (l is num) {
        left = l;
      } else {
        throw CertLogicException('incorrect type');
      }
      num right = 0;
      if (r is DateTime) {
        right = r.millisecondsSinceEpoch;
      } else if (r is num) {
        right = r;
      } else {
        throw CertLogicException('incorrect type');
      }
      switch (operatorAsString) {
        case '<':
          return left < right;
        case '>':
          return left > right;
        case '<=':
          return left <= right;
        case '>=':
          return left >= right;
        default:
          throw CertLogicException('incorrect operator');
      }
    };
  }

  static bool _compare(String operatorAsString, Iterable values) {
    final compFunc = _compareFunctionFor(operatorAsString);
    switch (values.length) {
      case 2:
        return compFunc(values.elementAt(0), values.elementAt(1));
      case 3:
        return compFunc(values.elementAt(0), values.elementAt(1)) &&
            compFunc(values.elementAt(1), values.elementAt(2)!);
      default:
        throw CertLogicException(
            "invalid number of operands to a '$operatorAsString' operation");
    }
  }

  static String _comparisonOperatorForDateTimeComparison(
      String operatorAsString) {
    switch (operatorAsString) {
      case 'after':
        return '>';
      case 'before':
        return '<';
      case 'not-after':
        return '<=';
      case 'not-before':
        return '>=';
      default:
        throw CertLogicException('invalid operator');
    }
  }

  static dynamic _evaluateAnd(Iterable values, dynamic data) {
    if (values.length < 2) {
      throw CertLogicException(
          "an 'and' operation must have at least 2 operands");
    }
    dynamic evaluated;
    for (final current in values) {
      evaluated = evaluate(current, data);
      final evaluatedBool = CertLogicInternals.boolsiness(evaluated);
      if (evaluatedBool == false) {
        return evaluated;
      } else if (evaluatedBool == null) {
        throw CertLogicException(
            'all operands of an "and" operation must be either truthy or falsy');
      }
    }
    return evaluated;
  }

  static dynamic _evaluateInfix(
      String operatorAsString, Iterable values, dynamic data) {
    switch (operatorAsString) {
      case '<':
      case '>':
      case '<=':
      case '>=':
      case 'after':
      case 'before':
      case 'not-after':
      case 'not-before':
        if (values.length < 2 || values.length > 3)
          throw CertLogicException(
              "an operation with operator '$operatorAsString' must have 2 or 3 operands");
        break;
      default:
        if (values.length != 2)
          throw CertLogicException(
              "an operation with operator '$operatorAsString' must have 2 operands");
        break;
    }
    final evalArgs = values.map<dynamic>((dynamic arg) => evaluate(arg, data));
    switch (operatorAsString) {
      case '===':
        return evalArgs.elementAt(0) == evalArgs.elementAt(1);
      case 'in':
        {
          dynamic r = evalArgs.elementAt(1);
          if (r is Map) r = r.keys;
          if (r is! Iterable) {
            throw CertLogicException(
                "right-hand side of an 'in' operation must be an array");
          }
          return r.contains(evalArgs.elementAt(0));
        }
      case '+':
        {
          final dynamic l = evalArgs.elementAt(0);
          final dynamic r = evalArgs.elementAt(1);
          if (l is! num || r is! num) {
            throw CertLogicException(
                'operands of this operation must both be integers');
          }
          return l + r;
        }
      case '<':
      case '>':
      case '<=':
      case '>=':
        {
          if (!evalArgs.every((dynamic e) => e is num)) {
            throw CertLogicException(
                'all operands of a comparison operation must be of integer type');
          }
          return _compare(operatorAsString, evalArgs);
        }
      case 'after':
      case 'before':
      case 'not-after':
      case 'not-before':
        {
          if (!evalArgs.every((dynamic e) => e is DateTime)) {
            throw CertLogicException(
                'all operands of a date-time comparison must be date-times');
          }
          return _compare(
              _comparisonOperatorForDateTimeComparison(operatorAsString),
              evalArgs);
        }
      default:
        throw CertLogicException(
            "unhandled infix operator '$operatorAsString'");
    }
  }

  static bool _evaluateNot(dynamic operandExpr, dynamic data) {
    final dynamic operand = evaluate(operandExpr, data);
    if (CertLogicInternals.isFalsy(operand)) {
      return true;
    }
    if (CertLogicInternals.isTruthy(operand)) {
      return false;
    }
    throw CertLogicException(
        'operand of ! _evaluates to something neither truthy, nor falsy: $operand');
  }

  static DateTime _evaluatePlusTime(
      dynamic dateOperand, dynamic amount, String unit, dynamic data) {
    if (amount is! num) {
      throw CertLogicException(
          "'amount' argument (#2) of 'plusTime' must be an integer");
    }
    if (!['day', 'hour', 'month', 'year'].contains(unit)) {
      throw CertLogicException(
          "'unit' argument (#3) of 'plusTime' must be a string 'year', 'month', 'day' or 'hour'");
    }
    final dynamic dateTimeStr = evaluate(dateOperand, data);
    if (dateTimeStr is! String) {
      throw CertLogicException(
          "date argument (#1) of 'plusTime' must be a string");
    }
    return CertLogicInternals.plusTime(
        dateTimeStr, amount.toInt(), CertLogicTimeUnits.fromString(unit));
  }

  static dynamic _evaluateReduce(
      dynamic operand, dynamic lambda, dynamic initial, dynamic data) {
    final dynamic evalOperand = evaluate(operand, data);
    dynamic evalInitial() => evaluate(initial, data);
    if (evalOperand == null) {
      return evalInitial();
    }
    if (evalOperand is! Iterable) {
      throw CertLogicException(
          'operand of reduce _evaluated to a non-null non-array');
    }

    var accumulator = evalInitial();
    evalOperand.forEach((dynamic current) {
      accumulator =
          evaluate(lambda, {'current': current, 'accumulator': accumulator});
    });
    return accumulator;
  }

  /// The evaluate function, this function will evaluate the given expression using the given data
  /// Note that for the dgc-business-rules you should also provide the external values in the data field
  static dynamic evaluate(dynamic expr, dynamic data) {
    if (expr is String || expr is num || expr is bool) {
      return expr;
    }
    if (expr == null) {
      throw CertLogicException('invalid CertLogic expression: $expr');
    }
    if (expr is Iterable) {
      return expr.map<dynamic>((dynamic item) => evaluate(item, data));
    }
    if (expr is Map) {
      final keys = expr.keys;
      if (keys.length != 1) {
        throw CertLogicException('unrecognised expression object encountered');
      }
      final operatorAsString = keys.first as String;
      final dynamic values = expr[operatorAsString];
      if (operatorAsString == 'var') {
        return _evaluateVar(values, data);
      }
      if (values is! List || values.isEmpty) {
        throw CertLogicException(
            "operation not of the form { '<operator>': [ <values...> ] }");
      }
      if (operatorAsString == 'if') {
        final dynamic guard = values[0];
        final dynamic then = values[1];
        final dynamic elseDo = values[2];
        return _evaluateIf(guard, then, elseDo, data);
      }
      if (operatorAsString == 'and') {
        return _evaluateAnd(values, data);
      }
      if ([
        '===',
        '>',
        '<',
        '>=',
        '<=',
        'in',
        '+',
        'after',
        'before',
        'not-after',
        'not-before'
      ].contains(operatorAsString)) {
        return _evaluateInfix(operatorAsString, values, data);
      }
      if (operatorAsString == '!') {
        return _evaluateNot(values[0], data);
      }
      if (operatorAsString == 'plusTime') {
        return _evaluatePlusTime(
            values[0], values[1], values[2] as String, data);
      }
      if (operatorAsString == 'reduce') {
        return _evaluateReduce(values[0], values[1], values[2], data);
      }
      if (operatorAsString == 'extractFromUVCI' ||
          operatorAsString == 'extractFromUCI') {
        return _evaluateExtractFromUVCI(
            values.elementAt(0), values.elementAt(1), data);
      }
      if (operatorAsString == 'dccDateOfBirth') {
        return _evaluateDccDateOfBirth(values.elementAt(0), data);
      }
      throw CertLogicException("unrecognised operator: '$operatorAsString'");
    }
    throw CertLogicException('invalid CertLogic expression: $expr');
  }
}
