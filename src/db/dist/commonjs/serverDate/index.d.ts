export declare class ServerDate {
    readonly offset: number;
    constructor({ offset }?: {
        offset?: number;
    });
    readonly _internalType: import("../utils/symbol").InternalSymbol;
    parse(): {
        $tcb_server_date: {
            offset: number;
        };
    };
}
export declare function ServerDateConstructor(opt: any): ServerDate;