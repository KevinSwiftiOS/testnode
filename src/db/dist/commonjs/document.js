"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const util_1 = require("./util");
const update_1 = require("./serializer/update");
const datatype_1 = require("./serializer/datatype");
const update_2 = require("./commands/update");
const websocket_client_1 = require("./realtime/websocket-client");
const constant_1 = require("./constant");
const utils_1 = require("./utils/utils");
const code_1 = require("./const/code");
const bson_1 = require("bson");
class DocumentReference {
    constructor(db, coll, apiOptions, docID, transactionId) {
        this.watch = (options) => {
            if (!index_1.Db.ws) {
                index_1.Db.ws = new websocket_client_1.RealtimeWebSocketClient({
                    context: {
                        appConfig: {
                            docSizeLimit: 1000,
                            realtimePingInterval: 10000,
                            realtimePongWaitTimeout: 5000,
                            request: this.request
                        }
                    }
                });
            }
            return index_1.Db.ws.watch(Object.assign(Object.assign({}, options), { envId: this._db.config.env, collectionName: this._coll, query: JSON.stringify({
                    _id: this.id
                }) }));
        };
        this._db = db;
        this._coll = coll;
        this.id = docID;
        this._transactionId = transactionId;
        this.request = new index_1.Db.reqClass(this._db.config);
        this._apiOptions = apiOptions;
    }
    async create(data) {
        if (this.id) {
            data['_id'] = this.id;
        }
        let params = {
            collectionName: this._coll,
            data: [utils_1.stringifyByEJSON(datatype_1.serialize(data))],
            transactionId: this._transactionId
        };
        const res = await this.request.send('database.insertDocument', params, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        if (this._transactionId) {
            return {
                inserted: 1,
                ok: 1,
                id: res.data.insertedIds[0],
                requestId: res.requestId
            };
        }
        return {
            id: res.data.insertedIds[0],
            requestId: res.requestId
        };
    }
    async set(data) {
        if (!this.id) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: 'docId不能为空' }));
        }
        if (!data || typeof data !== 'object') {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '参数必需是非空对象' }));
        }
        if (data.hasOwnProperty('_id')) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '不能更新_id的值' }));
        }
        let hasOperator = false;
        const checkMixed = objs => {
            if (typeof objs === 'object') {
                for (let key in objs) {
                    if (objs[key] instanceof update_2.UpdateCommand) {
                        hasOperator = true;
                    }
                    else if (typeof objs[key] === 'object') {
                        checkMixed(objs[key]);
                    }
                }
            }
        };
        checkMixed(data);
        if (hasOperator) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.DATABASE_REQUEST_FAILED), { message: 'update operator complicit' }));
        }
        let param = {
            collectionName: this._coll,
            queryType: constant_1.QueryType.DOC,
            data: utils_1.stringifyByEJSON(datatype_1.serialize(data)),
            transactionId: this._transactionId,
            multi: false,
            merge: false,
            upsert: true
        };
        if (this.id) {
            param['query'] = utils_1.stringifyByEJSON({ _id: this.id });
        }
        const res = await this.request.send('database.modifyDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        if (this._transactionId) {
            return {
                updated: res.data.updated,
                upserted: [{ _id: res.data.upsert_id }],
                requestId: res.requestId
            };
        }
        return {
            updated: res.data.updated,
            upsertedId: res.data.upsert_id,
            requestId: res.requestId
        };
    }
    async update(data) {
        if (!data || typeof data !== 'object') {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '参数必需是非空对象' }));
        }
        if (data.hasOwnProperty('_id')) {
            return utils_1.processReturn(this._db.config.throwOnCode, Object.assign(Object.assign({}, code_1.ERRORS.INVALID_PARAM), { message: '不能更新_id的值' }));
        }
        const query = utils_1.stringifyByEJSON({ _id: this.id });
        const param = {
            collectionName: this._coll,
            transactionId: this._transactionId,
            data: update_1.UpdateSerializer.encodeEJSON(data, this._apiOptions.raw || false),
            query,
            queryType: constant_1.QueryType.DOC,
            multi: false,
            merge: true,
            upsert: false
        };
        const res = await this.request.send('database.modifyDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            updated: res.data.updated,
            requestId: res.requestId
        };
    }
    async delete() {
        return this.remove();
    }
    async remove() {
        const query = utils_1.stringifyByEJSON({ _id: this.id });
        const param = {
            collectionName: this._coll,
            transactionId: this._transactionId,
            query: query,
            queryType: constant_1.QueryType.DOC,
            multi: false
        };
        const res = await this.request.send('database.removeDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        return {
            deleted: res.data.deleted,
            requestId: res.requestId
        };
    }
    async get() {
        const query = utils_1.stringifyByEJSON({ _id: this.id });
        const { projection } = this._apiOptions;
        const param = {
            collectionName: this._coll,
            query,
            transactionId: this._transactionId,
            queryType: constant_1.QueryType.DOC,
            multi: false
        };
        if (projection) {
            param.projection = utils_1.stringifyByEJSON(projection);
        }
        console.log("请求的get", param);
        const res = await this.request.send('database.getDocument', param, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        const list = res.data.list.map(item => bson_1.EJSON.parse(item));
        const documents = util_1.Util.formatResDocumentData(list);
        if (this._transactionId) {
            return {
                data: documents[0] || null,
                requestId: res.requestId
            };
        }
        return {
            data: documents,
            requestId: res.requestId,
            offset: res.data.offset,
            limit: res.data.limit
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
        return new DocumentReference(this._db, this._coll, newApiOption, this.id, this._transactionId);
    }
}
exports.DocumentReference = DocumentReference;