export declare class RegExp {
    $regularExpression?: {
        pattern?: string;
        options?: string;
    };
    constructor({ regexp, options }: {
        regexp: any;
        options: any;
    });
    parse(): {
        $regularExpression: {
            pattern: string;
            options: string;
        };
    };
    readonly _internalType: import("../utils/symbol").InternalSymbol;
}
export declare function RegExpConstructor(param: any): RegExp;