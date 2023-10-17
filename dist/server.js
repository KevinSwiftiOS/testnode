"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConsole = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = require("koa-body");
const router_1 = __importDefault(require("@koa/router"));
const console_1 = require("console");
class CustomConsole extends console_1.Console {
    constructor(options) {
        super(options);
        // 自定义的属性或初始化逻辑
    }
    log(...args) {
        // 自定义的 log 方法逻辑
        // 例如，添加时间戳或其他自定义信息
        const timestamp = new Date().toISOString();
        super.log(typeof args);
        super.log(args);
        // this.trace_log.push({ args: args.join(), timestamp: timestamp });
    }
}
exports.CustomConsole = CustomConsole;
// 创建自定义的 console 对象
// 初始化各服务的连接 redis, mongo
async function initService() {
}
initService().then(async () => {
    const app = new koa_1.default();
    const router = new router_1.default();
    router.get('/api', ctx => {
        const customConsole = new CustomConsole({ stdout: process.stdout });
        console = customConsole;
        console.log(JSON.stringify(({ "age": 35, "method": "get" })), 123);
        console.log((JSON.stringify(({ "name": "ckq" }))));
        console.log((JSON.stringify(({ "sex": "male", "school": "xuexiao" }))));
        console.log("get success");
        // console.log("get request", ctx.request);
        ctx.body = `Nodejs koa demo project`;
    });
    router.post('/api', ctx => {
        console.log(JSON.parse(JSON.stringify({ "age": 35, "method": "post" })));
        console.log(JSON.parse(JSON.stringify({ "name": "ckq" })));
        console.log("112221");
        console.log("post request rawbody", ctx.request.rawBody);
        console.log("post request body", ctx.request.body);
        ctx.body = ctx.request.body;
    });
    app.use((0, koa_body_1.koaBody)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
//# sourceMappingURL=server.js.map