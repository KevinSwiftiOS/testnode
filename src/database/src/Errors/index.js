"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = exports.ErrorMsg = exports.ERRORS = void 0;
exports.ERRORS = {
    INVALID_PARAM: {
        errorCode: 156401,
        errMsg: '非法参数',
    },
    DATABASE_REQUEST_FAILED: {
        errorCode: 156402,
        errMsg: '请求失败',
    },
};
var ErrorMsg;
(function (ErrorMsg) {
    ErrorMsg["DocIDError"] = "\u6587\u6863ID\u4E0D\u5408\u6CD5";
    ErrorMsg["CollNameError"] = "\u96C6\u5408\u540D\u79F0\u4E0D\u5408\u6CD5";
    ErrorMsg["OpStrError"] = "\u64CD\u4F5C\u7B26\u4E0D\u5408\u6CD5";
    ErrorMsg["DirectionError"] = "\u6392\u5E8F\u5B57\u7B26\u4E0D\u5408\u6CD5";
    ErrorMsg["IntergerError"] = "\u5FC5\u987B\u662F\u4E00\u4E2A\u6574\u578B";
    ErrorMsg["BooleanError"] = "\u5FC5\u987B\u662F\u4E00\u4E2A\u5E03\u5C14\u7C7B\u578B";
    ErrorMsg["ArrayError"] = "\u5FC5\u987B\u4E3A\u4E00\u4E2A\u6570\u7EC4";
    ErrorMsg["QueryParamTypeError"] = "\u67E5\u8BE2\u53C2\u6570\u5FC5\u987B\u4E3A\u5BF9\u8C61";
    ErrorMsg["QueryParamValueError"] = "\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61\u503C\u4E0D\u80FD\u5747\u4E3Aundefined";
    ErrorMsg["CentersPhereError"] = "centersPhere\u7ED3\u6784\u4E0D\u5408\u6CD5";
})(ErrorMsg = exports.ErrorMsg || (exports.ErrorMsg = {}));
class DataBaseError extends Error {
    constructor(options) {
        super(options.errMsg);
        this.errorCode = 0;
        Object.defineProperties(this, {
            message: {
                get() {
                    return `errCode: ${this.errorCode || ''} | errMsg: ${this.errMsg}`;
                },
                set(msg) {
                    this.errMsg = msg;
                },
            },
        });
        this.errorCode = options.errorCode || 0;
        this.errMsg = options.errMsg || '';
    }
}
exports.DataBaseError = DataBaseError;
