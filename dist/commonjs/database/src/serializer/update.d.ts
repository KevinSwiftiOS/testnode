import { LogicCommand } from '../commands/logic';
import { UpdateCommand } from '../commands/update';
export type IQueryCondition = Record<string, any> | LogicCommand;
export interface IUpdateCondition {
    [key: string]: any;
}
export declare class UpdateSerializer {
    static encodeEJSON(query: IQueryCondition | UpdateCommand): string;
    encodeUpdate(query: IQueryCondition | UpdateCommand): IUpdateCondition;
    encodeUpdateObject(query: Record<string, any>): IQueryCondition;
    encodeUpdateCommand(query: UpdateCommand): IQueryCondition;
    encodeFieldUpdateCommand(query: UpdateCommand): IQueryCondition;
}
