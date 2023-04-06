import { QueryOption, UpdateOption } from '../query';
export declare const sleep: (ms?: number) => Promise<unknown>;
export declare const autoCount: (domain?: string) => number;
export declare const getReqOpts: (apiOptions: QueryOption | UpdateOption) => any;
export declare const filterUndefined: (o: any) => any;
export declare const stringifyByEJSON: (params: any) => any;
export declare const parseByEJSON: (params: any) => any;
export declare class TcbError extends Error {
    readonly code: string;
    readonly message: string;
    constructor(error: IErrorInfo);
}
export declare const E: (errObj: IErrorInfo) => TcbError;
export declare function processReturn(throwOnCode: boolean, res: any): any;
interface IErrorInfo {
    code?: string;
    message?: string;
}
export {};