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
        if (args.length === 1) {
            super.log("length == 1");
            const first = args[0];
            super.log(typeof first);
            super.log(first);
            if (Object.prototype.toString.call(first) === "[object Object]") {
                super.log("是一个object");
                super.log(JSON.stringify(first));
            }
        }
        else {
            super.log("length > 1");
            super.log(typeof args);
            super.log(args);
        }
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
    router.get('/api', (ctx) => {
        ctx.body = JSON.stringify({ "name": 1 });
    });
    app.use(async (ctx, next) => {
        let hostname = "https://example.com";
        const headers = ctx.request.header;
        // if(headers['origin'] === hostname) {
        ctx.set('Access-Control-Allow-Origin', "*"); // 设置允许所有来源的请求
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 设置允许的HTTP请求方法
        ctx.set('Access-Control-Allow-Headers', 'Content-Type'); // 设置允许的请求头字段
        // }
        if (ctx.method === 'OPTIONS') {
            ctx.status = 200;
        }
        else {
            await next();
        }
    });
    app.use((0, koa_body_1.koaBody)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
//# sourceMappingURL=server.js.map