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
  
    router.get('/api2/test', async(ctx) => {
        console.log("test拿到的结果1", 'test');
        ctx.body = 'test';
        return 'test';
     });

    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error) => console.log("Init service  error: ", error));