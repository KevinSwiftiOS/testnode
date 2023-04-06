"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const index_1 = require("./index");
const validate_1 = require("./validate");
const util_1 = require("./util");
const query_1 = require("./serializer/query");
const update_1 = require("./serializer/update");
const websocket_client_1 = require("./realtime/websocket-client");
const constant_2 = require("./constant");
const utils_1 = require("./utils/utils");
const code_1 = require("./const/code");
const bson_1 = require("bson");
class Query {
    constructor(db, coll, fieldFilters, apiOptions, transactionId) {
        this.watch = (options) => {
            if (!index_1.Db.ws) {
                index_1.Db.ws = new websocket_client_1.RealtimeWebSocketClient({
                    context: {
                        appConfig: {
                            docSizeLimit: 1000,
                            realtimePingInterval: 10000,
                            realtimePongWaitTimeout: 5000,
                            request: this._request
                        }
                    }
                });
            }
            const { limit, order } = this._apiOptions;
            return index_1.Db.ws.watch(Object.assign(Object.assign({}, options), { envId: this._db.config.env, collectionName: this._coll, query: JSON.stringify(this._fieldFilters), limit, orderBy: order
                    ? order.reduce((acc, cur) => {
                        acc[cur.field] = cur.direction;
                        return acc;
                    }, {})
                    : undefined }));
        };
        this._db = db;
        this._coll = coll;
        this._fieldFilters = fieldFilters;
        this._apiOptions = apiOptions || {};
        this._request = new index_1.Db.reqClass(this._db.config);
        this._transactionId = transactionId;
    }
    async get() {
        const order = this._apiOptions.order;
        let param = {
            collectionName: this._coll,
            queryType: constant_1.QueryType.WHERE,
            transactionId: this._transactionId
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        if (order) {
            param.order = utils_1.stringifyByEJSON(order);
        }
        const offset = this._apiOptions.offset;
        if (offset) {
            param.offset = offset;
        }
        const limit = this._apiOptions.limit;
        if (limit) {
            param.limit = limit < 1000 ? limit : 1000;
        }
        else {
            param.limit = 100;
        }
        const projection = this._apiOptions.projection;
        if (projection) {
            param.projection = utils_1.stringifyByEJSON(projection);
        }
        console.log('document query请求的参数', param);
        const res = await this._request.send('database.getDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        const list = res.data.list.map(item => bson_1.EJSON.parse(item));
        const documents = util_1.Util.formatResDocumentData(list);
        const result = {
            data: documents,
            requestId: res.requestId
        };
        if (res.limit)
            result.limit = res.limit;
        if (res.offset)
            result.offset = res.offset;
        return result;
    }
    async count() {
        let param = {
            collectionName: this._coll,
            queryType: constant_1.QueryType.WHERE
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        const res = await this._request.send('database.calculateDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            requestId: res.requestId,
            total: res.data.total
        };
    }
    where(query) {
        if (Object.prototype.toString.call(query).slice(8, -1) !== 'Object') {
            throw Error(constant_2.ErrorCode.QueryParamTypeError);
        }
        const keys = Object.keys(query);
        const checkFlag = keys.some(item => {
            return query[item] !== undefined;
        });
        if (keys.length && !checkFlag) {
            throw Error(constant_2.ErrorCode.QueryParamValueError);
        }
        return new Query(this._db, this._coll, query_1.QuerySerializer.encodeEJSON(query, this._apiOptions.raw || false), this._apiOptions, this._transactionId);
    }
    options(apiOptions) {
        validate_1.Validate.isValidOptions(apiOptions);
        return new Query(this._db, this._coll, this._fieldFilters, apiOptions, this._transactionId);
    }
    orderBy(fieldPath, directionStr) {
        validate_1.Validate.isFieldPath(fieldPath);
        validate_1.Validate.isFieldOrder(directionStr);
        const newOrder = {
            [fieldPath]: directionStr === 'desc' ? -1 : 1
        };
        const order = this._apiOptions.order || {};
        const newApiOption = Object.assign({}, this._apiOptions, {
            order: Object.assign({}, order, newOrder)
        });
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
    }
    limit(limit) {
        validate_1.Validate.isInteger('limit', limit);
        let newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.limit = limit;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
    }
    skip(offset) {
        validate_1.Validate.isInteger('offset', offset);
        let newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.offset = offset;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
    }
    async update(data) {
        if (!data || typeof data !== 'object') {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '参数必需是非空对象' }));
        }
        if (data.hasOwnProperty('_id')) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '不能更新_id的值' }));
        }
        let { multiple } = this._apiOptions;
        const multi = multiple === undefined ? true : multiple;
        let param = {
            collectionName: this._coll,
            queryType: constant_1.QueryType.WHERE,
            multi,
            merge: true,
            upsert: false,
            data: update_1.UpdateSerializer.encodeEJSON(data, this._apiOptions.raw || false)
        };
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        console.log('update请求的参数', param);
        const res = await this._request.send('database.modifyDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            requestId: res.requestId,
            updated: res.data.updated,
            upsertId: res.data.upsert_id
        };
    }
    field(projection) {
        let transformProjection = {};
        for (let k in projection) {
            if (typeof projection[k] === 'boolean') {
                transformProjection[k] = projection[k] === true ? 1 : 0;
            }
            if (typeof projection[k] === 'number') {
                transformProjection[k] = projection[k] > 0 ? 1 : 0;
            }
            if (typeof projection[k] === 'object') {
                transformProjection[k] = projection[k];
            }
        }
        let newApiOption = Object.assign({}, this._apiOptions);
        newApiOption.projection = transformProjection;
        return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
    }
    async remove() {
        const { offset, limit, projection, order } = this._apiOptions;
        if (offset !== undefined ||
            limit !== undefined ||
            projection !== undefined ||
            order !== undefined) {
            console.warn('`offset`, `limit`, `projection`, `orderBy` are not supported in remove() operation');
        }
        let { multiple } = this._apiOptions;
        const multi = multiple === undefined ? true : multiple;
        const param = {
            collectionName: this._coll,
            query: this._fieldFilters,
            queryType: constant_1.QueryType.WHERE,
            multi
        };
        const res = await this._request.send('database.removeDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            requestId: res.requestId,
            deleted: res.data.deleted
        };
    }
    async updateAndReturn(data) {
        if (!data || typeof data !== 'object') {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '参数必需是非空对象' }));
        }
        if (data.hasOwnProperty('_id')) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '不能更新_id的值' }));
        }
        let param = {
            collectionName: this._coll,
            queryType: constant_1.QueryType.WHERE,
            data: update_1.UpdateSerializer.encodeEJSON(data, false)
        };
        if (this._transactionId) {
            param.transactionId = this._transactionId;
        }
        if (this._fieldFilters) {
            param.query = this._fieldFilters;
        }
        const res = await this._request.send('database.modifyAndReturnDoc', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            requestId: res.requestId,
            updated: res.data.updated,
            doc: res.data.doc && bson_1.EJSON.parse(res.data.doc)
        };
    }
}
exports.Query = Query;
