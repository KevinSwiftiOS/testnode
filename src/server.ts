import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
import axios from 'axios';
const app = new Koa();
const router = new Router();
router.get('/', ctx => {
    ctx.body = `Nodejs koa demo project`;
}).get('/api/get_dyc_open_id', async (ctx) => {
    const value = ctx.request.header['x-tt-openid'] as string;
    console.log('headers', ctx.request.header);
    console.log('value1', value);
    if (value) {
        ctx.body = {
            success: true,
            data: value,
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: `dyc-open-id not exist`,
        }
    }
}).post('/api/content_security', async (ctx) => {
    const body: any = ctx.request.body;
    const tasks = body.tasks;
    const params = { "tasks": tasks };
    console.log('tasks', tasks);
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };
    const res = await axios.post('https://developer.toutiao.com/api/v2/tags/text/antidirt', params, customConfig);
    ctx.body = {
        res: res,
        success: true,
    }
});

app.use(bodyParser());
app.use(router.routes());

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});