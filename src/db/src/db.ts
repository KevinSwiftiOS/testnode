import { baseDb } from './basedb';
import { CollectionReference } from './collection';
export class db extends baseDb {
  // static newDbReqClass: any;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, no-useless-constructor
  constructor(config?: any) {
    super(config);
  }

  /**
   * 获取集合的引用
   *
   * @param collName - 集合名称
   */
  collection(collName: string): CollectionReference {
    if (!collName) {
      throw new Error('Collection name is required');
    }

    // Db.reqClass = newDb.newDbReqClass;
    return new CollectionReference(this, collName);
  }

  /**
   * 创建集合
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createCollection(collName: string) {
    const request = new baseDb.reqClass(this.config);
    const params = {
      collectionName: collName,
    };

    return request.send('database.addCollection', params);
  }
}
