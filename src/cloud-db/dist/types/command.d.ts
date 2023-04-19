import { LogicCommand } from './commands/logic';
import { QueryCommand } from './commands/query';
export declare type IQueryCondition = Record<string, any> | LogicCommand;
export declare const Command: {
    eq(val: any): QueryCommand;
    neq(val: any): QueryCommand;
    lt(val: any): QueryCommand;
    lte(val: any): QueryCommand;
    gt(val: any): QueryCommand;
    gte(val: any): QueryCommand;
    in(val: any): QueryCommand;
    nin(val: any): QueryCommand;
    and(...args: IQueryCondition[]): LogicCommand;
    nor(...args: IQueryCondition[]): LogicCommand;
    or(...args: IQueryCondition[]): LogicCommand;
};
export default Command;
