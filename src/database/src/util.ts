import { ObjectId } from 'bson';
import { EJSON } from 'bson';

import { FieldType } from './constant';
import { ServerDate } from './serverDate';
import { isObject } from './typings';
/**
 * 工具模块
 *
 *
 */
export const Util = {
  /**
   * 格式化后端返回的文档数据
   *
   * @param document - 后端文档数据
   */
  formatResDocumentData: (documents: any[]) =>
    documents.map((document) => Util.formatField(document)),

  /**
   * 格式化字段
   *
   * 主要是递归数组和对象，把地理位置和日期时间转换为js对象。
   *
   * @param document
   * @internal
   */
  formatField: (document: any) => {
    const keys = Object.keys(document);
    let protoField = {};

    // 数组递归的情况
    if (Array.isArray(document)) {
      protoField = [];
    }

    for (const key of keys) {
      const item = document[key];
      let realValue;

      const type = Util.whichType(item);
      switch (type) {
        case FieldType.Date:
          realValue = item;
          break;
        case FieldType.Object:
          // 对id 字段做校验
          if (key === '_id' && ObjectId.isValid(item)) {
            try {
              realValue = item.toString();
            } catch {
              realValue = '';
            }
          } else {
            realValue = Util.formatField(item);
          }

          break;
        case FieldType.Array:
          realValue = Util.formatField(item);
          break;
        default:
          realValue = item;
      }

      if (Array.isArray(protoField)) {
        protoField.push(realValue);
      } else {
         //@ts-ignore
        protoField[key] = realValue;
      }
    }

    return protoField;
  },

  /**
   * 查看数据类型
   *
   * @param obj
   */
  whichType: (obj: any): string => {
    const type = Object.prototype.toString.call(obj).slice(8, -1);

    if (type === FieldType.Date) {
      return FieldType.Date;
    }

    return type;
  },
};
export const filterUndefined = (o: any): any => {
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

export const stringifyByEJSON = (params:any) => {
  // params中删除undefined的key
  params = filterUndefined(params);
  // EJSON 的 stringify 将{a: {"$eq": 3}} 添加上{\"$eq\":{\"$numberInt\":\"3\"}}}
  return EJSON.stringify(params, { relaxed: false });
};

export function hasOwnProperty(obj: any, key: string): boolean {
  return obj && Object.prototype.hasOwnProperty.call(obj, key);
}

export function formatRequestServerDateParams(params: any) {
  if (ServerDate.getServerDate()) {
    params.has_server_date = true;
  }

  ServerDate.resetHasServerDate();
  return params;
}
