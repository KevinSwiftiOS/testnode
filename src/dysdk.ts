// import { DataBaseError, Db } from '@open-dy/dycloud-db';
import axios from 'axios';
import * as https from 'https';
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
  private context;
  constructor(context: any) {
    this.context = context;
  }

  getReal() {
    return {
      source: this?.context?.headers?.['x-tt-source'],
      ip: this?.context?.headers?.['x-forwarded-for'],
      appId: this.context.headers?.['x-tt-appid'],
      envId: this?.context?.headers?.['x-tt-envid'],
      openId: this?.context?.headers?.['x-tt-openid'],
      unionId: this?.context?.headers?.['x-tt-unionid'],
      anonymousOpenid: this?.context?.headers?.['x-tt-anonymous-openid'],
    };
  }

  public async inovoke(
    serviceID: string,
    path: string,
    method: string,
    querys: any,
    data: any,
    headers: Record<string, string | number | boolean>
  ) {
    const selfServiceId = this.context.headers['x-tt-serviceid'];
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: method, // 请求方法
          url: `http://${selfServiceId}-${serviceID}.dycloud.service/${path}`, // 请求URL
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

  public async inovokeFunc(
    url: string,
    method: string,
    querys: any,
    data: any,
    headers: any
  ) {
    return new Promise((resolve, reject) => {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
      axios.defaults.httpsAgent = httpsAgent;
      axios
        .request({
          method: method, // 请求方法
          url: url, // 请求URL
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
export const dySDK = (function () {
  // let instance: Db;
  return {
    // database: function (): Db {
    //   if (instance === undefined) {
    //     instance = new Db(Request);
    //   }

    //   return instance;
    // },
    context: function (context: any): Context {
      return new Context(context);
    },
  };
})();
