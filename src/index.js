import Router from '@koa/router'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import axios from 'axios';
import { dySDK } from './ckq-test-node/dist/commonjs/index.js';
async function initService() {
}
initService().then(async () => {
    const app = new Koa();
    const router = new Router();
  
    router.get('/api/test', async(ctx) => {
        console.log("test拿到的结果", 'test');
        ctx.body = 'test';
        return 'test';
     });
    router.get('/api/get', async (ctx) => {
       console.log("get拿到的结果", ctx.request.body);
       const res = await dySDK.database().collection('todos').get();
       console.log('res', res);
       ctx.body = res;
       return '11 get';
    });

   router.post('/api/post',(ctx) => {
    console.log('1234567',ctx.request.body);
       // const res = await dbInstance.collection("collection2").add({data: {name: ctx.params}});
        ctx.body = ctx.request.body;
        return  ctx.request.body; 
     });
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error) => console.log("Init service  error: ", error));