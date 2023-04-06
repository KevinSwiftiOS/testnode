"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("../helper/symbol");
class ObjectId {
    constructor({ id = '' } = {}) {
        this.id = id;
    }
    get _internalType() {
        return symbol_1.SYMBOL_OBJECTID;
    }
    parse() {
        return {
            $oid: this.id
        };
    }
}
exports.ObjectId = ObjectId;
function ObjectIdConstructor(opt) {
    return new ObjectId(opt);
}
exports.ObjectIdConstructor = ObjectIdConstructor;
