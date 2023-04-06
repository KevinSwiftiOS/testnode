import { EJSON } from 'bson';
import { isObject } from './type';
export const sleep = (ms = 0) => new Promise(r => setTimeout(r, ms));
const counters = {};
export const autoCount = (domain = 'any') => {
    if (!counters[domain]) {
        counters[domain] = 0;
    }
    return counters[domain]++;
};
export const getReqOpts = (apiOptions) => {
    if (apiOptions.timeout !== undefined) {
        return {
            timeout: apiOptions.timeout
        };
    }
    return {};
};
export const filterUndefined = o => {
    if (!isObject(o)) {
        return o;
    }
    for (let key in o) {
        if (o[key] === undefined) {
            delete o[key];
        }
        else if (isObject(o[key])) {
            o[key] = filterUndefined(o[key]);
        }
    }
    return o;
};
export const stringifyByEJSON = params => {
    params = filterUndefined(params);
    return EJSON.stringify(params, { relaxed: false });
};
export const parseByEJSON = params => {
    return EJSON.parse(params);
};
export class TcbError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code;
        this.message = error.message;
    }
}
export const E = (errObj) => {
    return new TcbError(errObj);
};
export function processReturn(throwOnCode, res) {
    if (throwOnCode === false) {
        return res;
    }
    throw E(Object.assign({}, res));
}
