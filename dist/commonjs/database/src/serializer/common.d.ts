import { LogicCommand } from '../commands/logic';
export type IQueryCondition = Record<string, any> | LogicCommand;
export type AnyObject = {
    [x: string]: any;
};
export declare function flattenQueryObject(query: Record<string, any>): Record<string, any>;
export declare function mergeConditionAfterEncode(query: Record<string, any>, condition: Record<string, any>, key: string): void;
export declare function isConversionRequired(val: any): boolean;
export declare function encodeInternalDataType(val: any): IQueryCondition;
