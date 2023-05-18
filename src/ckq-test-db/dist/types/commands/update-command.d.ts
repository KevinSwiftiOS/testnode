/**
 *  This file may have been modified by ByteDance Ltd.
 */
import { InternalSymbol } from '../symbols';
export declare enum UPDATE_COMMANDS_ENUMS {
    SET_COMMAND = "set"
}
export declare class UpdateCommand {
    name: string | InternalSymbol;
    handle: UPDATE_COMMANDS_ENUMS;
    objects: any;
    _internalType: InternalSymbol;
    constructor(handle: UPDATE_COMMANDS_ENUMS, objects?: any, name?: string | InternalSymbol);
}
export default UpdateCommand;
