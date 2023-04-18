export declare const getType: (x: any) => string;
export declare const isObject: <T extends Record<string, unknown>>(x: any) => x is T;
export declare const isString: (x: any) => x is string;
export declare const isArray: <T extends any[] = any[]>(x: any) => x is T;
export declare const isDate: (x: any) => x is Date;
export declare const isRegExp: (x: any) => x is RegExp;
export declare const isInternalObject: (x: any) => boolean;
export interface GetRes {
    data: Array<any>;
    requestId: string;
}
export interface CountRes {
    total: number;
    requestId: string;
}
export interface UpdateRes {
    updated: number;
    requestId: string;
}
export interface RemoveRes {
    deleted: number;
    requestId: string;
}
export interface AddRes {
    id: string;
    requestId: string;
}
