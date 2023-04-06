/* eslint-disable unicorn/prefer-object-from-entries */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
import { EJSON } from 'bson';

import { baseDb } from './basedb';
import { ERRORS } from './const/code';
import { ErrorCode, OrderByDirection, QueryType } from './constant';
// import { Command } from './command';
// import * as isRegExp from 'is-regex'
import { QuerySerializer } from './serializer/query';
import { UpdateSerializer } from './serializer/update';
import { Util } from './util';
import { getReqOpts, processReturn, stringifyByEJSON } from './utils/utils';
import { Validate } from './validate';

interface GetRes {
  data: any[];
  // requestId: string;
  // total: number;
  // limit: number;
  // offset: number;
}

interface BaseOption {
  timeout?: number; // 接口调用超时设置
  raw?: boolean; // 原生语句查询
}

export interface QueryOption extends BaseOption {
  // 查询数量
  limit?: number;
  // 偏移量
  offset?: number;
  // 指定显示或者不显示哪些字段
  // eslint-disable-next-line @typescript-eslint/ban-types
  projection?: object;
  // 结果排序
  order?: Record<string, any>[];
  hasWhere?: boolean;
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
 *
 *
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
   *
   * @protected
   * @type {string}
   * @memberof Query
   */
  protected _transactionId: string;

  /**
   * 过滤条件
   *
   * @internal
   */
  private _fieldFilters: string;

  // /**
  //  * 排序条件
  //  *
  //  * @internal
  //  */
  // private _fieldOrders: QueryOrder[]

  // /**
  //  * 查询条件
  //  *
  //  * @internal
  //  */
  // private _queryOptions: QueryOption

  /**
   * 统一条件项
   *
   * @private
   * @type {(QueryOption | UpdateOption)}
   * @memberof Query
   */
  _apiOptions: QueryOption | UpdateOption;

  /**
   * 请求实例
   *
   * @internal
   */
  _request: any;

  /**
   * websocket 参数 pingTimeout
   */
  // private _pingTimeout: number

  /**
   * websocket 参数 pongTimeout
   */
  // private _pongTimeout: number

  /**
   * websocket 参数 reconnectTimeout
   */
  // private _reconnectTimeout: number

  /**
   * websocket 参数 wsURL
   */
  // private _wsURL: string

  /**
   * 初始化
   *
   * @internal
   *
   * @param db            - 数据库的引用
   * @param coll          - 集合名称
   * @param fieldFilters  - 过滤条件
   * @param fieldOrders   - 排序条件
   * @param queryOptions  - 查询条件
   */
  constructor(
    db: baseDb,
    coll: string,
    fieldFilters?: string,
    apiOptions?: QueryOption | UpdateOption,
    transactionId?: string
  ) {
    this._db = db;
    this._coll = coll;
    this._fieldFilters = fieldFilters;
    this._apiOptions = apiOptions || {};
    this._request = new baseDb.reqClass(this._db.config);
    this._transactionId = transactionId;
  }

  /**
   * 发起请求获取文档列表
   *
   * - 默认获取集合下全部文档数据 需要
   * - 可以把通过 `orderBy`、`where`、`skip`、`limit`设置的数据添加请求参数上
   */
  async get(): Promise<GetRes | any> {
    /* eslint-disable no-param-reassign */

    const { order } = this._apiOptions as any;

    interface Param {
      collectionName: string;
      transactionId?: string;
      // eslint-disable-next-line @typescript-eslint/ban-types
      query?: object;
      queryType: QueryType;
      order?: string[];
      offset?: number;
      limit?: number;
      // eslint-disable-next-line @typescript-eslint/ban-types
      projection?: object;
    }
    const param: Param = {
      collectionName: this._coll,
      queryType: QueryType.DOC,
      // transactionId: this._transactionId,
    };
    if (this._fieldFilters) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param.query = this._fieldFilters;
    }

