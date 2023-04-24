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
  Date: 'Date', // 日期类型
  Command: 'Command',
  ServerDate: 'ServerDate',
  BsonDate: 'BsonDate',
};

/**
 * 排序方向
 */
type OrderByDirection = 'desc' | 'asc';

/**
 * 排序方向列表
 */
const OrderDirectionList = ['desc', 'asc'];

/**
 * 查询条件操作符
 */
type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>';

/**
 * 操作符列表
 */
const WhereFilterOpList = ['<', '<=', '==', '>=', '>'];

/**
 * 操作符别名
 */

enum Opeartor {
  lt = '<',
  gt = '>',
  lte = '<=',
  gte = '>=',
  eq = '==',
}

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

/**
 * queryType
 */

enum QueryType {
  WHERE = 'WHERE',
  DOC = 'DOC',
}

export {
  FieldType,
  WhereFilterOp,
  WhereFilterOpList,
  Opeartor,
  OperatorMap,
  OrderByDirection,
  OrderDirectionList,
  QueryType,
};
