import { InternalSymbol } from '../Symbols';
export declare const AND = "and";
export declare const OR = "or";
export declare const NOR = "nor";
export declare enum LOGIC_COMMANDS_LITERAL {
    AND = "and",
    OR = "or",
    NOR = "nor"
}
export declare class LogicCommand {
    fieldName: string | InternalSymbol;
    operator: LOGIC_COMMANDS_LITERAL | string;
    operands: any[];
    _internalType: InternalSymbol;
    constructor(operator: LOGIC_COMMANDS_LITERAL | string, operands: any, fieldName?: string | InternalSymbol);
    _setFieldName(fieldName: string): LogicCommand;
    and(...args: LogicCommand[]): LogicCommand;
    or(...args: LogicCommand[]): LogicCommand;
}
export declare function isLogicCommand(object: any): object is LogicCommand;
export default LogicCommand;
