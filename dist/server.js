"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const router_1 = __importDefault(require("@koa/router"));
const ioredis_1 = __importDefault(require("ioredis"));
const mongoose_1 = __importDefault(require("mongoose"));
const assert_1 = __importDefault(require("assert"));
// 初始化各服务的连接 redis, mongo
async function initService() {
    const { REDIS_ADDRESS, REDIS_USERNAME, REDIS_PASSWORD, MONGO_ADDRESS, MONGO_USERNAME, MONGO_PASSWORD } = process.env;
    const [REDIS_HOST, REDIS_PORT] = REDIS_ADDRESS.split(':');
    const redis = new ioredis_1.default({
        port: parseInt(REDIS_PORT, 10),
        host: REDIS_HOST,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        db: 0,
    });
    (0, assert_1.default)(await redis.echo('echo') === 'echo', `redis echo error`);
    const mongoUrl = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_ADDRESS}`;
    await mongoose_1.default.connect(mongoUrl);
    return {
        redis,
        mongoose: mongoose_1.default,
    };
}
initService().then(async ({ redis, mongoose }) => {
    const kittySchema = new mongoose.Schema({
        name: String
    });
    const Kitten = mongoose.model('Kitten', kittySchema);
    const app = new koa_1.default();
    const router = new router_1.default();
    router.get('/', ctx => {
        ctx.body = `Nodejs koa demo project`;
    }).get('/api/get_data_from_redis', async (ctx) => {
        const key = ctx.query.key;
        (0, assert_1.default)(key === null || key === void 0 ? void 0 : key.trim(), `key is required`);
        const value = await redis.get(key);
        if (value) {
            ctx.body = {
                success: true,
                data: value,
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: `${key} not exist`,
            };
        }
    }).post('/api/set_data_to_redis', async (ctx) => {
        const key = ctx.query.key;
        const body = ctx.request.body;
        const value = body.value;
        (0, assert_1.default)(key === null || key === void 0 ? void 0 : key.trim(), `key is required`);
        (0, assert_1.default)(value === null || value === void 0 ? void 0 : value.trim(), `value is required`);
        await redis.set(key, value);
        ctx.body = {
            success: true,
        };
    }).get('/api/get_data_from_mongodb', async (ctx) => {
        const name = ctx.query.name;
        (0, assert_1.default)(name === null || name === void 0 ? void 0 : name.trim(), `name is required`);
        const data = await Kitten.findOne({ name });
        if (data) {
            ctx.body = {
                success: true,
                data: data.toJSON(),
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: `${name} not exist`,
            };
        }
    }).post('/api/set_data_to_mongodb', async (ctx) => {
        const name = ctx.query.name;
        (0, assert_1.default)(name === null || name === void 0 ? void 0 : name.trim(), `name is required`);
        const kit = new Kitten({ name });
        await kit.save();
        ctx.body = {
            success: true,
        };
    });
    app.use((0, koa_bodyparser_1.default)());
    app.use(router.routes());
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => console.log("Init service  error: ", error));
//# sourceMappingURL=server.js.map