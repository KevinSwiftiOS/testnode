import  Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import axios from 'axios';
import { db,  baseDb, DataBaseError } from './database/src';
class Request {

 
  async send(action: unknown, data: unknown) {
    const params = Object.assign({}, data, {
      action,
    });

    const res = await axios({
      method: 'post',
      url: 'http://cloud-database-api.dycloud.run/api/cloud_database/exec_cloud_database_cmd',
      data: params,
      headers: {
        'X-TT-ENV': 'ppe_cloud_database_dyc',
        'content-type': 'application/json',
        'x-use-ppe': 1
      },
    });
    console.log("res status", res.status);
    console.log("res status === 200", res.status === 200);
    console.log("res.statusText", res.statusText);
    console.log("res data",JSON.stringify(res.data));
    console.log("res.data.statusMessage", res.data.status_message);
    console.log("res.data.statusCode", res.data.statusCode);
    if (res.data.status_code) {
      throw new DataBaseError({
        errMsg: res.data.status_message ?? '',
        errorCode: res.data.status_code,
      });
    }

    return (res?.data?.data || {});
  }
}
async function initService() {

}
initService().then(async () => {
    const app = new Koa();
    const router = new Router();
    const dbInstance = new db();
    baseDb.reqClass = Request;
    router.get('/api/test', async(ctx) => {
        console.log("test拿到的结果", 'test');
        ctx.body = 'test';
        return 'test';
     });
    router.get('/api/get', (ctx) => {
       console.log("get拿到的结果", ctx.request.body);
       ctx.body = ctx.request.body;
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

}).catch((error: string) => console.log("Init service  error: ", error));