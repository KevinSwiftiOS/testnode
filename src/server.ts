import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
import axios from 'axios';
// import axios from 'axios';

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