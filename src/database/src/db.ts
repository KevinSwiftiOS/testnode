import { baseDb } from './basedb';
import { CollectionReference } from './collection';
import { DataBaseError, ERRORS } from './Errors';
export class db extends baseDb {
  // static newDbReqClass: any;

  /**
   * 获取集合的引用
   *
   * @param collName - 集合名称
   */
  collection(collName: string): CollectionReference {
    if (!collName) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: '集合名必填',
      });
    }

    return new CollectionReference(this, collName);
  }
}
