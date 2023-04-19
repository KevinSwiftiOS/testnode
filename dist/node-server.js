"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dySDK = void 0;
const src_1 = require("./cloud-db/src");
const axios_1 = __importDefault(require("axios"));
class Request {
    async send(action, data) {
        var _a, _b;
        const params = Object.assign({}, data, {
            action,
        });
        const res = await (0, axios_1.default)({
            method: 'post',
            url: 'http://cloud-database-api.dycloud.run/api/cloud_database/exec_cloud_database_cmd',
            data: params,
            headers: {
                'X-TT-ENV': 'ppe_cloud_database_dyc',
                'content-type': 'application/json',
                'x-use-ppe': 1,
            },
        });
        if (res.status !== 200) {
            throw new src_1.DataBaseError({
                errMsg: res.statusText,
                errorCode: res.status,
            });
        }
        if (res.data.status_code) {
            throw new src_1.DataBaseError({
                errMsg: (_a = res.data.status_message) !== null && _a !== void 0 ? _a : '',
                errorCode: res.data.status_code,
            });
        }
        return ((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data) || '{}';
    }
}
class dySDK {
    constructor(config) {
        const dbInstance = new src_1.db(config);
        src_1.baseDb.reqClass = Request;
        this.dbInstance = dbInstance;
    }
    getdatabase() {
        return this.dbInstance;
    }
}
exports.dySDK = dySDK;
//# sourceMappingURL=node-server.js.map