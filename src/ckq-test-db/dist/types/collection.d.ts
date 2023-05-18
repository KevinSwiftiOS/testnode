import { DocumentReference } from './document';
import { Query } from './query';
import { AddRes } from './typings/';
export declare class CollectionReference extends Query {
    /**
     * 读取集合名字
     */
    getName(): string;
    /**
     * 获取文档的引用
     *
     * @param docID - 文档ID
     */
    doc(docID: string): DocumentReference;
    /**
     * 添加一篇文档
     *
     * @param opts  - 数据
     *
     */
    add(opts: Record<string, any>): Promise<AddRes>;
}
