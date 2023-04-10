"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router_1 = __importDefault(require("@koa/router"));
// import axios from 'axios';
// 初始化各服务的连接 redis, mongo
async function initService() {
}
initService().then(async () => {
    const app = new koa_1.default();
    const router = new router_1.default();
    router.get('/', ctx => {
        ctx.body = `Nodejs koa demo project`;
        return { a: 1 };
    })
        .get('/api/test', async (ctx) => {
        return { a: 1 };
    });
    app.use((0, koa_bodyparser_1.default)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
//# sourceMappingURL=server.js.map