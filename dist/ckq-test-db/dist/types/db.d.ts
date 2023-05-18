import { baseDb } from './basedb';
import { CollectionReference } from './collection';
export declare class Db extends baseDb {
    /**
     * 获取集合的引用
     *
     * @param collName - 集合名称
     */
    collection(collName: string): CollectionReference;
}
