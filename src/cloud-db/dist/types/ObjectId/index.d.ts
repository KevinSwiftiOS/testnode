export declare class ObjectId {
    id: string;
    constructor({ id }?: {
        id?: string;
    });
    get _internalType(): import("../Symbols").InternalSymbol;
    parse(): {
        $oid: string;
    };
}
export declare function ObjectIdConstructor(opt: any): ObjectId;
