import { OrderByDirection } from './constant';
import { IWatchOptions, DBRealtimeListener } from './typings/index';
interface GetRes {
    data: any[];
    requestId: string;
    total: number;
    limit: number;
    offset: number;
}
interface BaseOption {
    timeout?: number;
    raw?: boolean;
}
export interface QueryOption extends BaseOption {
    limit?: number;
    offset?: number;
    projection?: Object;
    order?: Record<string, any>[];
}
export interface UpdateOption extends BaseOption {
    multiple?: boolean;
}
export declare class Query {
    protected _transactionId: string;
    get(): Promise<GetRes>;
    count(): Promise<any>;
    where(query: object): Query;
    options(apiOptions: QueryOption | UpdateOption): Query;
    orderBy(fieldPath: string, directionStr: OrderByDirection): Query;
    limit(limit: number): Query;
    skip(offset: number): Query;
    update(data: Object): Promise<any>;
    field(projection: any): Query;
    remove(): Promise<any>;
    updateAndReturn(data: Object): Promise<any>;
    watch: (options: IWatchOptions) => DBRealtimeListener;
}
export {};