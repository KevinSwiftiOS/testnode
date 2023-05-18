import { InternalSymbol } from '../symbols';
export declare enum LOGIC_COMMANDS_ENUMS {
    OR_COMMAND = "or",
    NOR_COMMAND = "nor",
    AND_COMMAND = "and"
}
export declare class LogicBaseCommand {
    name: string | InternalSymbol;
    handle: string;
    objects: any[];
    _internalType: InternalSymbol;
    constructor(handle: LOGIC_COMMANDS_ENUMS | string, objects: any, name?: string | InternalSymbol);
    _setName(name: string): LogicBaseCommand;
    and(...args: LogicBaseCommand[]): LogicBaseCommand;
    or(...args: LogicBaseCommand[]): LogicBaseCommand;
}
export declare function isLogicBaseCommand(object: any): object is LogicBaseCommand;
export default LogicBaseCommand;
