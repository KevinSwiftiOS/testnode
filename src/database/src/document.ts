import { EJSON } from 'bson';

import { baseDb } from './basedb';
import { QueryType } from './constant';
import { DataBaseError, ERRORS } from './Errors';
import { serialize } from './serializer/datatype';
import { UpdateSerializer } from './serializer/update';
import { GetRes, RemoveRes, UpdateRes } from './typings';
import { formatRequestServerDateParams, Util } from './util';
import { hasOwnProperty, stringifyByEJSON } from './util';
/**
 * 文档模块
 */
export class DocumentReference {
  /**
   * 文档ID
   */
  readonly id: string | number;
  /**
   *
   */
  readonly projection: any;

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
  private _request: any;

  /**
   * 初始化
   *
   * @internal
   *
   * @param db    - 数据库的引用
   * @param coll  - 集合名称
   * @param docID - 文档ID
   */
  constructor(db: baseDb, coll: string, docID: string | number) {
    this._db = db;
    this._coll = coll;
    this.id = docID;
    this._request = new baseDb.reqClass(this._db.config);
  }

  /**
   * 返回选中的文档（_id）
   */
  async get(): Promise<GetRes> {
    const query = stringifyByEJSON({ _id: this.id });
    const param: any = {
      collection_name: this._coll,
      query,
      query_type: QueryType.DOC,
      multi: false,
    };

    const data = await this._request.send('database.getDocument', param);
    const list = data?.list?.map((item: any) => EJSON.parse(item));
    const documents = Util.formatResDocumentData(list ?? []);
    return { data: documents, requestId: data?.request_id ?? '' };
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

  async set(opts: any): Promise<UpdateRes> {
    if (!this.id) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: 'docId不能为空',
      });
    }

    if (
      !opts.data ||
      Object.prototype.toString.call(opts.data).slice(8, -1) !== 'Object'
    ) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '参数必须为非空对象',
      });
    }

    if (hasOwnProperty(opts.data, '_id')) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '_id值不能更新',
      });
    }

    let param = {
      collection_name: this._coll,
      query_type: QueryType.DOC,
      update_data: stringifyByEJSON(serialize(opts.data)),
      multi: false,
      merge: false, // data不能带有操作符
      upsert: true,
    };

    if (this.id) {
      param = Object.assign(param, {
        query: stringifyByEJSON({ _id: this.id }),
      });
    }

    const res = await this._request.send(
      'database.updateDocument',
      formatRequestServerDateParams(param)
    );
    return {
      updated: res?.updated ?? 0,
      requestId: res?.request_id ?? '',
    };
  }

  /**
   * 更新数据
   *
   * @param data - 文档数据
   * @param opts - 可选项
   */
  async update(opts: any): Promise<UpdateRes> {
    if (
      !opts.data ||
      Object.prototype.toString.call(opts.data).slice(8, -1) !== 'Object'
    ) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '参数必须为非空对象',
      });
    }

    if (hasOwnProperty(opts.data, '_id')) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '_id值不能更新',
      });
    }

    const query = stringifyByEJSON({ _id: this.id });
    const param = {
      collection_name: this._coll,
      update_data: UpdateSerializer.encodeEJSON(opts.data),
      query,
      query_type: QueryType.DOC,
      multi: false,
      merge: true, // 把所有更新数据转为带操作符的
      upsert: false,
    };
    const res = await this._request.send(
      'database.updateDocument',
      formatRequestServerDateParams(param)
    );
    return {
      updated: res?.updated ?? 0,
      requestId: res?.request_id ?? '',
    };
  }

  /**
   * 删除文档
   */
  async remove(): Promise<RemoveRes> {
    const query = stringifyByEJSON({ _id: this.id });
    const param = {
      collection_name: this._coll,
      query,
      query_type: QueryType.DOC,
      multi: false,
    };
    const res = await this._request.send('database.removeDocument', param);
    return {
      deleted: res.deleted ?? 0,
      requestId: res.request_id ?? '',
    };
  }
}
