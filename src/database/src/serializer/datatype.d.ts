import { LogicCommand } from '../commands/logic';
export type IQueryCondition = Record<string, any> | LogicCommand;
export type AnyObject = {
    [x: string]: any;
};
export declare function serialize(val: any): IQueryCondition;
