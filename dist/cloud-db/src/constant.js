"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryType = exports.OrderDirectionList = exports.OperatorMap = exports.Opeartor = exports.WhereFilterOpList = exports.FieldType = void 0;
/**
 * 字段类型
 */
const FieldType = {
    String: 'String',
    Number: 'Number',
    Object: 'Object',
    Array: 'Array',
    Boolean: 'Boolean',
    Null: 'Null',
    Date: 'Date',
    Command: 'Command',
    ServerDate: 'ServerDate',
    BsonDate: 'BsonDate',
};
exports.FieldType = FieldType;
/**
 * 排序方向列表
 */
const OrderDirectionList = ['desc', 'asc'];
exports.OrderDirectionList = OrderDirectionList;
/**
 * 操作符列表
 */
const WhereFilterOpList = ['<', '<=', '==', '>=', '>'];
exports.WhereFilterOpList = WhereFilterOpList;
/**
 * 操作符别名
 */
var Opeartor;
(function (Opeartor) {
    Opeartor["lt"] = "<";
    Opeartor["gt"] = ">";
    Opeartor["lte"] = "<=";
    Opeartor["gte"] = ">=";
    Opeartor["eq"] = "==";
})(Opeartor || (Opeartor = {}));
exports.Opeartor = Opeartor;
/**
 * 操作符映射
 * SDK => MongoDB
 */
const OperatorMap = {
    [Opeartor.eq]: '$eq',
    [Opeartor.lt]: '$lt',
    [Opeartor.lte]: '$lte',
    [Opeartor.gt]: '$gt',
    [Opeartor.gte]: '$gte',
};
exports.OperatorMap = OperatorMap;
/**
 * queryType
 */
var QueryType;
(function (QueryType) {
    QueryType["WHERE"] = "WHERE";
    QueryType["DOC"] = "DOC";
})(QueryType || (QueryType = {}));
exports.QueryType = QueryType;
//# sourceMappingURL=constant.js.map