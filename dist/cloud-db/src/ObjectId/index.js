"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdConstructor = exports.ObjectId = void 0;
const Symbols_1 = require("../Symbols");
class ObjectId {
    constructor({ id = '' } = {}) {
        this.id = id;
    }
    get _internalType() {
        return Symbols_1.SYMBOL_OBJECTID;
    }
    parse() {
        return {
            $oid: this.id,
        };
    }
}
exports.ObjectId = ObjectId;
function ObjectIdConstructor(opt) {
    return new ObjectId(opt);
}
exports.ObjectIdConstructor = ObjectIdConstructor;
//# sourceMappingURL=index.js.map