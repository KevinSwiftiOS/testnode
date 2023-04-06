import { LogicCommand, LOGIC_COMMANDS_LITERAL } from './commands/logic';
import { QUERY_COMMANDS_LITERAL, QueryCommand } from './commands/query';
import { isArray } from './utils/type'
export type IQueryCondition = Record<string, any> | LogicCommand;

export const Command = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  eq(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.EQ, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  neq(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  lt(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.LT, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  lte(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.LTE, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  gt(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.GT, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  gte(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.GTE, [val]);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  in(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.IN, val);
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  nin(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.NIN, val);
  },
  and(...__expressions__: IQueryCondition[]) {
    const expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments)
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions)
  },

  nor(...__expressions__: IQueryCondition[]) {
    const expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments)
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOR, expressions)
  },

  or(...__expressions__: IQueryCondition[]) {
    const expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments)
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions)
  },

  not(...__expressions__: IQueryCondition[]) {
    const expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments)
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOT, expressions)
  },
};

export default Command;
