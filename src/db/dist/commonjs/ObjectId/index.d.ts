export declare class ObjectId {
    id: string;
    constructor({ id }?: {
        id?: string;
    });
    readonly _internalType: import("../utils/symbol").InternalSymbol;
    parse(): {
        $oid: string;
    };
}
export declare function ObjectIdConstructor(opt: any): ObjectId;
