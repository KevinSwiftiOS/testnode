import { GetRes, RemoveRes, UpdateRes } from './typings';
/**
 * 文档模块
 */
export declare class DocumentReference {
    /**
     * 文档ID
     */
    readonly id: string;
    /**
     *
     */
    readonly projection: any;
    /**
     * 返回选中的文档（_id）
     */
    get(): Promise<GetRes>;
    /**
     * 创建或添加数据
     * 添加数据的话，根据返回数据的 set 判断影响的行数
     *
     * @param opts - 可选项
     */
    set(opts: Record<string, any>): Promise<UpdateRes>;
    /**
     * 更新数据
     * @param opts - 可选项
     */
    update(opts: Record<string, any>): Promise<UpdateRes>;
    /**
     * 删除文档
     */
    remove(): Promise<RemoveRes>;
}