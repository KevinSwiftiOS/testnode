import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
import { dySDK }  from '@open-dy/node-server-sdk';
// 初始化各服务的连接 redis, mongo
async function initService() {
 
}

initService().then(() => {
    const app = new Koa();
    const router = new Router();
    const database = dySDK.database();  
    router.get('/', ctx => {
        ctx.body = `Nodejs koa demo project`;
    }).get('/api/get', async(ctx) => {
        const todos = await database.collection("todos").get();
     ctx.body = {
        data: todos
     }
     return 'success';
    })
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));