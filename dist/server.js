"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router_1 = __importDefault(require("@koa/router"));
const axios_1 = __importDefault(require("axios"));
const app = new koa_1.default();
const router = new router_1.default();
router.get('/', ctx => {
    ctx.body = `Nodejs koa demo project`;
}).get('/api/get_dyc_open_id', async (ctx) => {
    const value = ctx.request.header['x-tt-openid'];
    console.log('headers', ctx.request.header);
    console.log('value1', value);
    if (value) {
        ctx.body = {
            success: true,
            data: value,
        };
    }
    else {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: `dyc-open-id not exist`,
        };
    }
}).post('/api/content_security', async (ctx) => {
    const body = ctx.request.body;
    const tasks = body.tasks;
    console.log('tasks', tasks);
    const res = await axios_1.default.post('https://developer.toutiao.com/api/v2/tags/text/antidirt', {
        tasks: tasks
    });
    ctx.body = {
        res: res,
        success: true,
    };
});
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes());
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map