"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const error_1 = require("../error");
const Symbols_1 = require("../Symbols");
const typings_1 = require("../typings");
function serialize(val) {
    return serializeHelper(val, [val]);
}
exports.serialize = serialize;
function serializeHelper(val, visited) {
    if ((0, typings_1.isInternalObject)(val)) {
        switch (val._internalType) {
            case Symbols_1.SYMBOL_SERVER_DATE: {
                return val.parse();
            }
            case Symbols_1.SYMBOL_OBJECTID: {
                return val.parse();
            }
            default: {
                return val.toJSON ? val.toJSON() : val;
            }
        }
    }
    else if ((0, typings_1.isDate)(val)) {
        return val;
    }
    else if ((0, typings_1.isArray)(val)) {
        return val.map((item) => {
            if (visited.includes(item)) {
                throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.common.PRESERVER_ERROR }));
            }
            return serializeHelper(item, [...visited, item]);
        });
    }
    else if ((0, typings_1.isObject)(val)) {
        const rawRet = Object.assign({}, val);
        const finalRet = {};
        for (const key of Object.keys(rawRet)) {
            if (visited.includes(rawRet[key])) {
                throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.common.PRESERVER_ERROR }));
            }
            if (rawRet[key] !== undefined) {
                // 过滤掉undefined
                finalRet[key] = serializeHelper(rawRet[key], [...visited, rawRet[key]]);
            }
        }
        return finalRet;
    }
    else {
        return val;
    }
}
//# sourceMappingURL=datatype.js.map