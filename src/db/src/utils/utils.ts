import { EJSON } from 'bson';

import { QueryOption, UpdateOption } from '../query';
import { isObject } from './type';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sleep = (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const counters: Record<string, number> = {};

export const autoCount = (domain = 'any'): number => {
  if (!counters[domain]) {
    counters[domain] = 0;
  }

  return counters[domain]++;
};

export const getReqOpts = (apiOptions: QueryOption | UpdateOption): any => {
  // 影响底层request的暂时只有timeout
  if (apiOptions.timeout !== undefined) {
    return {
      timeout: apiOptions.timeout,
    };
  }

  return {};
};

// 递归过滤对象中的undefiend字段
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const filterUndefined = (o) => {
  // 如果不是对象类型，直接返回
  if (!isObject(o)) {
    return o;
  }

  for (const key in o) {
    if (o[key] === undefined) {
      delete o[key];
    } else if (isObject(o[key])) {
      o[key] = filterUndefined(o[key]);
    }
  }

  return o;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const stringifyByEJSON = (params) => {
  // params中删除undefined的key
  params = filterUndefined(params);

  return EJSON.stringify(params, { relaxed: false });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const parseByEJSON = (params) => EJSON.parse(params);

export class TcbError extends Error {
  readonly code: string;
  readonly message: string;
  constructor(error: IErrorInfo) {
    super(error.message);
    this.code = error.code;
    this.message = error.message;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const E = (errObj: IErrorInfo) => new TcbError(errObj);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function processReturn(throwOnCode: boolean, res: any) {
  if (throwOnCode === false) {
    // 不抛报错，正常return，兼容旧逻辑
    return res;
  }

  throw E({ ...res });
}

interface IErrorInfo {
  code?: string;
  message?: string;
}
