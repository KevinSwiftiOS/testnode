import Router from '@koa/router'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import axios from 'axios';
import { dySDK } from '@open-dy/node-server-sdk';
async function initService() {
}
initService().then(async () => {
    const app = new Koa();
    const router = new Router();
  
    router.get('/api/post', async(ctx) => {
        console.log("ctx.get", ctx.request);
        return '1';
     }).post('/api/post', (ctx) => {
        // 处理 POST 请求的逻辑
        console.log("ctx.post", ctx.request);
        return;
      //  console.log("ctx.post body", ctx.request.body);
      })
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error) => console.log("Init service  error: ", error));