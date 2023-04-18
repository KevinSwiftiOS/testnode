"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeInternalDataType = exports.isConversionRequired = exports.mergeConditionAfterEncode = exports.flattenQueryObject = void 0;
const Errors_1 = require("../Errors");
const typings_1 = require("../typings");
const datatype_1 = require("./datatype");
function flattenQueryObject(query) {
    return flatten(query, isConversionRequired, [], [query]);
}
exports.flattenQueryObject = flattenQueryObject;
function flatten(query, shouldPreserverObject, parents, visited) {
    const cloned = Object.assign({}, query);
    for (const key in query) {
        if (/^\$/.test(key)) {
            continue;
        }
        const value = query[key];
        if (value === undefined) {
            delete cloned[key];
            continue;
        }
        if (!value) {
            continue;
        }
        if ((0, typings_1.isObject)(value) && !shouldPreserverObject(value)) {
            if (visited.includes(value)) {
                throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: '不能将循环结构转换为JSON' }));
            }
            const newParents = [...parents, key];
            const newVisited = [...visited, value];
            const flattenedChild = flatten(value, shouldPreserverObject, newParents, newVisited);
            cloned[key] = flattenedChild;
            let hasKeyNotCombined = false;
            for (const childKey in flattenedChild) {
                if (!/^\$/.test(childKey)) {
                    cloned[`${key}.${childKey}`] = flattenedChild[childKey];
                    delete cloned[key][childKey];
                }
                else {
                    hasKeyNotCombined = true;
                }
            }
            if (!hasKeyNotCombined) {
                delete cloned[key];
            }
        }
    }
    return cloned;
}
function mergeConditionAfterEncode(query, condition, key) {
    if (!condition[key]) {
        delete query[key];
    }
    for (const conditionKey in condition) {
        if (query[conditionKey]) {
            if ((0, typings_1.isArray)(query[conditionKey])) {
                query[conditionKey].push(condition[conditionKey]);
            }
            else if ((0, typings_1.isObject)(query[conditionKey])) {
                if ((0, typings_1.isObject)(condition[conditionKey])) {
                    Object.assign(query[conditionKey], condition[conditionKey]);
                }
                else {
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                query[conditionKey] = condition[conditionKey];
            }
        }
        else {
            query[conditionKey] = condition[conditionKey];
        }
    }
}
exports.mergeConditionAfterEncode = mergeConditionAfterEncode;
function isConversionRequired(val) {
    return (0, typings_1.isInternalObject)(val) || (0, typings_1.isDate)(val) || (0, typings_1.isRegExp)(val);
}
exports.isConversionRequired = isConversionRequired;
function encodeInternalDataType(val) {
    return (0, datatype_1.serialize)(val);
}
exports.encodeInternalDataType = encodeInternalDataType;
