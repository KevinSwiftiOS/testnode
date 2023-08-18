import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'

// 初始化各服务的连接 redis, mongo


    const app = new Koa();
    const router = new Router();
    router.post('/api/post',(ctx,next) => {
        let username = ctx.request.body;
        
        ctx.body = username;
    })
    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });