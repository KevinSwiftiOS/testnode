import { EJSON } from 'bson';

import { baseDb } from './basedb';
import { OrderByDirection, OrderDirectionList, QueryType } from './constant';
import { DataBaseError, ErrorMsg, ERRORS } from './Errors';
import { QuerySerializer } from './serializer/query';
import { UpdateSerializer } from './serializer/update';
import { CountRes, GetRes, RemoveRes, UpdateRes } from './typings';
import { Util } from './util';
import {
  formatRequestServerDateParams,
  hasOwnProperty,
  stringifyByEJSON,
} from './util';
interface BaseOption {
  timeout?: number; // 接口调用超时设置
}
export interface QueryOption extends BaseOption {
  // 查询数量
  limit?: number;
  // 偏移量
  offset?: number;
  // 指定显示或者不显示哪些字段
  projection?: any;
  // 结果排序
  order?: Record<string, any>[];
}

export interface UpdateOption extends BaseOption {
  // 是否只影响单条doc
  multiple?: boolean;
  // // 是否插入
  // upsert?: boolean
  // // 是否replace
  // merge?: boolean
}

/**
 * 查询模块
 */
export class Query {
  /**
   * Db 的引用
   *
   * @internal
   */
  protected _db: baseDb;

  /**
   * Collection name
   *
   * @internal
   */
  protected _coll: string;

  /**
   * 过滤条件
   *
   * @internal
   */
  private _fieldFilters: string;

  /**
   * 统一条件项
   *
   * @private
   * @type {(QueryOption)}
   * @memberof Query
   */
  _apiOptions: QueryOption;

  /**
   * 请求实例
   *
   * @internal
   */
  _request: any;

  constructor(
    db: baseDb,
    coll: string,
    fieldFilters?: string,
    apiOptions?: QueryOption
  ) {
    this._db = db;
    this._coll = coll;
    this._fieldFilters = fieldFilters;
    this._apiOptions = apiOptions || {};
    this._request = new baseDb.reqClass(this._db.config);
  }

