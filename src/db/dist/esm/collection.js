import { DocumentReference } from './document';
import { Query } from './query';
import Aggregation from './aggregate';
import { serialize } from './serializer/datatype';
import { getReqOpts, stringifyByEJSON } from './utils/utils';
import { Validate } from './validate';
import { isArray } from './utils/type';
export class CollectionReference extends Query {
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
        return new DocumentReference(this._db, this._coll, this._apiOptions, docID, this._transactionId);
    }
    async add(data) {
        let transformData = data;
        if (!isArray(data)) {
            transformData = [data];
        }
        transformData = transformData.map(item => {
            return stringifyByEJSON(serialize(item));
        });
        let params = {
            collectionName: this._coll,
            data: transformData
        };
        if (this._transactionId) {
            params.transactionId = this._transactionId;
        }
        const res = await this._request.send('database.insertDocument', params, getReqOpts(this._apiOptions));
        if (res.code) {
            return res;
        }
        if (!isArray(data)) {
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
        return new Aggregation(this._db, this._coll, (this._apiOptions.raw || false) ? rawPipeline : []);
    }
    options(apiOptions) {
        Validate.isValidOptions(apiOptions);
        return new CollectionReference(this._db, this._coll, apiOptions, this._transactionId);
    }
}
