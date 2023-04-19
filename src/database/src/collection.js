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
    constructor(db, coll, apiOptions) {
        super(db, coll, '', apiOptions);
        serverDate_1.ServerDate.resetHasServerDate();
    }
    doc(docID) {
        if (typeof docID !== 'string' && typeof docID !== 'number') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: 'docId必须为字符串或数字' }));
        }
        return new document_1.DocumentReference(this._db, this._coll, docID);
    }
    async add(opts) {
        var _a, _b, _c;
        let transformData = opts.data;
        if (Object.prototype.toString.call(opts.data).slice(8, -1) !== 'Object') {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: '参数必须是非空对象' }));
        }
        transformData = [opts.data];
        transformData = transformData.map((item) => (0, util_1.stringifyByEJSON)((0, datatype_1.serialize)(item)));
        const params = {
            collection_name: this._coll,
            insert_data: transformData,
        };
        const data = await this._request.send('database.addDocument', (0, util_1.formatRequestServerDateParams)(params));
        if (!(0, typings_1.isArray)(opts.data) && ((_a = data === null || data === void 0 ? void 0 : data.inserted_ids) === null || _a === void 0 ? void 0 : _a.length) > 0) {
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