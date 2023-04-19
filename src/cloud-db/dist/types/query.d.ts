import { baseDb } from './basedb';
import { OrderByDirection } from './constant';
import { CountRes, GetRes, RemoveRes, UpdateRes } from './typings';
interface BaseOption {
    timeout?: number;
}
export interface QueryOption extends BaseOption {
    limit?: number;
    offset?: number;
    projection?: any;
    order?: Record<string, any>[];
}
export interface UpdateOption extends BaseOption {
    multiple?: boolean;
}
export declare class Query {
    _apiOptions: QueryOption;
    constructor(db: baseDb, coll: string, fieldFilters?: string, apiOptions?: QueryOption);
    where(query: any): Query;
    orderBy(fieldPath: string, directionStr: OrderByDirection): Query;
    limit(limit: number): Query;
    skip(offset: number): Query;
    field(projection: any): Query;
    get(): Promise<GetRes>;
    count(): Promise<CountRes>;
    update(opts: any): Promise<UpdateRes>;
    remove(): Promise<RemoveRes>;
}
export {};
