import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { baseDb, db } from '@open-dy/cloud-database';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import axios from 'axios';
// import axios from 'axios';
class Request {
  // constructor(config: { envID: string; throwOnNotFound: boolean }) {
  // }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async send(action: unknown, data: unknown) {
    const params = Object.assign({}, data, {
      action,
    });
    console.log('请求的参数', params);
    console.log(
      process.env.NODE_ENV === 'development'
        ? 'dycloud-api-boe.byted.org'
        : 'dycloud.volces.com'
    );
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: process.env.NODE_ENV !== 'development'
                ? 'http://dycloud-api-boe.byted.org/api/cloud_db/exec_cloud_database'
                : 'http://dycloud.volces.com/api/cloud_db/exec_cloud_database',
            data: params,
            headers: {
                'X-TT-ENV': 'boe_cloud_database_dyc',
                'content-type': 'application/json',
            },
        })
            .then((res) => {
                // console.log('res', res);
            resolve(res);
        })
            .catch((error) => {
            // console.log('error', error);
            reject(error);
        });
    });
  }
}
export class CloudBase {
  config: any;
  /* eslint-disable new-cap */
  constructor(config?: any) {
    this.config = config;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  database(config: any) {
    const dbInstance = new db(config);
    baseDb.reqClass = Request;
    return dbInstance;
  }
}

// 初始化各服务的连接 redis, mongo
async function initService() {
}

initService().then(async ({}) => {


    const app = new Koa();

    const router = new Router();
    router.get('/', ctx => {
        ctx.body = `Nodejs koa demo project`;
        return {a: 1}
    })
    .get('/api/test', async(ctx) => {
        return {a: 1}
    })

    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));