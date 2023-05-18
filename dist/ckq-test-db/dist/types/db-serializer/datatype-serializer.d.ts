import { LogicBaseCommand } from '../commands/logic-command';
export declare type IQueryCondition = Record<string, any> | LogicBaseCommand;
export declare type AnyObject = {
    [x: string]: any;
};
export declare function serialize(val: any): IQueryCondition;
