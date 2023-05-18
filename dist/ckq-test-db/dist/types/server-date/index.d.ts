import { InternalSymbol } from '../symbols';
export interface ServerDateParam {
    offset: number;
}
export declare class ServerDate {
    readonly offset: number;
    static isHasServerDate: boolean;
    static resetHasServerDate(): void;
    static setHasServerDate(value: any): void;
    static getServerDate(): boolean;
    constructor({ offset }?: {
        offset?: number;
    });
    get _internalType(): InternalSymbol;
    parse(): Record<string, any>;
}
export declare function ServerDateConstructor(opt?: ServerDateParam): ServerDate;
