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
router.post('/api/post', (ctx, next) => {
    let username = ctx.request.body;
    ctx.body = username;
});
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes());
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map