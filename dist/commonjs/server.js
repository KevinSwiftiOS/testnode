"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@koa/router");
const koa_1 = require("koa");
const koa_bodyparser_1 = require("koa-bodyparser");
const axios_1 = require("axios");
const src_1 = require("./database/src");
class Request {
    async send(action, data) {
        var _a;
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
        if (res.data.statusCode) {
            throw new src_1.DataBaseError({
                errMsg: res.data.statusMessage,
                errorCode: res.data.statusCode,
            });
        }
        return JSON.parse(((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) || '{}');
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
    router.get('/api/get', async (ctx) => {
        const res = await dbInstance.collection("collection2").get();
        console.log("get拿到的结果", res);
        ctx.body = res;
        return res;
    });
    router.get('/api/update', async (ctx) => {
        const res = await dbInstance.collection("collection2").add({ data: { name: 1 } });
        ctx.body = res;
        console.log("update拿到的结果", res);
        return res;
    });
    app.use((0, koa_bodyparser_1.default)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
