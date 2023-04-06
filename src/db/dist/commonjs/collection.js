"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const query_1 = require("./query");
const aggregate_1 = require("./aggregate");
const datatype_1 = require("./serializer/datatype");
const utils_1 = require("./utils/utils");
const validate_1 = require("./validate");
const type_1 = require("./utils/type");
class CollectionReference extends query_1.Query {
    constructor(db, coll, apiOptions, transactionId) {
        super(db, coll, '', apiOptions, transactionId);
        if (transactionId) {
            this._transactionId = transactionId;
        }
    }
    get name() {
        return this._coll;
    }
    doc(docID) {
        if (typeof docID !== 'string' && typeof docID !== 'number') {
            throw new Error('docId必须为字符串或数字');
        }
        return new document_1.DocumentReference(this._db, this._coll, this._apiOptions, docID, this._transactionId);
    }
    async add(data) {
        let transformData = data;
        if (!type_1.isArray(data)) {
            transformData = [data];
        }
        transformData = transformData.map(item => {
            return utils_1.stringifyByEJSON(datatype_1.serialize(item));
        });
        let params = {
            collectionName: this._coll,
            data: transformData
        };
        if (this._transactionId) {
            params.transactionId = this._transactionId;
        }
        console.log('请求的参数', params);
        const res = await this._request.send('database.insertDocument', params, utils_1.getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        if (!type_1.isArray(data)) {
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
        return {
            ids: res.data.insertedIds,
            requestId: res.requestId
        };
    }
    aggregate(rawPipeline = []) {
        return new aggregate_1.default(this._db, this._coll, (this._apiOptions.raw || false) ? rawPipeline : []);
    }
    options(apiOptions) {
        validate_1.Validate.isValidOptions(apiOptions);
        return new CollectionReference(this._db, this._coll, apiOptions, this._transactionId);
    }
}
exports.CollectionReference = CollectionReference;