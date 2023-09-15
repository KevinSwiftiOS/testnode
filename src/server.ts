import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'

// 初始化各服务的连接 redis, mongo


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