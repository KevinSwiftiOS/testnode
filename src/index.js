import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'


// 初始化各服务的连接 redis, mongo
async function initService() {

}

initService().then(async () => {
   
    

    const app = new Koa();

    const router = new Router();
    router.get('/api', ctx => {
        console.log("get request", ctx.request);
        ctx.body = JSON.stringify({"message": 5});
    });
    router.get('/api', ctx => {
        console.log("post request", ctx.request);
        ctx.body = `Nodejs koa demo project`;
    });
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));