"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router_1 = __importDefault(require("@koa/router"));
// 初始化各服务的连接 redis, mongo
const app = new koa_1.default();
const router = new router_1.default();
router.get('/api/post', async (ctx) => {
    console.log("ctx.get", ctx.request);
    return '1';
}).post('/api/post', (ctx) => {
    // 处理 POST 请求的逻辑
    console.log("ctx.post", ctx.request);
    return;
    //  console.log("ctx.post body", ctx.request.body);
});
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes());
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map