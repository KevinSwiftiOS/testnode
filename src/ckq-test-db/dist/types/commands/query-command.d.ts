/**
 *  This file may have been modified by ByteDance Ltd.
 */
import { InternalSymbol } from '../symbols';
import { LogicBaseCommand } from './logic-command';
export declare enum QUERY_COMMANDS__ENUMS {
    EQ_COMMAND = "eq",
    NEQ_COMMAND = "neq",
    GT_COMMAND = "gt",
    GTE_COMMAND = "gte",
    LT_COMMAND = "lt",
    LTE_COMMAND = "lte",
    IN_COMMAND = "in",
    NIN_COMMAND = "nin"
}
export declare class QueryCommand extends LogicBaseCommand {
    handle: QUERY_COMMANDS__ENUMS;
    constructor(handle: QUERY_COMMANDS__ENUMS, objects: any, name?: string | InternalSymbol);
    toJSON(): {
        $ne: any;
    } | {
        [x: string]: any;
        $ne?: undefined;
    };
    _setName(name: string): QueryCommand;
    eq: (right: any) => LogicBaseCommand;
    neq(right: any): LogicBaseCommand;
    gt(right: any): LogicBaseCommand;
    gte(right: any): LogicBaseCommand;
    lt(right: any): LogicBaseCommand;
    lte(arrs: any): LogicBaseCommand;
    in(arrs: any[]): LogicBaseCommand;
    nin(arrs: any[]): LogicBaseCommand;
}
export declare function isComparisonCommand(object: any): object is QueryCommand;
export default QueryCommand;