  /**
   * 查询条件
   *
   * @param query 需要
   */
  where(query: any): Query {
    // query校验 1. 必填对象类型  2. value 不可均为undefiend
    if (Object.prototype.toString.call(query).slice(8, -1) !== 'Object') {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.where.WHERE_PARAM_OBJECT_ERROR,
      });
    }

    const keys = Object.keys(query);

    const checkFlag = keys.some((item) => query[item] !== undefined);

    if (keys.length > 0 && !checkFlag) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.where.WHREE_PARAM_UNDEFINED_ERROR,
      });
    }

    return new Query(this._db, this._coll, QuerySerializer.encodeEJSON(query), {
      ...this._apiOptions,
    });
  }

  /**
   * 设置排序方式
   *
   * @param fieldPath     - 字段路径
   * @param directionStr  - 排序方式 需要
   */
  orderBy(fieldPath: string, directionStr: OrderByDirection): Query {
    if (!/^[\w.-]/.test(fieldPath)) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection['order-by'].ORDER_BY_FIELD_PATH_ERROR,
      });
    }

    if (!OrderDirectionList.includes(directionStr)) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection['order-by'].ORDER_BY_DIRECTION_ERROR,
      });
    }

    const newOrder: Record<string, any> = {
      [fieldPath]: directionStr === 'desc' ? -1 : 1,
    };
    const order = (this._apiOptions as QueryOption).order || {};
    const newApiOption = Object.assign({}, this._apiOptions, {
      order: Object.assign({}, order, newOrder),
    });
    // apiOptions 的赋值
    return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
  }

  /**
   * 设置查询条数
   *
   * @param limit - 限制条数
   */
  limit(limit: number): Query {
    if (!Number.isInteger(limit)) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.limit.LIMIT_PARAM_ERROR,
      });
    }

    const newApiOption: QueryOption = { ...this._apiOptions };
    newApiOption.limit = limit;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
  }

  /**
   * 设置偏移量
   *
   * @param offset - 偏移量
   */
  skip(offset: number): Query {
    if (!Number.isInteger(offset)) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.skip.SKIP_PARAM_ERROR,
      });
    }

    const newApiOption: QueryOption = { ...this._apiOptions };
    newApiOption.offset = offset;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
  }

  /**
   * 指定要返回的字段
   * project 示例
   * 存在doc {a:1, b:2, c: [1,2,3,4], d: [{item: 1}, [item: 2]]}
   * 1. 指定返回doc中字段a,b,  projection设置为{a: true, b:true}
   *
   * @param projection
   */
  field(projection: any): Query {
    const transformProjection = {};
    for (const k of Object.keys(projection)) {
      // 区分bool类型，number类型 和 Object类型
      if (typeof projection[k] === 'boolean') {
        //@ts-ignore
        transformProjection[k] = projection[k] === true ? 1 : 0;
      }

      if (typeof projection[k] === 'number') {
        //@ts-ignore
        transformProjection[k] = projection[k] > 0 ? 1 : 0;
      }

      if (typeof projection[k] === 'object') {
        //@ts-ignore
        transformProjection[k] = projection[k];
      }
    }

    const newApiOption: QueryOption = { ...this._apiOptions };
    newApiOption.projection = transformProjection;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption);
  }

  async get(): Promise<GetRes> {
    const { order } = this._apiOptions as any;
    interface Param {
      collection_name: string;
      transactionId?: string;
      query?: any;
      query_type: QueryType;
      order?: string;
      offset?: number;
      limit?: number;
      projection?: any;
    }
    const param: Param = {
      collection_name: this._coll,
      query_type: QueryType.WHERE,
    };
    if (this._fieldFilters) {
      param.query = this._fieldFilters;
    }

    if (order) {
      param.order = stringifyByEJSON(order);
    }

    // 从 _apiOptions 里面拿值
    const { offset } = this._apiOptions as QueryOption;
    param.offset = offset ? offset : 0;

    const { limit } = this._apiOptions as QueryOption;
    param.limit = limit ? limit : 100;

    const { projection } = this._apiOptions as QueryOption;

    if (projection) {
      param.projection = stringifyByEJSON(projection);
    }

    const data = await this._request.send(
      'database.getDocument',
      formatRequestServerDateParams(param)
    );
    const list = data?.list?.map((item: any) => EJSON.parse(item));
    const documents = Util.formatResDocumentData(list ?? []);
    return { data: documents, requestId: data.request_id ?? '' };
  }

  /**
   * 获取总数
   */
  async count(): Promise<CountRes> {
    interface Param {
      collection_name: string;
      query?: any;
      query_type: QueryType;
    }
    const param: Param = {
      collection_name: this._coll,
      query_type: QueryType.WHERE,
    };
    if (this._fieldFilters) {
      param.query = this._fieldFilters;
    }

    const res = await this._request.send(
      'database.calculateDocument',
      formatRequestServerDateParams(param)
    );
    return { total: res.total, requestId: res.request_id };
  }

  async update(opts: any): Promise<UpdateRes> {
    if (
      !(
        opts &&
        Object.prototype.toString.call(opts).slice(8, -1) !== 'Object' &&
        Object.keys(opts).length > 0
      )
    ) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.update.UPDATE_PARAM_ERROR,
      });
    }

    if (hasOwnProperty(opts, '_id')) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.update.UPDATE_ID_ERROR,
      });
    }

    const param: any = {
      collection_name: this._coll,
      query_type: QueryType.WHERE,
      multi: true,
      merge: true,
      upsert: false,
      update_data: UpdateSerializer.encodeEJSON(opts),
    };

    if (this._fieldFilters) {
      param.query = this._fieldFilters;
    }

    const res = await this._request.send(
      'database.updateDocument',
      formatRequestServerDateParams(param)
    );
    return {
      updated: res.updated ?? 0,
      requestId: res.request_id ?? '',
    };
  }

  /**
   * 条件删除文档
   */
  async remove(): Promise<RemoveRes> {
    const { offset, limit, projection, order } = this
      ._apiOptions as QueryOption;
    if (
      offset !== undefined ||
      limit !== undefined ||
      projection !== undefined ||
      order !== undefined
    ) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.collection.remove.REMOVE_PARAM_ERROR,
      });
    }
    // multi 再确认下
    // const multi = true // where remove 不传multi默认为true

    const param = {
      collection_name: this._coll,
      query: this._fieldFilters,
      query_type: QueryType.WHERE,
      multi: true,
    };
    const res = await this._request.send(
      'database.removeDocument',
      formatRequestServerDateParams(param)
    );
    return {
      deleted: res?.deleted ?? 0,
      requestId: res?.request_id ?? '',
    };
  }
}
