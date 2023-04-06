"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const type_1 = require("./type");
exports.sleep = (ms = 0) => new Promise(r => setTimeout(r, ms));
const counters = {};
exports.autoCount = (domain = 'any') => {
    if (!counters[domain]) {
        counters[domain] = 0;
    }
    return counters[domain]++;
};
exports.getReqOpts = (apiOptions) => {
    if (apiOptions.timeout !== undefined) {
        return {
            timeout: apiOptions.timeout
        };
    }
    return {};
};
exports.filterUndefined = o => {
    if (!type_1.isObject(o)) {
        return o;
    }
    for (let key in o) {
        if (o[key] === undefined) {
            delete o[key];
        }
        else if (type_1.isObject(o[key])) {
            o[key] = exports.filterUndefined(o[key]);
        }
    }
    return o;
};
exports.stringifyByEJSON = params => {
    params = exports.filterUndefined(params);
    return bson_1.EJSON.stringify(params, { relaxed: false });
};
exports.parseByEJSON = params => {
    return bson_1.EJSON.parse(params);
};
class TcbError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code;
        this.message = error.message;
    }
}
exports.TcbError = TcbError;
exports.E = (errObj) => {
    return new TcbError(errObj);
};
function processReturn(throwOnCode, res) {
    if (throwOnCode === false) {
        return res;
    }
    throw exports.E(Object.assign({}, res));
}
exports.processReturn = processReturn;
