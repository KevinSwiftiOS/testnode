/**
 *  This file may have been modified by ByteDance Ltd.
 */
declare const FieldType: {
    Null: string;
    Number: string;
    String: string;
    Boolean: string;
    Date: string;
    Array: string;
    Object: string;
    Command: string;
    ServerDate: string;
};
/**
 * 排序方向
 */
declare type OrderDirection = 'desc' | 'asc';
/**
 * 排序方向列表
 */
declare const OrderDirections: string[];
/**
 * 操作符别名
 */
declare enum Handles {
    lt = "<",
    gt = ">",
    lte = "<=",
    gte = ">=",
    eq = "=="
}
/**
 * 操作符映射
 * SDK => MongoDB
 */
declare const HandleMap: {
    "<": string;
    "<=": string;
    "==": string;
    ">": string;
    ">=": string;
};
/**
 * queryType
 */
declare enum QueryType {
    DOC = "DOC",
    WHERE = "WHERE"
}
declare const databaseAPIActions: string[];
declare enum DatabaseAPIAction {
    'database.getDocument' = "database.getDocument",
    'database.calculateDocument' = "database.calculateDocument",
    'database.updateDocument' = "database.updateDocument",
    'database.removeDocument' = "database.removeDocument",
    'database.addDocument' = "database.addDocument"
}
declare const databaseMethods: string[];
declare enum DatabaseMethod {
    'collection' = "collection",
    'collection.get' = "collection.get",
    'collection.count' = "collection.count",
    'collection.update' = "collection.update",
    'collection.remove' = "collection.remove",
    'collection.add' = "collection.add",
    'collection.where' = "collection.where",
    'collection.order-by' = "collection.order-by",
    'collection.limit' = "collection.limit",
    'collection.skip' = "collection.skip",
    'collection.field' = "collection.field",
    'collection.doc' = "collection.doc",
    'doc.get' = "doc.get",
    'doc.set' = "doc.set",
    'doc.update' = "doc.update",
    'doc.remove' = "doc.remove",
    'serverDate' = "serverDate"
}
export { FieldType, Handles, OrderDirection, OrderDirections, QueryType, HandleMap, databaseAPIActions, DatabaseAPIAction, databaseMethods, DatabaseMethod, };
