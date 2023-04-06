"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["DocIDError"] = "\u6587\u6863ID\u4E0D\u5408\u6CD5";
    ErrorCode["CollNameError"] = "\u96C6\u5408\u540D\u79F0\u4E0D\u5408\u6CD5";
    ErrorCode["OpStrError"] = "\u64CD\u4F5C\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["DirectionError"] = "\u6392\u5E8F\u5B57\u7B26\u4E0D\u5408\u6CD5";
    ErrorCode["IntergerError"] = "must be integer";
    ErrorCode["BooleanError"] = "must be boolean";
    ErrorCode["ArrayError"] = "must be array";
    ErrorCode["QueryParamTypeError"] = "\u67E5\u8BE2\u53C2\u6570\u5FC5\u987B\u4E3A\u5BF9\u8C61";
    ErrorCode["QueryParamValueError"] = "\u67E5\u8BE2\u53C2\u6570\u5BF9\u8C61\u503C\u4E0D\u80FD\u5747\u4E3Aundefined";
    ErrorCode["CentersPhereError"] = "centersPhere\u7ED3\u6784\u4E0D\u5408\u6CD5";
})(ErrorCode || (ErrorCode = {}));
exports.ErrorCode = ErrorCode;
const FieldType = {
    String: 'String',
    Number: 'Number',
    Object: 'Object',
    Array: 'Array',
    Boolean: 'Boolean',
    Null: 'Null',
    GeoPoint: 'GeoPoint',
    GeoLineString: 'GeoLineString',
    GeoPolygon: 'GeoPolygon',
    GeoMultiPoint: 'GeoMultiPoint',
    GeoMultiLineString: 'GeoMultiLineString',
    GeoMultiPolygon: 'GeoMultiPolygon',
    Date: 'Date',
    Command: 'Command',
    ServerDate: 'ServerDate',
    BsonDate: 'BsonDate'
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
    [Opeartor.gte]: '$gte'
};
exports.OperatorMap = OperatorMap;
const UpdateOperatorList = [
    '$set',
    '$inc',
    '$mul',
    '$unset',
    '$push',
    '$pop',
    '$unshift',
    '$shift',
    '$currentDate',
    '$each',
    '$position'
];
exports.UpdateOperatorList = UpdateOperatorList;
var QueryType;
(function (QueryType) {
    QueryType["WHERE"] = "WHERE";
    QueryType["DOC"] = "DOC";
})(QueryType || (QueryType = {}));
exports.QueryType = QueryType;
