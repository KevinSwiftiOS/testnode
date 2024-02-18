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
    router.get('/api', ctx => {
        const customConsole = new CustomConsole({ stdout: process.stdout });
        console = customConsole;
        console.log(({ "age": 35, "method": "get" }), 123);
        console.log(((({ "name": "ckq" }))));
        console.log(((({ "sex": "male", "school": "xuexiao" }))));
        console.log("get success");
        // console.log("get request", ctx.request);
        ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api500', ctx => {
        ctx.status = 500;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api401', ctx => {
        ctx.status = 401;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api403', ctx => {
        ctx.status = 403;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api404', ctx => {
        ctx.status = 404;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api301', ctx => {
        ctx.status = 301;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.get('/api302', ctx => {
        ctx.status = 302;
        //     const customConsole = new CustomConsole({ stdout: process.stdout });
        //     console = customConsole;
        //     console.log(({ "age": 35,"method": "get"}),123);
        //     console.log(((({"name": "ckq" }))));
        //     console.log(((({"sex": "male","school":"xuexiao" }))));
        //     console.log("get success");
        //    // console.log("get request", ctx.request);
        //     ctx.body = `Nodejs koa demo project`;
    });
    router.post('/api', ctx => {
        console.log("ctx.request.headers是啥", ctx.request.headers);
        console.log(JSON.parse(JSON.stringify({ "age": 35, "method": "post" })));
        console.log(JSON.parse(JSON.stringify({ "name": "ckq" })));
        console.log("112222221");
        console.log("post request rawbody", ctx.request.rawBody);
        console.log("post request body", ctx.request.body);
        ctx.body = ctx.request.body;
    });
    router.get("/apigettoken", async (ctx) => {
        let params = ctx.query;
        ctx.body = params;
    });
    router.post("/apitesttoken", async (ctx) => {
        console.log("ctx request headers", ctx.request.headers);
        ctx.body = ctx.request.body;
        // const data = {
        //     "appid": "ttaa3adc873504973d01",
        //     "secret": "8205b4ca4ce27d026b97346e0a6d224253cb893e",
        //     "grant_type": "client_credential"
        //   }
        //   // 设置请求头
        //   const headers = {
        //     'Content-Type': 'application/json',
        //   };
        //   try {
        //     const res = await new Promise((resolve, reject) => {
        //       // 使用Axios发起POST请求
        //       axios.post('https://developer.toutiao.com/api/apps/v2/token', data, {
        //         headers: {
        //           ...headers
        //         }
        //       })
        //         .then(response => {
        //           // 请求成功的处理逻辑
        //           resolve({ res: "success", ...response.data });
        //         })
        //         .catch(error => {
        //           // 请求失败的处理逻辑
        //           resolve({ "res": "error", error: error });
        //         });
        //     })
        //     ctx.body = res;
        //    // return res;
        //   } catch (error) {
        //     ctx.body = error;
        //    // return error;
        //   }
    });
    app.use(async (ctx, next) => {
        let hostname = "https://example.com";
        const headers = ctx.request.header;
        // if(headers['origin'] === hostname) {
        ctx.set('Access-Control-Allow-Origin', hostname); // 设置允许所有来源的请求
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