declare const FieldType: {
    String: string;
    Number: string;
    Object: string;
    Array: string;
    Boolean: string;
    Null: string;
    Date: string;
    Command: string;
    ServerDate: string;
    BsonDate: string;
};
type OrderByDirection = 'desc' | 'asc';
declare const OrderDirectionList: string[];
type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>';
declare const WhereFilterOpList: string[];
declare enum Opeartor {
    lt = "<",
    gt = ">",
    lte = "<=",
    gte = ">=",
    eq = "=="
}
declare const OperatorMap: {
    "==": string;
    "<": string;
    "<=": string;
    ">": string;
    ">=": string;
};
declare enum QueryType {
    WHERE = "WHERE",
    DOC = "DOC"
}
export { FieldType, WhereFilterOp, WhereFilterOpList, Opeartor, OperatorMap, OrderByDirection, OrderDirectionList, QueryType, };
