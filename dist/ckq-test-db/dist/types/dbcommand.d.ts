import { LogicBaseCommand } from './commands/logic-command';
import { QueryCommand } from './commands/query-command';
export declare type IQueryCondition = Record<string, any> | LogicBaseCommand;
export declare const DbCommand: {
    eq: (val: any) => QueryCommand;
    neq: (val: any) => QueryCommand;
    lt: (val: any) => QueryCommand;
    lte: (val: any) => QueryCommand;
    gt: (val: any) => QueryCommand;
    gte: (val: any) => QueryCommand;
    in: (val: any) => QueryCommand;
    nin: (val: any) => QueryCommand;
    and: (...args: IQueryCondition[]) => LogicBaseCommand;
    nor: (...args: IQueryCondition[]) => LogicBaseCommand;
    or: (...args: IQueryCondition[]) => LogicBaseCommand;
};
export default DbCommand;
