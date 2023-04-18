export declare const ERRORS: {
    INVALID_PARAM: {
        errorCode: number;
        errMsg: string;
    };
    DATABASE_REQUEST_FAILED: {
        errorCode: number;
        errMsg: string;
    };
};
export declare enum ErrorMsg {
    DocIDError = "\u6587\u6863ID\u4E0D\u5408\u6CD5",
    CollNameError = "\u96C6\u5408\u540D\u79F0\u4E0D\u5408\u6CD5",
    OpStrError = "\u64CD\u4F5C\u7B26\u4E0D\u5408\u6CD5",
    DirectionError = "\u6392\u5E8F\u5B57\u7B26\u4E0D\u5408\u6CD5",
    IntergerError = "\u5FC5\u987B\u662F\u4E00\u4E2A\u6574\u578B",
    BooleanError = "\u5FC5\u987B\u662F\u4E00\u4E2A\u5E03\u5C14\u7C7B\u578B",
    ArrayError = "\u5FC5\u987B\u4E3A\u4E00\u4E2A\u6570\u7EC4",
    QueryParamTypeError = "\u67E5\u8BE2\u53C2\u6570\u5FC5\u987B\u4E3A\u5BF9\u8C61",
    QueryParamValueError = "\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61\u503C\u4E0D\u80FD\u5747\u4E3Aundefined",
    CentersPhereError = "centersPhere\u7ED3\u6784\u4E0D\u5408\u6CD5"
}
interface ErrorConstructorOptions {
    errorCode?: number;
    errMsg: string;
}
export declare class DataBaseError extends Error {
    errorCode: number;
    errMsg: string;
    requestID?: string;
    constructor(options: ErrorConstructorOptions);
}
export {};
