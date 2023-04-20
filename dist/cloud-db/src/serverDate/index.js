"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDateConstructor = exports.ServerDate = void 0;
const error_1 = require("../error");
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
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.serverDate.SERVER_DATE_PARAM_ERROR }));
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