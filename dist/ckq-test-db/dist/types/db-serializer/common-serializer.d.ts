import { LogicBaseCommand } from '../commands/logic-command';
export declare type IQueryCondition = Record<string, any> | LogicBaseCommand;
export declare function flattenQueryObject(query: Record<string, any>): Record<string, any>;
export declare function isConversionRequired(val: any): boolean;
export declare function encodeDataType(val: any): IQueryCondition;
