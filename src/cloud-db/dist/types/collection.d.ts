import { DocumentReference } from './document';
import { Query } from './query';
import { AddRes } from './typings/';
export declare class CollectionReference extends Query {
    doc(docID: string | number): DocumentReference;
    add(opts: any): Promise<AddRes>;
}
