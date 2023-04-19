import { InternalSymbol, SYMBOL_QUERY_COMMAND } from '../Symbols';
import { LogicCommand } from './logic';

export const EQ = 'eq';
export const NEQ = 'neq';
export const GT = 'gt';
export const GTE = 'gte';
export const LT = 'lt';
export const LTE = 'lte';
export const IN = 'in';
export const NIN = 'nin';
export const ALL = 'all';
export const ELEM_MATCH = 'elemMatch';
export const EXISTS = 'exists';
export const SIZE = 'size';
export const MOD = 'mod';

export enum QUERY_COMMANDS_LITERAL {
  EQ = 'eq',
  NEQ = 'neq',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  IN = 'in',
  NIN = 'nin',
  ALL = 'all',
  ELEM_MATCH = 'elemMatch',
  EXISTS = 'exists',
  SIZE = 'size',
  MOD = 'mod',
  GEO_NEAR = 'geoNear',
  GEO_WITHIN = 'geoWithin',
  GEO_INTERSECTS = 'geoIntersects',
}

export class QueryCommand extends LogicCommand {
  operator: QUERY_COMMANDS_LITERAL;

  constructor(
    operator: QUERY_COMMANDS_LITERAL,
    operands: any,
    fieldName?: string | InternalSymbol
  ) {
    super(operator, operands, fieldName);
    this.operator = operator;
    this._internalType = SYMBOL_QUERY_COMMAND;
  }

  toJSON() {
    switch (this.operator) {
      case QUERY_COMMANDS_LITERAL.IN:
      case QUERY_COMMANDS_LITERAL.NIN:
        return {
          [`$${this.operator}`]: this.operands,
        };
      case QUERY_COMMANDS_LITERAL.NEQ:
        return {
          $ne: this.operands[0],
        };
      default:
        return {
          [`$${this.operator}`]: this.operands[0],
        };
    }
  }

  _setFieldName(fieldName: string): QueryCommand {
    const command = new QueryCommand(this.operator, this.operands, fieldName);
    return command;
  }

  eq(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.EQ,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  neq(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.NEQ,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  gt(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.GT,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  gte(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.GTE,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  lt(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.LT,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  lte(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.LTE,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  in(list: any[]) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.IN,
      list,
      this.fieldName
    );
    return this.and(command);
  }

  nin(list: any[]) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.NIN,
      list,
      this.fieldName
    );
    return this.and(command);
  }
}

export function isQueryCommand(object: any): object is QueryCommand {
  return (
    object &&
    object instanceof QueryCommand &&
    object._internalType === SYMBOL_QUERY_COMMAND
  );
}

export function isComparisonCommand(object: any): object is QueryCommand {
  return isQueryCommand(object);
}

export default QueryCommand;
