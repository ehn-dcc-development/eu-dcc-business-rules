import 'package:certlogic_dart/src/internals.dart';
import 'package:certlogic_dart/src/typings.dart';
import 'package:collection/collection.dart';

/// The library, you can use the static functions, so you don't need to instantiate this class
class CertLogic {
  static dynamic _accumulator;
  static dynamic _current;
  static dynamic _data;

  /// _evaluate a variable
  static dynamic _evaluateVar(dynamic value, dynamic data) {
    if (data == null) {
      return null;
    }
    if (value is! String) {
      throw Exception("not of the form { 'var': '<path>' }");
    }
    if (value == '') {
      return data;
    }
    dynamic returnData = data;
    value.split('.').forEach((fragment) {
      if (returnData == null) return;
      if (fragment == 'data') {
        returnData = _data;
        return;
      }
      if (returnData is Iterable) {
        if (fragment == 'current') {
          returnData = _current;
          return;
        }
        if (fragment == 'accumulator') {
          returnData = _accumulator;
          return;
        }
        try {
          final index = int.parse(fragment);
          if (index > (returnData as Iterable).length - 1) {
            returnData = null;
            return;
          }
          returnData = returnData[index];
          return;
        } catch (e) {
          return;
        }
      }
      if (returnData is Map) {
        returnData = returnData[fragment];
        return;
      }
    });
    return returnData;
  }

  static dynamic _evaluateIf(dynamic guard, dynamic then, dynamic elseDo, dynamic data) {
    final dynamic evalGuard = _evaluate(guard, data);
    if (CertLogicInternals.isTruthy(evalGuard)) {
      return _evaluate(then, data);
    } else {
      return _evaluate(elseDo, data);
    }
  }

  static bool Function(dynamic l, dynamic r) _compareFunctionFor(String operatorAsString) {
    return (dynamic l, dynamic r) {
      num left = 0;
      if (l is DateTime) {
        left = l.millisecondsSinceEpoch;
      } else if (l is num) {
        left = l;
      } else {
        throw Exception('incorrect type');
      }
      num right = 0;
      if (r is DateTime) {
        right = r.millisecondsSinceEpoch;
      } else if (r is num) {
        right = r;
      } else {
        throw Exception('incorrect type');
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
          throw Exception('incorrect operator');
      }
    };
  }

  static bool _compare(String operatorAsString, Iterable values) {
    final compFunc = _compareFunctionFor(operatorAsString);
    switch (values.length) {
      case 2:
        return compFunc(values.elementAt(0), values.elementAt(1));
      case 3:
        return compFunc(values.elementAt(0), values.elementAt(1)) && compFunc(values.elementAt(1), values.elementAt(2)!);
      default:
        throw Exception("invalid number of operands to a '$operatorAsString' operation");
    }
  }

