import Koa from 'koa';
import { koaBody } from 'koa-body';
import Router from '@koa/router'


// 初始化各服务的连接 redis, mongo
async function initService() {

}

initService().then(async () => {
   
    

    const app = new Koa();

    const router = new Router();
    router.get('/api', ctx => {
        console.log({ "age": 35,"method": "get"});
        console.log({"name": "ckq" })
        console.log("get success");
       // console.log("get request", ctx.request);
        ctx.body = `Nodejs koa demo project success`;
    });
    router.post('/api', ctx => {
        console.log({ "age": 35,"method": "post"});
        console.log({"name": "ckq" })
        console.log("112221");
        console.log("post request rawbody", ctx.request.rawBody);
        console.log("post request body", ctx.request.body);
        ctx.body = ctx.request.body;
    });
    app.use(koaBody());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));