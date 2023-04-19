"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentReference = void 0;
const bson_1 = require("bson");
const basedb_1 = require("./basedb");
const constant_1 = require("./constant");
const Errors_1 = require("./Errors");
const datatype_1 = require("./serializer/datatype");
const update_1 = require("./serializer/update");
const util_1 = require("./util");
const util_2 = require("./util");
/**
 * 文档模块
 */
class DocumentReference {
    /**
     * 初始化
     *
     * @internal
     *
     * @param db    - 数据库的引用
     * @param coll  - 集合名称
     * @param docID - 文档ID
     */
    constructor(db, coll, docID) {
        this._db = db;
        this._coll = coll;
        this.id = docID;
        this._request = new basedb_1.baseDb.reqClass(this._db.config);
    }
    /**
     * 返回选中的文档（_id）
     */
    async get() {
        var _a, _b;
        const query = (0, util_2.stringifyByEJSON)({ _id: this.id });
        const param = {
            collection_name: this._coll,
            query,
            query_type: constant_1.QueryType.DOC,
            multi: false,
        };
        const data = await this._request.send('database.getDocument', param);
        const list = (_a = data === null || data === void 0 ? void 0 : data.list) === null || _a === void 0 ? void 0 : _a.map((item) => bson_1.EJSON.parse(item));
        const documents = util_1.Util.formatResDocumentData(list !== null && list !== void 0 ? list : []);
        return { data: documents, requestId: (_b = data === null || data === void 0 ? void 0 : data.request_id) !== null && _b !== void 0 ? _b : '' };
    }
    /**
     * 创建或添加数据
     *
     * 如果文档ID不存在，则创建该文档并插入数据，根据返回数据的 upserted_id 判断
     * 添加数据的话，根据返回数据的 set 判断影响的行数
     *
     * @param data - 文档数据
     * @param opts - 可选项
     */
    async set(opts) {
        var _a, _b;
        if (typeof this.id !== 'string' || this.id === '') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.set.SET_PARAM_ERROR }));
        }
        if (!(opts &&
            Object.prototype.toString.call(opts).slice(8, -1) !== 'Object' &&
            Object.keys(opts).length > 0)) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.set.SET_PARAM_OBJECT_ERROR }));
        }
        if ((0, util_2.hasOwnProperty)(opts, '_id')) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.set.SET_PARAM_HAS_ID_ERROR }));
        }
        let param = {
            collection_name: this._coll,
            query_type: constant_1.QueryType.DOC,
            update_data: (0, util_2.stringifyByEJSON)((0, datatype_1.serialize)(opts)),
            multi: false,
            merge: false,
            upsert: true,
        };
        if (this.id) {
            param = Object.assign(param, {
                query: (0, util_2.stringifyByEJSON)({ _id: this.id }),
            });
        }
        const res = await this._request.send('database.updateDocument', (0, util_1.formatRequestServerDateParams)(param));
        return {
            updated: (_a = res === null || res === void 0 ? void 0 : res.updated) !== null && _a !== void 0 ? _a : 0,
            requestId: (_b = res === null || res === void 0 ? void 0 : res.request_id) !== null && _b !== void 0 ? _b : '',
        };
    }
    /**
     * 更新数据
     *
     * @param data - 文档数据
     * @param opts - 可选项
     */
    async update(opts) {
        var _a, _b;
        if (typeof this.id !== 'string' || this.id === '') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.update.UPDATE_PARAM_ERROR }));
        }
        if (!(opts &&
            Object.prototype.toString.call(opts).slice(8, -1) !== 'Object' &&
            Object.keys(opts).length > 0)) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.update.UPDATE_PARAM_OBJECT_ERROR }));
        }
        if ((0, util_2.hasOwnProperty)(opts, '_id')) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.update.UPDATE_PARAM_HAS_ID_ERROR }));
        }
        const query = (0, util_2.stringifyByEJSON)({ _id: this.id });
        const param = {
            collection_name: this._coll,
            update_data: update_1.UpdateSerializer.encodeEJSON(opts),
            query,
            query_type: constant_1.QueryType.DOC,
            multi: false,
            merge: true,
            upsert: false,
        };
        const res = await this._request.send('database.updateDocument', (0, util_1.formatRequestServerDateParams)(param));
        return {
            updated: (_a = res === null || res === void 0 ? void 0 : res.updated) !== null && _a !== void 0 ? _a : 0,
            requestId: (_b = res === null || res === void 0 ? void 0 : res.request_id) !== null && _b !== void 0 ? _b : '',
        };
    }
    /**
     * 删除文档
     */
    async remove() {
        var _a, _b;
        const query = (0, util_2.stringifyByEJSON)({ _id: this.id });
        const param = {
            collection_name: this._coll,
            query,
            query_type: constant_1.QueryType.DOC,
            multi: false,
        };
        const res = await this._request.send('database.removeDocument', param);
        return {
            deleted: (_a = res.deleted) !== null && _a !== void 0 ? _a : 0,
            requestId: (_b = res.request_id) !== null && _b !== void 0 ? _b : '',
        };
    }
}
exports.DocumentReference = DocumentReference;
//# sourceMappingURL=document.js.map