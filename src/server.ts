import Koa from 'koa';
import { koaBody } from 'koa-body';
import Router from '@koa/router'
import { Console } from 'console';

export class CustomConsole extends Console {
    constructor(options:any) {
        super(options);
        // 自定义的属性或初始化逻辑
    }

    log(...args:any) {
        
        // 自定义的 log 方法逻辑
        // 例如，添加时间戳或其他自定义信息
        const timestamp = new Date().toISOString();
     
        if(args.length === 1) {
            super.log("length == 1");
            const first = args[0];
            super.log(typeof first);
            super.log(first);
            if(Object.prototype.toString.call(first) === "[object Object]") {
                super.log("是一个object");
                super.log(JSON.stringify(first));
            }
        }else {
          super.log("length > 1");
          super.log(typeof args);
          super.log(args);
        }
       // this.trace_log.push({ args: args.join(), timestamp: timestamp });
    }
    // getTraceLog() {
    //     return this.trace_log;
    // }

    // 可以重写其他的 console 方法，如 error, warn, info, etc.
}


// 创建自定义的 console 对象

// 初始化各服务的连接 redis, mongo
async function initService() {

}

initService().then(async () => {
   
    

    const app = new Koa();

    const router = new Router();
    router.get('/api', ctx => {
        const customConsole = new CustomConsole({ stdout: process.stdout });
        console = customConsole;
        console.log(({ "age": 35,"method": "get"}),123);
        console.log(((({"name": "ckq" }))));
        console.log(((({"sex": "male","school":"xuexiao" }))));
        console.log("get success");
       // console.log("get request", ctx.request);
        ctx.body = `Nodejs koa demo project`;
    });
    router.post('/api', ctx => {
        console.log(JSON.parse(JSON.stringify({ "age": 35,"method": "post"})));
        console.log(JSON.parse(JSON.stringify({"name": "ckq" })))
        console.log("112221");
        console.log("post request rawbody", ctx.request.rawBody);
        console.log("post request body", ctx.request.body);
        ctx.body = ctx.request.body;
    });

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'caokaiqiang'); // 设置允许所有来源的请求
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 设置允许的HTTP请求方法
    ctx.set('Access-Control-Allow-Headers', 'Content-Type'); // 设置允许的请求头字段
  
    await next();
  });
    app.use(koaBody());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));