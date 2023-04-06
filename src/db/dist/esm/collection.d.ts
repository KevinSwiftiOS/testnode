import { DocumentReference } from './document';
import { Query, QueryOption, UpdateOption } from './query';
import Aggregation from './aggregate';
export declare class CollectionReference extends Query {
    protected _transactionId: string;
    readonly name: string;
    doc(docID: string | number): DocumentReference;
    add(data: any): Promise<{
        ids?: string[];
        id?: string;
        inserted?: number;
        ok?: number;
        requestId: string;
    }>;
    aggregate(rawPipeline?: object[]): Aggregation;
    options(apiOptions: QueryOption | UpdateOption): CollectionReference;
}