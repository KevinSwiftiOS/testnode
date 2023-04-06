import { ErrorCode, WhereFilterOpList, OrderDirectionList, FieldType } from './constant';
import { Util } from './util';
import { ERRORS } from './const/code';
import { E } from './utils/utils';
import { getType } from './utils/type';
import { SYMBOL_GEO_POINT } from './helper/symbol';
const validOptionsKeys = ['limit', 'offset', 'projection', 'order', 'multiple', 'timeout', 'raw'];
export class Validate {
    static isGeopoint(point, degree) {
        if (Util.whichType(degree) !== FieldType.Number) {
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
            throw new Error(param + ErrorCode.IntergerError);
        }
        return true;
    }
    static mustBeBoolean(param, bool) {
        if (typeof bool !== 'boolean') {
            throw new Error(param + ErrorCode.BooleanError);
        }
        return true;
    }
    static isProjection(param, value) {
        if (getType(value) !== 'object') {
            throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `${param} projection must be an object` }));
        }
        for (const key in value) {
            const subValue = value[key];
            if (getType(subValue) === 'number') {
                if (subValue !== 0 && subValue !== 1) {
                    throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `if the value in projection is of number, it must be 0 or 1` }));
                }
            }
            else if (getType(subValue) === 'object') {
            }
            else {
                throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: 'invalid projection' }));
            }
        }
        return true;
    }
    static isOrder(param, value) {
        if (getType(value) !== 'object') {
            throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `${param} order must be an object` }));
        }
        for (let key in value) {
            const subValue = value[key];
            if (subValue !== 1 && subValue !== -1) {
                throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `order value must be 1 or -1` }));
            }
        }
        return true;
    }
    static isFieldOrder(direction) {
        if (OrderDirectionList.indexOf(direction) === -1) {
            throw new Error(ErrorCode.DirectionError);
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
        if (WhereFilterOpList.indexOf(op) === -1) {
            throw new Error(ErrorCode.OpStrError);
        }
        return true;
    }
    static isCollName(name) {
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-_]){1,32}$/.test(name)) {
            throw new Error(ErrorCode.CollNameError);
        }
        return true;
    }
    static isDocID(docId) {
        if (!/^([a-fA-F0-9]){24}$/.test(docId)) {
            throw new Error(ErrorCode.DocIDError);
        }
        return true;
    }
    static isValidOptions(options = {}) {
        if (getType(options) !== 'object') {
            throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `options must be an object` }));
        }
        const keys = Object.keys(options);
        for (const index in keys) {
            if (validOptionsKeys.indexOf(keys[index]) < 0) {
                throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `${keys[index]} is invalid options key` }));
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
            throw E(Object.assign(Object.assign({}, ERRORS.INVALID_PARAM), { message: `aggregation stage must have one key` }));
        }
        return true;
    }
    static isCentersPhere(param) {
        if (Array.isArray(param) && param.length === 2) {
            if (getType(param[0]) === 'object' &&
                param[0]._internalType === SYMBOL_GEO_POINT &&
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
        throw new Error(`${ErrorCode.CentersPhereError}`);
    }
}