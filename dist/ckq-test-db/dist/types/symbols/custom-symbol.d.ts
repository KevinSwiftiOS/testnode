declare class CustomSymbol {
    constructor(target: any);
}
export declare class InternalSymbol extends CustomSymbol {
    constructor(tar: any, __mark__: any);
    static for(tar: any): InternalSymbol;
}
export {};