    if (order) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param.order = stringifyByEJSON(order);
    }
    // if (this._queryOptions.offset) {
    //   param.offset = this._queryOptions.offset
    // }

    const { offset } = this._apiOptions as QueryOption;
    if (offset) {
      param.offset = offset;
    }

    const { limit } = this._apiOptions as QueryOption;

    // if (this._queryOptions.limit) {
    //   param.limit = this._queryOptions.limit < 1000 ? this._queryOptions.limit : 1000
    // } else {
    //   param.limit = 100
    // }
    if (limit) {
      param.limit = limit < 1000 ? limit : 1000;
    } else {
      param.limit = 100;
    }

    const { projection } = this._apiOptions as QueryOption;
    // if (this._queryOptions.projection) {
    //   param.projection = this._queryOptions.projection
    // }

    if (projection) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param.projection = stringifyByEJSON(projection);
    }

    const { hasWhere = false } = this._apiOptions as QueryOption;

    param.queryType = hasWhere ? QueryType.WHERE : QueryType.DOC;
    await this._request.send('database.getDocument', param, getReqOpts(this._apiOptions));
    // return {
    //   a: 1
    // }
    // try {

    // );
    // console.log("_res", _res);
    // // if (res?.code) {
    // // throw new Error('13');
    // // }
    // const list1 = [
    //   '{"_id":{"$oid":"642b9064a3515a645d1f55eb"},"updateTime":{"$date":{"$numberLong":"1598528843000"}}}',
    // ];
    // // if (res.code) {
    // //   throw E({ ...res })
    // // } else {
    // const list = list1.map((item) => EJSON.parse(item));
    // const documents = Util.formatResDocumentData(list);
    // return {
    //   data: documents,
    // };
    // // const result: any = {
    // //   data: documents,
    // //   requestId: res.requestId,
    // // };
    // // if (res.limit) {
    // //   result.limit = res.limit;
    // // }

    // if (res.offset) {
    //   result.offset = res.offset;
    // }

    // return result;
    // } catch(err) {
    //   // 如果配置了throwOnCode 则不用返回错误
    //   if(this._db.config.throwOnCode) {
    //     return {};
    //   }
    // }
  }

  /**
   * 获取总数 需要
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async count() {
    interface Param {
      collectionName: string;
      // eslint-disable-next-line @typescript-eslint/ban-types
      query?: object;
      queryType: QueryType;
    }
    const param: Param = {
      collectionName: this._coll,
      queryType: QueryType.WHERE,
    };
    if (this._fieldFilters) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      param.query = this._fieldFilters;
    }
    // const res = await this._request.send(
    //   'database.countDocument',
    //   param,
    //   getReqOpts(this._apiOptions)
    // );
    return 9;

    // if (res.code) {
    //   return res;
    // }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    // return {
    //   requestId: res.requestId,
    //   total: res.data.total,
    // };
    // }
  }

  /**
   * 查询条件
   *
   * @param query 需要
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  where(query: object): Query {
    // query校验 1. 必填对象类型  2. value 不可均为undefiend
    if (Object.prototype.toString.call(query).slice(8, -1) !== 'Object') {
      throw new Error(ErrorCode.QueryParamTypeError);
    }

    const keys = Object.keys(query);

    const checkFlag = keys.some(item => query[item] !== undefined);

    if (keys.length > 0 && !checkFlag) {
      throw new Error(ErrorCode.QueryParamValueError);
    }

    return new Query(
      this._db,
      this._coll,
      QuerySerializer.encodeEJSON(query, this._apiOptions.raw || false),
      { ...this._apiOptions, hasWhere: true },
      this._transactionId
      // this._fieldOrders,
      // this._queryOptions
    );
  }

  /**
   * 设置排序方式
   *
   * @param fieldPath     - 字段路径
   * @param directionStr  - 排序方式 需要
   */
  orderBy(fieldPath: string, directionStr: OrderByDirection): Query {
    Validate.isFieldPath(fieldPath);
    Validate.isFieldOrder(directionStr);

    const newOrder: Record<string, any> = {
      // key: fieldPath,
      // direction: directionStr === 'desc' ? -1 : 1
      [fieldPath]: directionStr === 'desc' ? -1 : 1,
    };
    // const combinedOrders = this._fieldOrders.concat(newOrder)
    const order = (this._apiOptions as QueryOption).order || {};

    const newApiOption = Object.assign({}, this._apiOptions, {
      // order: order.concat(newOrder)
      order: Object.assign({}, order, newOrder),
    });

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
  }

  /**
   * 设置查询条数
   *
   * @param limit - 限制条数 需要
   */
  limit(limit: number): Query {
    Validate.isInteger('limit', limit);

    const newApiOption: QueryOption = { ...this._apiOptions };
    newApiOption.limit = limit;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
  }

  /**
   * 设置偏移量
   *
   * @param offset - 偏移量 需要
   */
  skip(offset: number): Query {
    Validate.isInteger('offset', offset);

    // let option = { ...this._queryOptions }
    const newApiOption: QueryOption = { ...this._apiOptions };

    newApiOption.offset = offset;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
  }

  /**
   * 发起请求批量更新文档
   *
   * @param data 数据 需要
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(data: object): Promise<any> {
    if (!data || typeof data !== 'object') {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: '参数必需是非空对象',
      });
    }

    // eslint-disable-next-line no-prototype-builtins
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('_id')) {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: '不能更新_id的值',
      });
    }

    const { multiple } = this._apiOptions as UpdateOption;
    const multi = multiple === undefined ? true : multiple; // where update 不传multi默认为true

    const param: any = {
      collectionName: this._coll,
      // query: this._fieldFilters,
      // where的定义
      queryType: QueryType.WHERE,
      // query: QuerySerializer.encode(this._fieldFilters),
      multi,
      merge: true,
      upsert: false,
      data: UpdateSerializer.encodeEJSON(data, this._apiOptions.raw || false),
    };

    if (this._fieldFilters) {
      param.query = this._fieldFilters;
    }
    const res = await this._request.send('database.updateDocument', param, getReqOpts(this._apiOptions));

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    return {
      requestId: res.requestId,
      updated: res.data.updated,
      upsertId: res.data.upsert_id,
    };
    // }
  }

  /**
   * 指定要返回的字段
   * project 示例
   * 存在doc {a:1, b:2, c: [1,2,3,4], d: [{item: 1}, [item: 2]]}
   * 1. 指定返回doc中字段a,b,  projection设置为{a: true, b:true}
   * 2. 指定返回doc中数组字段c的 前1个元素  projection设置为{c: db.command.project.slice(1)}
   * 3. 指定返回doc中数组字段c的 第2,3个元素  projection设置为{c: db.command.project.slice([1,2])}
   * 4. 指定返回doc中数组字段d中的 满足属性值item大于1的第一个元素 projections设置为{c: db.command.project.elemMatch({item: db.command.gt(1)})}
   *
   * @param projection 需要
   */
  field(projection: any): Query {
    const transformProjection = {};
    for (const k in projection) {
      // 区分bool类型，number类型 和 Object类型
      if (typeof projection[k] === 'boolean') {
        transformProjection[k] = projection[k] === true ? 1 : 0;
      }

      if (typeof projection[k] === 'number') {
        transformProjection[k] = projection[k] > 0 ? 1 : 0;
      }

      if (typeof projection[k] === 'object') {
        transformProjection[k] = projection[k];
      }
    }

    const newApiOption: QueryOption = { ...this._apiOptions };
    newApiOption.projection = transformProjection;

    return new Query(this._db, this._coll, this._fieldFilters, newApiOption, this._transactionId);
  }

  /**
   * 条件删除文档 需要
   */
  async remove(): Promise<Record<string, any>> {
    // if (Object.keys(this._queryOptions).length > 0) {
    //   console.warn('`offset`, `limit` and `projection` are not supported in remove() operation')
    // }
    // if (this._fieldOrders.length > 0) {
    //   console.warn('`orderBy` is not supported in remove() operation')
    // }

    const { offset, limit, projection, order } = this._apiOptions as QueryOption;
    if (offset !== undefined || limit !== undefined || projection !== undefined || order !== undefined) {
      console.warn('`offset`, `limit`, `projection`, `orderBy` are not supported in remove() operation');
    }

    const { multiple } = this._apiOptions as UpdateOption;
    const multi = multiple === undefined ? true : multiple; // where remove 不传multi默认为true

    const param = {
      collectionName: this._coll,
      query: this._fieldFilters,
      // 这里看下
      queryType: QueryType.WHERE,
      multi,
    };
    const res = await this._request.send('database.removeDocument', param, getReqOpts(this._apiOptions));

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    const list = res.data.list.map((item: any) => EJSON.parse(item));
    const documents = Util.formatResDocumentData(list);
    const result: any = {
      data: documents,
      requestId: res.requestId,
    };
    if (res.limit) {
      result.limit = res.limit;
    }

    if (res.offset) {
      result.offset = res.offset;
    }

    return result;
  }
}
