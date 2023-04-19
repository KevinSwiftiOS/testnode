import { baseDb } from './basedb';
import { CollectionReference } from './collection';
import { DataBaseError, ErrorMsg, ERRORS } from './Errors';
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
        errMsg: ErrorMsg.collection.COLLECTION_PARAM_ERROR,
      });
    }

    return new CollectionReference(this, collName);
  }
}
