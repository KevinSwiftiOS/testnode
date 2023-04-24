"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const axios_1 = __importDefault(require("axios"));
const src_1 = require("./database/src");
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
                'x-use-ppe': 1
            },
        });
        console.log("res status", res.status);
        console.log("res status === 200", res.status === 200);
        console.log("res.statusText", res.statusText);
        console.log("res data", JSON.stringify(res.data));
        console.log("res.data.statusMessage", res.data.status_message);
        console.log("res.data.statusCode", res.data.statusCode);
        if (res.data.status_code) {
            throw new src_1.DataBaseError({
                errMsg: (_a = res.data.status_message) !== null && _a !== void 0 ? _a : '',
                errorCode: res.data.status_code,
            });
        }
        return (((_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data) || {});
    }
}
async function initService() {
}
initService().then(async () => {
    const app = new koa_1.default();
    const router = new router_1.default();
    const dbInstance = new src_1.db();
    src_1.baseDb.reqClass = Request;
    router.get('/api/test', async (ctx) => {
        console.log("test拿到的结果", 'test');
        ctx.body = 'test';
        return 'test';
    });
    router.get('/api/get', (ctx) => {
        console.log("get拿到的结果", ctx.request.body);
        ctx.body = '11';
        return '11 get';
    });
    router.post('/api/post', (ctx) => {
        console.log('1234567', ctx.request.body);
        // const res = await dbInstance.collection("collection2").add({data: {name: ctx.params}});
        ctx.body = 32;
        return ctx.request.body;
    });
    app.use((0, koa_bodyparser_1.default)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
//# sourceMappingURL=server.js.map