"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryType = exports.OrderDirectionList = exports.OperatorMap = exports.Opeartor = exports.WhereFilterOpList = exports.FieldType = void 0;
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
const OrderDirectionList = ['desc', 'asc'];
exports.OrderDirectionList = OrderDirectionList;
const WhereFilterOpList = ['<', '<=', '==', '>=', '>'];
exports.WhereFilterOpList = WhereFilterOpList;
var Opeartor;
(function (Opeartor) {
    Opeartor["lt"] = "<";
    Opeartor["gt"] = ">";
    Opeartor["lte"] = "<=";
    Opeartor["gte"] = ">=";
    Opeartor["eq"] = "==";
})(Opeartor || (Opeartor = {}));
exports.Opeartor = Opeartor;
const OperatorMap = {
    [Opeartor.eq]: '$eq',
    [Opeartor.lt]: '$lt',
    [Opeartor.lte]: '$lte',
    [Opeartor.gt]: '$gt',
    [Opeartor.gte]: '$gte',
};
exports.OperatorMap = OperatorMap;
var QueryType;
(function (QueryType) {
    QueryType["WHERE"] = "WHERE";
    QueryType["DOC"] = "DOC";
})(QueryType || (QueryType = {}));
exports.QueryType = QueryType;
