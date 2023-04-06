/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { EJSON } from 'bson';

import { baseDb } from './basedb';
import { UpdateCommand } from './commands/update';
import { ERRORS } from './const/code';
import { QueryType } from './constant';
import { QueryOption, UpdateOption } from './query';
import { serialize } from './serializer/datatype';
import { UpdateSerializer } from './serializer/update';
import { Util } from './util';
import { getReqOpts, processReturn, stringifyByEJSON } from './utils/utils';

/**
 * 文档模块
 *
 *
 */
export class DocumentReference {
  /**
   * 文档ID
   */
  readonly id: string | number;

  readonly _transactionId: string;

  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly projection: object;

  /**
   * 数据库引用
   *
   * @internal
   */
  private _db: baseDb;

  /**
   * 集合名称
   *
   * @internal
   */
  readonly _coll: string;

  /**
   * Request 实例
   *
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _request: any;

  private _apiOptions: QueryOption | UpdateOption;

  /**
   * 初始化
   *
   * @internal
   *
   * @param db    - 数据库的引用
   * @param coll  - 集合名称
   * @param docID - 文档ID
   */
  constructor(
    db: baseDb,
    coll: string,
    apiOptions: QueryOption | UpdateOption,
    docID: string | number,
    transactionId: string
  ) {
    this._db = db;
    this._coll = coll;
    this.id = docID;
    this._transactionId = transactionId;
    /* eslint-disable new-cap */
    this._request = new baseDb.reqClass(this._db.config);
    this._apiOptions = apiOptions;
  }

  /**
   * 创建或添加数据
   *
   * 如果文档ID不存在，则创建该文档并插入数据，根据返回数据的 upserted_id 判断
   * 添加数据的话，根据返回数据的 set 判断影响的行数
   *
   * @param data - 文档数据
   * @param opts - 可选项
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  async set(data: object): Promise<any> {
    if (!this.id) {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: 'docId不能为空',
      });
    }

    if (!data || typeof data !== 'object') {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: '参数必需是非空对象',
      });
    }

    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('_id')) {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: '不能更新_id的值',
      });
    }

    let hasOperator = false;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const checkMixed = (objs: any) => {
      if (typeof objs === 'object') {
        for (let key in objs) {
          if (objs[key] instanceof UpdateCommand) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            hasOperator = true;
          } else if (typeof objs[key] === 'object') {
            checkMixed(objs[key]);
          }
        }
      }
    };

    if (hasOperator) {
      // 不能包含操作符
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.DATABASE_REQUEST_FAILED,
        message: 'update operator complicit',
      });
    }

    checkMixed(data);

    let param = {
      collectionName: this._coll,
      queryType: QueryType.DOC,
      data: stringifyByEJSON(serialize(data)),
      transactionId: this._transactionId,
      multi: false,
      merge: false, // data不能带有操作符
      upsert: true,
    };

    if (this.id) {
      param = Object.assign(param, {
        query: stringifyByEJSON({ _id: this.id }),
      });
    }
    const res: any = await this._request.send(
      'database.modifyDocument',
      param,
      getReqOpts(this._apiOptions)
    );

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    // 兼容事务set 旧接口
    if (this._transactionId) {
      return {
        updated: res.data.updated,
        upserted: [{ _id: res.data.upsert_id }], // 成功插入的doc id
        requestId: res.requestId,
      };
    }

    return {
      updated: res.data.updated,
      upsertedId: res.data.upsert_id,
      requestId: res.requestId,
    };
    // }
  }

  /**
   * 更新数据
   *
   * @param data - 文档数据
   * @param opts - 可选项
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
    if (data.hasOwnProperty('_id')) {
      return processReturn(this._db.config.throwOnCode, {
        ...ERRORS.INVALID_PARAM,
        message: '不能更新_id的值',
      });
    }

    const query = stringifyByEJSON({ _id: this.id });
    const param = {
      collectionName: this._coll,
      transactionId: this._transactionId,
      data: UpdateSerializer.encodeEJSON(data, this._apiOptions.raw || false),
      query,
      queryType: QueryType.DOC,
      multi: false,
      merge: true, // 把所有更新数据转为带操作符的
      upsert: false,
    };
    const res = await this._request.send(
      'database.updateDocument',
      param,
      getReqOpts(this._apiOptions)
    );

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    return {
      // matched: res.data.matched,
      updated: res.data.updated,
      requestId: res.requestId,
    };
    // }
  }

  /**
   * 删除文档
   */
  async remove(): Promise<any> {
    const query = stringifyByEJSON({ _id: this.id });
    const param = {
      collectionName: this._coll,
      transactionId: this._transactionId,
      query,
      queryType: QueryType.DOC,
      multi: false,
    };
    const res = await this._request.send(
      'database.removeDocument',
      param,
      getReqOpts(this._apiOptions)
    );

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    return {
      deleted: res.data.deleted,
      requestId: res.requestId,
    };
    // }
  }

  /**
   * 返回选中的文档（_id）
   */
  async get(): Promise<any> {
    const query = stringifyByEJSON({ _id: this.id });
    const { projection } = this._apiOptions as QueryOption;
    const param: any = {
      collectionName: this._coll,
      query,
      transactionId: this._transactionId,
      queryType: QueryType.DOC,
      multi: false,
    };

    if (projection) {
      param.projection = stringifyByEJSON(projection);
    }
    const res = await this._request.send(
      'database.getDocument',
      param,
      getReqOpts(this._apiOptions)
    );

    if (res.code) {
      return res;
    }

    // if (res.code) {
    //   throw E({ ...res })
    // } else {
    const list = res.data.list.map((item) => EJSON.parse(item));
    const documents = Util.formatResDocumentData(list);

    // 兼容事务查询文档旧接口
    if (this._transactionId) {
      return {
        data: documents[0] || null,
        requestId: res.requestId,
      };
    }

    return {
      data: documents,
      requestId: res.requestId,
      offset: res.data.offset,
      limit: res.data.limit,
    };
    // }
  }
}
