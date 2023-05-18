import { LogicBaseCommand } from '../commands/logic-command';
import { UpdateCommand } from '../commands/update-command';
export declare type IQueryCondition = Record<string, any> | LogicBaseCommand;
export interface IUpdateCondition {
    [key: string]: any;
}
export declare class UpdateSerializer {
    static encodeEJSON(query: IQueryCondition | UpdateCommand): string;
    encodeUpdate(query: IQueryCondition | UpdateCommand): IUpdateCondition;
    encodeUpdateObject(query: Record<string, any>): IQueryCondition;
    encodeUpdateCommand(query: UpdateCommand): IQueryCondition;
    encodeFieldUpdateCommand(query: UpdateCommand): IQueryCondition;
    merge(query: Record<string, any>, condition: Record<string, any>, key: string): void;
}
