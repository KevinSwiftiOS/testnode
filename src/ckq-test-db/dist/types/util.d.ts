/**
 * 工具模块
 *
 *
 */
export declare const Util: {
    /**
     * 格式化后端返回的文档数据
     *
     * @param document - 后端文档数据
     */
    formatResDocumentData: (documents: any[]) => {}[];
    /**
     * 格式化字段
     *
     * 主要是递归数组和对象，把日期时间转换为js对象。
     *
     * @param document
     * @internal
     */
    formatField: (document: any) => {};
    /**
     * 查看数据类型
     *
     * @param obj
     */
    whichType: (obj: any) => string;
};
export declare const filterUndefined: (o: any) => any;
export declare const stringifyByEJSON: (params: any) => string;
export declare function hasOwnProperty(obj: any, key: string): boolean;
export declare function formatRequestServerDateParams(params: any): any;
export declare const getType: (x: any) => string;
export declare const isObject: <T extends Record<string, unknown>>(x: any) => x is T;
export declare const isString: (x: any) => x is string;
export declare const isArray: <T extends any[] = any[]>(x: any) => x is T;
export declare const isDate: (x: any) => x is Date;
export declare const isRegExp: (x: any) => x is RegExp;
export declare const isInternalObject: (x: any) => boolean;
export declare const flattenProjectionObj: (query: any) => Record<string, any>;
export declare const OperateMap: {
    [key: string]: string;
};
export declare function transformOperate(operator: string): string;
