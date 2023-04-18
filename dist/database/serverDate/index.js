"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDateConstructor = exports.ServerDate = void 0;
const Errors_1 = require("../Errors");
const Symbols_1 = require("../Symbols");
class ServerDate {
    static resetHasServerDate() {
        this.isHasServerDate = false;
    }
    static setHasServerDate(value) {
        this.isHasServerDate = value;
    }
    static getServerDate() {
        return this.isHasServerDate;
    }
    constructor({ offset = 0 } = {}) {
        if (!Number.isInteger(offset)) {
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: 'serverDate值必须是一个整型' }));
        }
        this.offset = offset;
    }
    get _internalType() {
        return Symbols_1.SYMBOL_SERVER_DATE;
    }
    parse() {
        ServerDate.setHasServerDate(true);
        return {
            $dyc_server_date: {
                offset: this.offset,
            },
        };
    }
}
exports.ServerDate = ServerDate;
function ServerDateConstructor(opt) {
    return new ServerDate(opt);
}
exports.ServerDateConstructor = ServerDateConstructor;
//# sourceMappingURL=index.js.map