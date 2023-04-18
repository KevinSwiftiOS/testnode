import { LOGIC_COMMANDS_LITERAL, LogicCommand } from './commands/logic';
import { QUERY_COMMANDS_LITERAL, QueryCommand } from './commands/query';
import { isArray } from './typings';
export type IQueryCondition = Record<string, any> | LogicCommand;

export const Command = {
  eq(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.EQ, [val]);
  },

  neq(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [val]);
  },

  lt(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.LT, [val]);
  },

  lte(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.LTE, [val]);
  },

  gt(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.GT, [val]);
  },

  gte(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.GTE, [val]);
  },

  in(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.IN, val);
  },

  nin(val: any) {
    return new QueryCommand(QUERY_COMMANDS_LITERAL.NIN, val);
  },

  and(...args: IQueryCondition[]) {
    const expressions = isArray(args[0]) ? args[0] : args;
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions);
  },

  nor(...args: IQueryCondition[]) {
    const expressions = isArray(args[0]) ? args[0] : args;
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOR, expressions);
  },

  or(...args: IQueryCondition[]) {
    const expressions = isArray(args[0]) ? args[0] : args;
    return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions);
  },
};

export default Command;