  static String _comparisonOperatorForDateTimeComparison(String operatorAsString) {
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
        throw Exception('invalid operator');
    }
  }

  static dynamic _evaluateInfix(String operatorAsString, Iterable values, dynamic data) {
    switch (operatorAsString) {
      case 'and':
        if (values.length < 2) {
          throw Exception("an 'and' operation must have at least 2 operands");
        }
        break;
      case '<':
      case '>':
      case '<=':
      case '>=':
      case 'after':
      case 'before':
      case 'not-after':
      case 'not-before':
        if (values.length < 2 || values.length > 3) throw Exception("an operation with operator '$operatorAsString' must have 2 or 3 operands");
        break;
      default:
        if (values.length != 2) throw Exception("an operation with operator '$operatorAsString' must have 2 operands");
        break;
    }
    final evalArgs = values.map<dynamic>((dynamic arg) => _evaluate(arg, data));
    switch (operatorAsString) {
      case '===':
        return evalArgs.elementAt(0) == evalArgs.elementAt(1);
      case 'in':
        {
          dynamic r = evalArgs.elementAt(1);
          if (r is Map) r = r.keys;
          if (r is! Iterable) {
            throw Exception("right-hand side of an 'in' operation must be an array");
          }
          return r.contains(evalArgs.elementAt(0));
        }
      case '+':
        {
          final dynamic l = evalArgs.elementAt(0);
          final dynamic r = evalArgs.elementAt(1);
          if (l is! num || r is! num) {
            throw Exception('operands of this operation must both be integers');
          }
          return l + r;
        }
      case 'and':
        if (!evalArgs.any(CertLogicInternals.isFalsy)) return evalArgs.last;
        return evalArgs.toList().firstWhereOrNull(CertLogicInternals.isFalsy);
      case '<':
      case '>':
      case '<=':
      case '>=':
        {
          if (!evalArgs.every((dynamic e) => e is num)) {
            throw Exception('all operands of a comparison operation must be of integer type');
          }
          return _compare(operatorAsString, evalArgs);
        }
      case 'after':
      case 'before':
      case 'not-after':
      case 'not-before':
        {
          if (!evalArgs.every((dynamic e) => e is DateTime)) {
            throw Exception('all operands of a date-time comparison must be date-times');
          }
          return _compare(_comparisonOperatorForDateTimeComparison(operatorAsString), evalArgs);
        }
      default:
        throw Exception("unhandled infix operator '$operatorAsString'");
    }
  }

  static bool _evaluateNot(dynamic operandExpr, dynamic data) {
    final dynamic operand = _evaluate(operandExpr, data);
    if (CertLogicInternals.isFalsy(operand)) {
      return true;
    }
    if (CertLogicInternals.isTruthy(operand)) {
      return false;
    }
    throw Exception('operand of ! _evaluates to something neither truthy, nor falsy: $operand');
  }

  static DateTime _evaluatePlusTime(dynamic dateOperand, dynamic amount, String unit, dynamic data) {
    if (amount is! num) {
      throw Exception("'amount' argument (#2) of 'plusTime' must be an integer");
    }
    if (!['day', 'hour', 'month', 'year'].contains(unit)) {
      throw Exception("'unit' argument (#3) of 'plusTime' must be a string 'year', 'month', 'day' or 'hour'");
    }
    final dynamic dateTimeStr = _evaluate(dateOperand, data);
    if (dateTimeStr is! String) {
      throw Exception("date argument of 'plusTime' must be a string");
    }
    return CertLogicInternals.plusTime(dateTimeStr, amount.toInt(), CertLogicTimeUnits.fromString(unit));
  }

  static dynamic _evaluateReduce(dynamic operand, dynamic lambda, dynamic initial, dynamic data) {
    final dynamic evalOperand = _evaluate(operand, data);
    dynamic evalInitial() => _evaluate(initial, data);
    if (evalOperand == null) {
      return evalInitial();
    }
    if (evalOperand is! Iterable) {
      throw Exception('operand of reduce _evaluated to a non-null non-array');
    }

    _accumulator = evalInitial();
    evalOperand.forEach((dynamic accumulator) {
      _current = accumulator;
      _accumulator = _evaluate(lambda, <dynamic>[accumulator, _accumulator]);
    });
    return _accumulator;
  }

  /// The evaluate function, this function will evaluate the given expression using the given data
  /// Note that for the dgc-business-rules you should also provide the external values in the data field
  static dynamic evaluate(dynamic expr, dynamic data) {
    _data = data;
    return _evaluate(expr, data);
  }

  static dynamic _evaluate(dynamic expr, dynamic data) {
    if (expr is String || expr is num || expr is bool) {
      return expr;
    }
    if (expr == null) {
      throw Exception('invalid CertLogic expression: $expr');
    }
    if (expr is Iterable) {
      return expr.map<dynamic>((dynamic item) => _evaluate(item, data));
    }
    if (expr is Map) {
      final keys = expr.keys;
      if (keys.length != 1) {
        throw Exception('unrecognised expression object encountered');
      }
      final operatorAsString = keys.first as String;
      final dynamic values = expr[operatorAsString];
      if (operatorAsString == 'var') {
        return _evaluateVar(values, data);
      }
      if (values is! List || values.isEmpty) {
        throw Exception("operation not of the form { '<operator>': [ <values...> ] }");
      }
      if (operatorAsString == 'if') {
        final dynamic guard = values[0];
        final dynamic then = values[1];
        final dynamic elseDo = values[2];
        return _evaluateIf(guard, then, elseDo, data);
      }
      if (['===', 'and', '>', '<', '>=', '<=', 'in', '+', 'after', 'before', 'not-after', 'not-before'].contains(operatorAsString)) {
        return _evaluateInfix(operatorAsString, values, data);
      }
      if (operatorAsString == '!') {
        return _evaluateNot(values[0], data);
      }
      if (operatorAsString == 'plusTime') {
        return _evaluatePlusTime(values[0], values[1], values[2] as String, data);
      }
      if (operatorAsString == 'reduce') {
        return _evaluateReduce(values[0], values[1], values[2], data);
      }
      throw Exception("unrecognised operator: '$operatorAsString'");
    }
    throw Exception('invalid CertLogic expression: $expr');
  }
}
