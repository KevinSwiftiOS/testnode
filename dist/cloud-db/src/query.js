"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const bson_1 = require("bson");
const basedb_1 = require("./basedb");
const constant_1 = require("./constant");
const error_1 = require("./error");
const query_1 = require("./serializer/query");
const update_1 = require("./serializer/update");
const util_1 = require("./util");
const util_2 = require("./util");
/**
 * 查询模块
 */
class Query {
    constructor(db, coll, fieldFilters, apiOptions) {
        this._db = db;
        this._coll = coll;
        this._fieldFilters = fieldFilters;
        this._apiOptions = apiOptions || {};
        this._request = new basedb_1.baseDb.reqClass(this._db.config);
    }
    /**
     * 查询条件
     *
     * @param query 需要
     */
    where(query) {
        // query校验 1. 必填对象类型  2. value 不可均为undefiend
        if (Object.prototype.toString.call(query).slice(8, -1) !== 'Object') {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.where.WHERE_PARAM_OBJECT_ERROR }));
        }
        const keys = Object.keys(query);
        const checkFlag = keys.some((item) => query[item] !== undefined);
        if (keys.length > 0 && !checkFlag) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.where.WHREE_PARAM_UNDEFINED_ERROR }));
        }
        return new Query(this._db, this._coll, query_1.QuerySerializer.encodeEJSON(query), Object.assign({}, this._apiOptions));
    }
    /**
     * 设置排序方式
     *
     * @param fieldPath     - 字段路径
     * @param directionStr  - 排序方式 需要
     */
    orderBy(fieldPath, directionStr) {
        if (!/^[\w.-]/.test(fieldPath)) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection['order-by'].ORDER_BY_FIELD_PATH_ERROR }));
        }
        if (!constant_1.OrderDirectionList.includes(directionStr)) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection['order-by'].ORDER_BY_DIRECTION_ERROR }));
        }
        const newOrder = {
            [fieldPath]: directionStr === 'desc' ? -1 : 1,
        };
        const order = this._apiOptions.order || {};
        const newApiOption = Object.assign({}, this._apiOptions, {
            order: Object.assign({}, order, newOrder),
        });
        // apiOptions 的赋值
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
    }
    /**
     * 设置查询条数
     *
     * @param limit - 限制条数
     */
    limit(limit) {
        if (!Number.isInteger(limit)) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.limit.LIMIT_PARAM_ERROR }));
        }
        const newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.limit = limit;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
    }
    /**
     * 设置偏移量
     *
     * @param offset - 偏移量
     */
    skip(offset) {
        if (!Number.isInteger(offset)) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.skip.SKIP_PARAM_ERROR }));
        }
        const newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.offset = offset;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
    }
    /**
     * 指定要返回的字段
     * project 示例
     * 存在doc {a:1, b:2, c: [1,2,3,4], d: [{item: 1}, [item: 2]]}
     * 1. 指定返回doc中字段a,b,  projection设置为{a: true, b:true}
     *
     * @param projection
     */
    field(projection) {
        const transformProjection = {};
        for (const k of Object.keys(projection)) {
            // 区分bool类型，number类型 和 Object类型
            if (typeof projection[k] === 'boolean') {
                //@ts-ignore
                transformProjection[k] = projection[k] === true ? 1 : 0;
            }
            if (typeof projection[k] === 'number') {
                //@ts-ignore
                transformProjection[k] = projection[k] > 0 ? 1 : 0;
            }
            if (typeof projection[k] === 'object') {
                //@ts-ignore
                transformProjection[k] = projection[k];
            }
        }
        const newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.projection = transformProjection;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
    }
    async get() {
        var _a, _b;
        console.log('collection now get');
        const { order } = this._apiOptions;
        const param = {
            collection_name: this._coll,
            query_type: constant_1.QueryType.WHERE,
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        if (order) {
            param.order = (0, util_2.stringifyByEJSON)(order);
        }
        // 从 _apiOptions 里面拿值
        const { offset } = this._apiOptions;
        param.offset = offset ? offset : 0;
        const { limit } = this._apiOptions;
        param.limit = limit ? limit : 100;
        const { projection } = this._apiOptions;
        if (projection) {
            param.projection = (0, util_2.stringifyByEJSON)(projection);
        }
        const data = await this._request.send('database.getDocument', (0, util_2.formatRequestServerDateParams)(param));
        const list = (_a = data === null || data === void 0 ? void 0 : data.list) === null || _a === void 0 ? void 0 : _a.map((item) => bson_1.EJSON.parse(item));
        const documents = util_1.Util.formatResDocumentData(list !== null && list !== void 0 ? list : []);
        return { data: documents, requestId: (_b = data.request_id) !== null && _b !== void 0 ? _b : '' };
    }
    /**
     * 获取总数
     */
    async count() {
        const param = {
            collection_name: this._coll,
            query_type: constant_1.QueryType.WHERE,
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        const res = await this._request.send('database.calculateDocument', (0, util_2.formatRequestServerDateParams)(param));
        return { total: res.total, requestId: res.request_id };
    }
    async update(opts) {
        var _a, _b;
        if (!(opts &&
            Object.prototype.toString.call(opts).slice(8, -1) === 'Object' &&
            Object.keys(opts).length > 0)) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.update.UPDATE_PARAM_ERROR }));
        }
        if ((0, util_2.hasOwnProperty)(opts, '_id')) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.update.UPDATE_ID_ERROR }));
        }
        const param = {
            collection_name: this._coll,
            query_type: constant_1.QueryType.WHERE,
            multi: true,
            merge: true,
            upsert: false,
            update_data: update_1.UpdateSerializer.encodeEJSON(opts),
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        const res = await this._request.send('database.updateDocument', (0, util_2.formatRequestServerDateParams)(param));
        return {
            updated: (_a = res.updated) !== null && _a !== void 0 ? _a : 0,
            requestId: (_b = res.request_id) !== null && _b !== void 0 ? _b : '',
        };
    }
    /**
     * 条件删除文档
     */
    async remove() {
        var _a, _b;
        const { offset, limit, projection, order } = this
            ._apiOptions;
        if (offset !== undefined ||
            limit !== undefined ||
            projection !== undefined ||
            order !== undefined) {
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.collection.remove.REMOVE_PARAM_ERROR }));
        }
        // multi 再确认下
        // const multi = true // where remove 不传multi默认为true
        const param = {
            collection_name: this._coll,
            query: this._fieldFilters,
            query_type: constant_1.QueryType.WHERE,
            multi: true,
        };
        const res = await this._request.send('database.removeDocument', (0, util_2.formatRequestServerDateParams)(param));
        return {
            deleted: (_a = res === null || res === void 0 ? void 0 : res.deleted) !== null && _a !== void 0 ? _a : 0,
            requestId: (_b = res === null || res === void 0 ? void 0 : res.request_id) !== null && _b !== void 0 ? _b : '',
        };
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map