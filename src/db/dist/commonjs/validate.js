"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const util_1 = require("./util");
const code_1 = require("./const/code");
const utils_1 = require("./utils/utils");
const type_1 = require("./utils/type");
const symbol_1 = require("./helper/symbol");
const validOptionsKeys = ['limit', 'offset', 'projection', 'order', 'multiple', 'timeout', 'raw'];
class Validate {
    static isGeopoint(point, degree) {
        if (util_1.Util.whichType(degree) !== constant_1.FieldType.Number) {
            throw new Error('Geo Point must be number type');
        }
        const degreeAbs = Math.abs(degree);
        if (point === 'latitude' && degreeAbs > 90) {
            throw new Error('latitude should be a number ranges from -90 to 90');
        }
        else if (point === 'longitude' && degreeAbs > 180) {
            throw new Error('longitude should be a number ranges from -180 to 180');
        }
        return true;
    }
    static isInteger(param, num) {
        if (!Number.isInteger(num)) {
            throw new Error(param + constant_1.ErrorCode.IntergerError);
        }
        return true;
    }
    static mustBeBoolean(param, bool) {
        if (typeof bool !== 'boolean') {
            throw new Error(param + constant_1.ErrorCode.BooleanError);
        }
        return true;
    }
    static isProjection(param, value) {
        if (type_1.getType(value) !== 'object') {
            throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `${param} projection must be an object` }));
        }
        for (const key in value) {
            const subValue = value[key];
            if (type_1.getType(subValue) === 'number') {
                if (subValue !== 0 && subValue !== 1) {
                    throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `if the value in projection is of number, it must be 0 or 1` }));
                }
            }
            else if (type_1.getType(subValue) === 'object') {
            }
            else {
                throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: 'invalid projection' }));
            }
        }
        return true;
    }
    static isOrder(param, value) {
        if (type_1.getType(value) !== 'object') {
            throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `${param} order must be an object` }));
        }
        for (let key in value) {
            const subValue = value[key];
            if (subValue !== 1 && subValue !== -1) {
                throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `order value must be 1 or -1` }));
            }
        }
        return true;
    }
    static isFieldOrder(direction) {
        if (constant_1.OrderDirectionList.indexOf(direction) === -1) {
            throw new Error(constant_1.ErrorCode.DirectionError);
        }
        return true;
    }
    static isFieldPath(path) {
        if (!/^[a-zA-Z0-9-_\.]/.test(path)) {
            throw new Error();
        }
        return true;
    }
    static isOperator(op) {
        if (constant_1.WhereFilterOpList.indexOf(op) === -1) {
            throw new Error(constant_1.ErrorCode.OpStrError);
        }
        return true;
    }
    static isCollName(name) {
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-_]){1,32}$/.test(name)) {
            throw new Error(constant_1.ErrorCode.CollNameError);
        }
        return true;
    }
    static isDocID(docId) {
        if (!/^([a-fA-F0-9]){24}$/.test(docId)) {
            throw new Error(constant_1.ErrorCode.DocIDError);
        }
        return true;
    }
    static isValidOptions(options = {}) {
        if (type_1.getType(options) !== 'object') {
            throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `options must be an object` }));
        }
        const keys = Object.keys(options);
        for (const index in keys) {
            if (validOptionsKeys.indexOf(keys[index]) < 0) {
                throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `${keys[index]} is invalid options key` }));
            }
        }
        const { limit, offset, projection, order } = options;
        const { multiple } = options;
        if (limit !== undefined) {
            Validate.isInteger('limit', limit);
        }
        if (offset !== undefined) {
            Validate.isInteger('offset', offset);
        }
        if (projection !== undefined) {
            Validate.isProjection('projection', projection);
        }
        if (order !== undefined) {
            Validate.isOrder('order', order);
        }
        if (multiple !== undefined) {
            Validate.mustBeBoolean('multiple', multiple);
        }
        if (options.timeout !== undefined) {
            Validate.isInteger('timeout', options.timeout);
        }
        return true;
    }
    static isValidAggregation(stage) {
        if (Object.keys(stage).length !== 1) {
            throw utils_1.E(Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: `aggregation stage must have one key` }));
        }
        return true;
    }
    static isCentersPhere(param) {
        if (Array.isArray(param) && param.length === 2) {
            if (type_1.getType(param[0]) === 'object' &&
                param[0]._internalType === symbol_1.SYMBOL_GEO_POINT &&
                typeof param[1] === 'number') {
                return true;
            }
            if (Array.isArray(param[0]) && param[0].length === 2) {
                const longitude = param[0][0];
                const latitude = param[0][1];
                Validate.isGeopoint('longitude', longitude);
                Validate.isGeopoint('latitude', latitude);
                if (typeof param[1] === 'number') {
                    return true;
                }
            }
        }
        throw new Error(`${constant_1.ErrorCode.CentersPhereError}`);
    }
}
exports.Validate = Validate;