"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const axios_1 = __importDefault(require("axios"));
class Request {
    async send(params) {
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
            console.log("res.data.statusCode", res.data.statusCode);
            throw new Error('报错');
        }
        return JSON.parse(res.data.data);
    }
}
async function initService() {
}
initService().then(async () => {
    const app = new koa_1.default();
    const router = new router_1.default();
    router.get('/api/test', async (ctx) => {
        console.log("test拿到的结果", 'test');
        ctx.body = 'test';
        return 'test';
    });
    router.get('/api/get', async (ctx) => {
        const request = new Request();
        const res = await request.send({ "collection_name": "collection2", "query_type": "WHERE", "offset": 0, "limit": 100, "action": "database.getDocument" });
        ctx.body = res;
        console.log("get拿到的结果", res);
        return res;
    });
    router.get('/api/update', async (ctx) => {
        const request = new Request();
        const res = await request.send({ "has_server_date": false, "collection_name": "collection2", "query_type": "WHERE", "multi": true, "merge": true, "upsert": false, "update_data": "{\"$set\":{\"chenghe\":\"ckq\"}}", "query": "{\"age\":{\"$numberInt\":\"17\"}}", "action": "database.updateDocument" });
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
//# sourceMappingURL=server.js.map