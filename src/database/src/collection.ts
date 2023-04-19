import { baseDb } from './basedb';
import { DocumentReference } from './document';
import { DataBaseError, ERRORS } from './Errors';
import { Query, QueryOption, UpdateOption } from './query';
import { serialize } from './serializer/datatype';
import { ServerDate } from './serverDate';
import { AddRes, isArray } from './typings/';
import { formatRequestServerDateParams, stringifyByEJSON } from './util';
export class CollectionReference extends Query {
  /**
   * 初始化
   *
   * @internal
   *
   * @param db    - 数据库的引用
   * @param coll  - 集合名称
   */
  constructor(
    db: baseDb,
    coll: string,
    apiOptions?: QueryOption | UpdateOption
  ) {
    super(db, coll, '', apiOptions);
    ServerDate.resetHasServerDate();
  }

  /**
   * 读取集合名字
   */

  /**
   * 获取文档的引用
   *
   * @param docID - 文档ID
   */
  doc(docID: string | number): DocumentReference {
    if (typeof docID !== 'string' && typeof docID !== 'number') {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: 'docId必须为字符串或数字',
      });
    }

    return new DocumentReference(this._db, this._coll, docID);
  }

  /**
   * 添加一篇文档
   *
   * @param opts  - 数据
   *
   */
  async add(opts: any): Promise<AddRes> {
    // 判断data是否为数组, 兼容处理
    let transformData = opts.data;
    if (Object.prototype.toString.call(opts.data).slice(8, -1) !== 'Object') {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '参数必须是非空对象',
      });
    }

    // 本期只支持单个添加，后续要看在服务端sdk 侧是否要区分开来
    transformData = [opts.data];

    transformData = transformData.map((item: any) =>
      stringifyByEJSON(serialize(item))
    );
    const params: any = {
      collection_name: this._coll,
      insert_data: transformData,
    };

    const data = await this._request.send(
      'database.addDocument',
      formatRequestServerDateParams(params)
    );
    console.log("sdk 里的 inserted_ids", data.inserted_ids);
    if (!isArray(opts.data) && data?.inserted_ids?.length > 0) {
      // 兼容原事务 插入文档接口
      return {
        id: data.inserted_ids[0],
        requestId: data.request_id ?? '',
      };
    }

    return {
      id: data?.inserted_ids,
      requestId: data?.request_id ?? '',
    };
  }
}
