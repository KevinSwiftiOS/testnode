"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRequestServerDateParams = exports.hasOwnProperty = exports.stringifyByEJSON = exports.filterUndefined = exports.Util = void 0;
const bson_1 = require("bson");
const bson_2 = require("bson");
const constant_1 = require("./constant");
const serverDate_1 = require("./serverDate");
const typings_1 = require("./typings");
/**
 * 工具模块
 *
 *
 */
exports.Util = {
    /**
     * 格式化后端返回的文档数据
     *
     * @param document - 后端文档数据
     */
    formatResDocumentData: (documents) => documents.map((document) => exports.Util.formatField(document)),
    /**
     * 格式化字段
     *
     * 主要是递归数组和对象，把地理位置和日期时间转换为js对象。
     *
     * @param document
     * @internal
     */
    formatField: (document) => {
        const keys = Object.keys(document);
        let protoField = {};
        // 数组递归的情况
        if (Array.isArray(document)) {
            protoField = [];
        }
        for (const key of keys) {
            const item = document[key];
            let realValue;
            const type = exports.Util.whichType(item);
            switch (type) {
                case constant_1.FieldType.Date:
                    realValue = item;
                    break;
                case constant_1.FieldType.Object:
                    // 对id 字段做校验
                    if (key === '_id' && bson_1.ObjectId.isValid(item)) {
                        try {
                            realValue = item.toString();
                        }
                        catch (_a) {
                            realValue = '';
                        }
                    }
                    else {
                        realValue = exports.Util.formatField(item);
                    }
                    break;
                case constant_1.FieldType.Array:
                    realValue = exports.Util.formatField(item);
                    break;
                default:
                    realValue = item;
            }
            if (Array.isArray(protoField)) {
                protoField.push(realValue);
            }
            else {
                //@ts-ignore
                protoField[key] = realValue;
            }
        }
        return protoField;
    },
    /**
     * 查看数据类型
     *
     * @param obj
     */
    whichType: (obj) => {
        const type = Object.prototype.toString.call(obj).slice(8, -1);
        if (type === constant_1.FieldType.Date) {
            return constant_1.FieldType.Date;
        }
        return type;
    },
};
const filterUndefined = (o) => {
    // 如果不是对象类型，直接返回
    if (!(0, typings_1.isObject)(o)) {
        return o;
    }
    for (const key in o) {
        if (o[key] === undefined) {
            delete o[key];
        }
        else if ((0, typings_1.isObject)(o[key])) {
            o[key] = (0, exports.filterUndefined)(o[key]);
        }
    }
    return o;
};
exports.filterUndefined = filterUndefined;
const stringifyByEJSON = (params) => {
    // params中删除undefined的key
    params = (0, exports.filterUndefined)(params);
    // EJSON 的 stringify 将{a: {"$eq": 3}} 添加上{\"$eq\":{\"$numberInt\":\"3\"}}}
    return bson_2.EJSON.stringify(params, { relaxed: false });
};
exports.stringifyByEJSON = stringifyByEJSON;
function hasOwnProperty(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key);
}
exports.hasOwnProperty = hasOwnProperty;
function formatRequestServerDateParams(params) {
    if (serverDate_1.ServerDate.getServerDate()) {
        params.has_server_date = true;
    }
    serverDate_1.ServerDate.resetHasServerDate();
    return params;
}
exports.formatRequestServerDateParams = formatRequestServerDateParams;
//# sourceMappingURL=util.js.map