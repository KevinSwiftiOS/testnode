import { QueryCommand } from '../commands/query';
import { LogicCommand } from '../commands/logic';
export declare type IQueryCondition = Record<string, any> | LogicCommand;
export declare class QuerySerializer {
    constructor();
    static encode(query: IQueryCondition | QueryCommand | LogicCommand): IQueryCondition;
    static encodeEJSON(query: IQueryCondition | QueryCommand | LogicCommand, raw: boolean): string;
}