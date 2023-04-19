"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionReference = void 0;
const document_1 = require("./document");
const Errors_1 = require("./Errors");
const query_1 = require("./query");
const datatype_1 = require("./serializer/datatype");
const serverDate_1 = require("./serverDate");
const typings_1 = require("./typings/");
const util_1 = require("./util");
class CollectionReference extends query_1.Query {
    /**
     * 初始化
     *
     * @internal
     *
     * @param db    - 数据库的引用
     * @param coll  - 集合名称
     */
    constructor(db, coll, apiOptions) {
        super(db, coll, '', apiOptions);
        serverDate_1.ServerDate.resetHasServerDate();
    }
    /**
     * 读取集合名字
     */
    /**
     * 获取文档的引用
     *
     * @param docID - 文档ID
     */
    doc(docID) {
        if (typeof docID !== 'string' || docID === '') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.doc.get.GET_PARAM_ERROR }));
        }
        return new document_1.DocumentReference(this._db, this._coll, docID);
    }
    /**
     * 添加一篇文档
     *
     * @param opts  - 数据
     *
     */
    async add(opts) {
        var _a, _b, _c;
        // 判断data是否为数组, 兼容处理
        let transformData = opts;
        if (Object.prototype.toString.call(opts).slice(8, -1) !== 'Object') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: Errors_1.ErrorMsg.collection.add.ADD_PARAM_ERROR }));
        }
        // 本期只支持单个添加，后续要看在服务端sdk 侧是否要区分开来
        transformData = [opts];
        transformData = transformData.map((item) => (0, util_1.stringifyByEJSON)((0, datatype_1.serialize)(item)));
        const params = {
            collection_name: this._coll,
            insert_data: transformData,
        };
        const data = await this._request.send('database.addDocument', (0, util_1.formatRequestServerDateParams)(params));
        if (!(0, typings_1.isArray)(opts) && ((_a = data === null || data === void 0 ? void 0 : data.inserted_ids) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            // 兼容原事务 插入文档接口
            return {
                id: data.inserted_ids[0],
                requestId: (_b = data.request_id) !== null && _b !== void 0 ? _b : '',
            };
        }
        return {
            id: data === null || data === void 0 ? void 0 : data.inserted_ids,
            requestId: (_c = data === null || data === void 0 ? void 0 : data.request_id) !== null && _c !== void 0 ? _c : '',
        };
    }
}
exports.CollectionReference = CollectionReference;
//# sourceMappingURL=collection.js.map