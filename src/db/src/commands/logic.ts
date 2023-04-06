/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable unicorn/prefer-ternary */
// eslint-disable-next-line prettier/prettier
import { InternalSymbol, SYMBOL_LOGIC_COMMAND, SYMBOL_QUERY_COMMAND, SYMBOL_UNSET_FIELD_NAME } from '../helper/symbol';

export const AND = 'and';
export const OR = 'or';
export const NOT = 'not';
export const NOR = 'nor';

export enum LOGIC_COMMANDS_LITERAL {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  AND = 'and',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  OR = 'or',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  NOT = 'not',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  NOR = 'nor',
}

export class LogicCommand {
  fieldName: string | InternalSymbol;
  operator: LOGIC_COMMANDS_LITERAL | string;
  operands: any[];
  _internalType = SYMBOL_LOGIC_COMMAND;

  constructor(
    operator: LOGIC_COMMANDS_LITERAL | string,
    operands: any,
    fieldName?: string | InternalSymbol
  ) {
    Object.defineProperties(this, {
      _internalType: {
        enumerable: false,
        configurable: false,
      },
    });

    this.operator = operator;
    this.operands = operands;
    this.fieldName = fieldName || SYMBOL_UNSET_FIELD_NAME;

    if (this.fieldName !== SYMBOL_UNSET_FIELD_NAME) {
      if (Array.isArray(operands)) {
        operands = [...operands];
        this.operands = operands;
        for (let i = 0, len = operands.length; i < len; i++) {
          const query = operands[i];
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          if (isLogicCommand(query) || isQueryCommand(query)) {
            operands[i] = query._setFieldName(this.fieldName as string);
          }
        }
      } else {
        const query = operands;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (isLogicCommand(query) || isQueryCommand(query)) {
          operands = query._setFieldName(this.fieldName as string);
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _setFieldName(fieldName: string): LogicCommand {
    const operands = this.operands.map((operand: any) => {
      if (operand instanceof LogicCommand) {
        return operand._setFieldName(fieldName);
      }

      return operand;
    });

    const command = new LogicCommand(this.operator, operands, fieldName);
    return command;
  }

  /**
   * Support only command[] or ...command in v1
   * @param {(LogicCommand[]|object[]|...LogicCommand|...object)} expressions Command[] or ...Command
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  and(...__expressions__: LogicCommand[]) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const expressions: any[] = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    expressions.unshift(this);
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions, this.fieldName);
  }

  /**
   * Support only command[] or ...command in v1
   * @param {(LogicCommand[]|object[]|...LogicCommand|...object)} expressions Command[] or ...Command
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  or(...__expressions__: LogicCommand[]) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const expressions: any[] = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    expressions.unshift(this);
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions, this.fieldName);
  }

  /**
   * @param {QueryCommand} expression Command
   */
  /*
  not(expression: DB.DatabaseQueryCommand) {
    assertRequiredParam(expression, 'expression', 'not')
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOT, [expression], this.fieldName)
  }
  */
}

export function isLogicCommand(object: any): object is LogicCommand {
  return object && object instanceof LogicCommand && object._internalType === SYMBOL_LOGIC_COMMAND;
}

export function isKnownLogicCommand(object: any): object is LogicCommand {
  return isLogicCommand && object.operator.toUpperCase() in LOGIC_COMMANDS_LITERAL;
}

// 如果是queryCommand 肯定继承自 LoginCommand
function isQueryCommand(object: any): boolean {
  return (
    object &&
    object instanceof LogicCommand &&
    object._internalType === SYMBOL_QUERY_COMMAND
  );
}


export default LogicCommand;
