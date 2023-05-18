import { baseDb } from './basedb';
import { OrderDirection } from './constant';
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
/**
 * 查询模块
 */
export declare class Query {
    /**
     * 统一条件项
     *
     * @private
     * @type {(QueryOption)}
     * @memberof Query
     */
    _apiOptions: QueryOption;
    constructor(db: baseDb, coll: string, fieldFilters?: string, apiOptions?: QueryOption);
    /**
     * 查询条件
     *
     * @param query 需要
     * @returns Query
     */
    where(query: Record<string, any>): Query;
    /**
     * 设置排序方式
     *
     * @param fieldPath     - 字段路径
     * @param directionStr  - 排序方式 需要
     */
    orderBy(fieldPath: string, directionStr: OrderDirection): Query;
    /**
     * 设置查询条数
     *
     * @param limit - 限制条数
     */
    limit(limit: number): Query;
    /**
     * 设置偏移量
     *
     * @param offset - 偏移量
     */
    skip(offset: number): Query;
    /**
     * 指定要返回的字段
     * project 示例
     * 1. 指定返回doc中字段a,b,  projection设置为{a: true, b:true}
     *
     * @param projection
     */
    field(projection: Record<string, any>): Query;
    get(): Promise<GetRes>;
    /**
     * 获取总数
     */
    count(): Promise<CountRes>;
    update(opts: Record<string, any>): Promise<UpdateRes>;
    /**
     * 条件删除文档
     */
    remove(): Promise<RemoveRes>;
}
export {};
