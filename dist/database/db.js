"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const basedb_1 = require("./basedb");
const collection_1 = require("./collection");
const Errors_1 = require("./Errors");
class db extends basedb_1.baseDb {
    // static newDbReqClass: any;
    /**
     * 获取集合的引用
     *
     * @param collName - 集合名称
     */
    collection(collName) {
        if (!collName) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: '集合名必填' }));
        }
        return new collection_1.CollectionReference(this, collName);
    }
}
exports.db = db;
//# sourceMappingURL=db.js.map