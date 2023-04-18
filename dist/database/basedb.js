"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseDb = void 0;
const command_1 = require("./command");
const index_1 = require("./serverDate/index");
/**
 * 数据库模块
 *
 */
class baseDb {
    constructor(config) {
        this.config = config;
        this.command = command_1.Command;
        this.serverDate = index_1.ServerDateConstructor;
    }
}
exports.baseDb = baseDb;
//# sourceMappingURL=basedb.js.map