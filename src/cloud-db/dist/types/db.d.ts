import { baseDb } from './basedb';
import { CollectionReference } from './collection';
export declare class db extends baseDb {
    collection(collName: string): CollectionReference;
}
