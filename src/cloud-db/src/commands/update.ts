import {
  InternalSymbol,
  SYMBOL_UNSET_FIELD_NAME,
  SYMBOL_UPDATE_COMMAND,
} from '../Symbols';

export enum UPDATE_COMMANDS_LITERAL {
  SET = 'set',
  REMOVE = 'remove',
  INC = 'inc',
  MUL = 'mul',
  PUSH = 'push',
  PULL = 'pull',
  PULL_ALL = 'pullAll',
  POP = 'pop',
  SHIFT = 'shift',
  UNSHIFT = 'unshift',
  ADD_TO_SET = 'addToSet',
  BIT = 'bit',
  RENAME = 'rename',
  MAX = 'max',
  MIN = 'min',
}

export class UpdateCommand {
  fieldName: string | InternalSymbol;
  operator: UPDATE_COMMANDS_LITERAL;
  operands: any;
  _internalType = SYMBOL_UPDATE_COMMAND;

  constructor(
    operator: UPDATE_COMMANDS_LITERAL,
    operands?: any,
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
  }
}

export default UpdateCommand;
