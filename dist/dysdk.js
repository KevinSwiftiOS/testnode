"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dySDK = void 0;
// import { DataBaseError, Db } from '@open-dy/dycloud-db';
const axios_1 = __importDefault(require("axios"));
const https = __importStar(require("https"));
// class Request {
//   static headers: Record<string, any>;
//   async send(action: string, data: string, _: string) {
//     const params = Object.assign({}, data, {
//       action,
//     });
//     const res = await axios({
//       method: 'post',
//       url: process.env.DYC_CLOUD_DATABASE_URL
//         ? process.env.DYC_CLOUD_DATABASE_URL
//         : 'http://cloud-database-api.dycloud.run/api/cloud_database/exec_cloud_database_cmd', // 支持可配置 环境变量读取
//       data: params,
//       headers: {
//         // 支持环境变量的配置
//         'content-type': 'application/json',
//       },
//     });
//     if (res.status !== 200) {
//       throw new DataBaseError({
//         errMsg: res.statusText,
//         errorCode: res.status,
//       });
//     }
//     if (res?.data?.status_code) {
//       throw new DataBaseError({
//         errMsg: `${res.data.status_message} requestId: ${
//           res.data?.data?.request_id ?? ''
//         }`,
//         errorCode: res.data.status_code,
//       });
//     }
//     return res?.data?.data || {};
//   }
// }
class Context {
    constructor(context) {
        this.context = context;
    }
    getReal() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return {
            source: (_b = (_a = this === null || this === void 0 ? void 0 : this.context) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['x-tt-source'],
            ip: (_d = (_c = this === null || this === void 0 ? void 0 : this.context) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d['x-forwarded-for'],
            appId: (_e = this.context.headers) === null || _e === void 0 ? void 0 : _e['x-tt-appid'],
            envId: (_g = (_f = this === null || this === void 0 ? void 0 : this.context) === null || _f === void 0 ? void 0 : _f.headers) === null || _g === void 0 ? void 0 : _g['x-tt-envid'],
            openId: (_j = (_h = this === null || this === void 0 ? void 0 : this.context) === null || _h === void 0 ? void 0 : _h.headers) === null || _j === void 0 ? void 0 : _j['x-tt-openid'],
            unionId: (_l = (_k = this === null || this === void 0 ? void 0 : this.context) === null || _k === void 0 ? void 0 : _k.headers) === null || _l === void 0 ? void 0 : _l['x-tt-unionid'],
            anonymousOpenid: (_o = (_m = this === null || this === void 0 ? void 0 : this.context) === null || _m === void 0 ? void 0 : _m.headers) === null || _o === void 0 ? void 0 : _o['x-tt-anonymous-openid'],
        };
    }
    async inovoke(serviceID, path, method, querys, data, headers) {
        const selfServiceId = this.context.headers['x-tt-serviceid'];
        return new Promise((resolve, reject) => {
            axios_1.default
                .request({
                method: method,
                url: `http://${selfServiceId}-${serviceID}.dycloud.service/${path}`,
                data: data,
                headers: headers,
                params: querys,
            })
                .then((response) => {
                // 请求成功的处理逻辑
                resolve(response.data);
            })
                .catch((error) => {
                // 请求失败的处理逻辑
                reject(error);
            });
        });
    }
    async inovokeFunc(url, method, querys, data, headers) {
        return new Promise((resolve, reject) => {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            axios_1.default.defaults.httpsAgent = httpsAgent;
            axios_1.default
                .request({
                method: method,
                url: url,
                data: data,
                headers: headers,
                params: querys,
            })
                .then((response) => {
                // 请求成功的处理逻辑
                resolve(response.data);
            })
                .catch((error) => {
                // 请求失败的处理逻辑
                reject(error);
            });
        });
    }
}
exports.dySDK = (function () {
    // let instance: Db;
    return {
        // database: function (): Db {
        //   if (instance === undefined) {
        //     instance = new Db(Request);
        //   }
        //   return instance;
        // },
        context: function (context) {
            return new Context(context);
        },
    };
})();
//# sourceMappingURL=dysdk.js.map