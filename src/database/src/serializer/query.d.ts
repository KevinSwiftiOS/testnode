import { LogicCommand } from '../commands/logic';
import { QueryCommand } from '../commands/query';
export type IQueryCondition = Record<string, any> | LogicCommand;
export declare const QuerySerializer: {
    encodeEJSON(query: IQueryCondition | QueryCommand | LogicCommand): string;
};
export declare class QueryEncoder {
    encodeQuery(query: IQueryCondition | QueryCommand | LogicCommand, _?: any): IQueryCondition;
    encodeLogicCommand(query: LogicCommand): IQueryCondition;
    encodeQueryCommand(query: QueryCommand): IQueryCondition;
    encodeComparisonCommand(query: QueryCommand): IQueryCondition;
    encodeQueryObject(query: IQueryCondition): IQueryCondition;
    mergeConditionAfterEncode(query: Record<string, any>, condition: Record<string, any>, key: string): void;
}
