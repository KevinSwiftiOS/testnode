/* eslint-disable no-useless-computed-key */
import { InternalSymbol, SYMBOL_QUERY_COMMAND } from '../helper/symbol';
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
  // eslint-disable-next-line @typescript-eslint/no-shadow
  EQ = 'eq',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  NEQ = 'neq',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  GT = 'gt',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  GTE = 'gte',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  LT = 'lt',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  LTE = 'lte',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  IN = 'in',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  NIN = 'nin',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ALL = 'all',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ELEM_MATCH = 'elemMatch',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  EXISTS = 'exists',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  SIZE = 'size',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  MOD = 'mod',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  GEO_NEAR = 'geoNear',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  GEO_WITHIN = 'geoWithin',
  // eslint-disable-next-line @typescript-eslint/no-shadow
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    this.operator = operator;
    this._internalType = SYMBOL_QUERY_COMMAND;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  toJSON() {
    switch (this.operator) {
      case QUERY_COMMANDS_LITERAL.IN:
      case QUERY_COMMANDS_LITERAL.NIN:
        return {
          [`$${this.operator}`]: this.operands,
        };
      case QUERY_COMMANDS_LITERAL.NEQ:
        return {
          ['$ne']: this.operands[0],
        };
      default:
        return {
          [`$${this.operator}`]: this.operands[0],
        };
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _setFieldName(fieldName: string): QueryCommand {
    const command = new QueryCommand(this.operator, this.operands, fieldName);
    return command;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  eq(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.EQ,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  neq(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.NEQ,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  gt(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.GT,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  gte(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.GTE,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  lt(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.LT,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  lte(val: any) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.LTE,
      [val],
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  in(list: any[]) {
    const command = new QueryCommand(
      QUERY_COMMANDS_LITERAL.IN,
      list,
      this.fieldName
    );
    return this.and(command);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

export function isKnownQueryCommand(object: any): object is QueryCommand {
  return (
    isQueryCommand(object) &&
    object.operator.toUpperCase() in QUERY_COMMANDS_LITERAL
  );
}

export function isComparisonCommand(object: any): object is QueryCommand {
  return isQueryCommand(object);
}

export default QueryCommand;
