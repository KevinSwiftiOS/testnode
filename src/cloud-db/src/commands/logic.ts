import {
  InternalSymbol,
  SYMBOL_LOGIC_COMMAND,
  SYMBOL_QUERY_COMMAND,
  SYMBOL_UNSET_FIELD_NAME,
} from '../Symbols';

export const AND = 'and';
export const OR = 'or';
export const NOR = 'nor';

export enum LOGIC_COMMANDS_LITERAL {
  AND = 'and',
  OR = 'or',
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
    // a: db.command.and([10,10]);
    this.operator = operator;
    this.operands = operands;
    this.fieldName = fieldName || SYMBOL_UNSET_FIELD_NAME;
    if (this.fieldName !== SYMBOL_UNSET_FIELD_NAME) {
      if (Array.isArray(operands)) {
        operands = [...operands];
        this.operands = operands;
        for (let i = 0, len = operands.length; i < len; i++) {
          const query = operands[i];
          if (isLogicCommand(query) || isQueryCommand(query)) {
            operands[i] = query._setFieldName(this.fieldName as string);
          }
        }
      } else {
        const query = operands;
        if (isLogicCommand(query) || isQueryCommand(query)) {
          operands = query._setFieldName(this.fieldName as string);
        }
      }
    }
  }

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

  and(...args: LogicCommand[]): LogicCommand {
    const expressions: any[] = Array.isArray(args[0]) ? args[0] : args;
    expressions.unshift(this);
    return new LogicCommand(
      LOGIC_COMMANDS_LITERAL.AND,
      expressions,
      this.fieldName
    );
  }

  or(...args: LogicCommand[]): LogicCommand {
    const expressions: any[] = Array.isArray(args[0]) ? args[0] : args;
    expressions.unshift(this);
    return new LogicCommand(
      LOGIC_COMMANDS_LITERAL.OR,
      expressions,
      this.fieldName
    );
  }
}

export function isLogicCommand(object: any): object is LogicCommand {
  return (
    object &&
    object instanceof LogicCommand &&
    object._internalType === SYMBOL_LOGIC_COMMAND
  );
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
