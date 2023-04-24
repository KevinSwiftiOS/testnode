"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEncoder = exports.QuerySerializer = void 0;
const logic_1 = require("../commands/logic");
const query_1 = require("../commands/query");
const error_1 = require("../error");
const operator_map_1 = require("../operator-map");
const Symbols_1 = require("../Symbols");
const typings_1 = require("../typings");
const util_1 = require("../util");
const common_1 = require("./common");
exports.QuerySerializer = {
    encodeEJSON(query) {
        const encoder = new QueryEncoder();
        // 编码查询条件
        return (0, util_1.stringifyByEJSON)(encoder.encodeQuery(query));
    },
};
class QueryEncoder {
    encodeQuery(query, _) {
        // console.log('isConversionRequired', isConversionRequired(query));
        if ((0, common_1.isConversionRequired)(query)) {
            if ((0, logic_1.isLogicCommand)(query)) {
                const encodeRes = this.encodeLogicCommand(query);
                // console.log('encodeRes', encodeRes);
                return encodeRes;
            }
            if ((0, query_1.isQueryCommand)(query)) {
                return this.encodeQueryCommand(query);
            }
        }
        if ((0, typings_1.isObject)(query)) {
            // 作为一个普通的对象传入{person: {name: 'ckq'}}
            return this.encodeQueryObject(query);
        }
        return query;
    }
    encodeLogicCommand(query) {
        // dbInstance.command.and([dbInstance.command.eq(3), 10])
        switch (query.operator) {
            case logic_1.LOGIC_COMMANDS_LITERAL.NOR:
            case logic_1.LOGIC_COMMANDS_LITERAL.AND:
            case logic_1.LOGIC_COMMANDS_LITERAL.OR: {
                const $op = (0, operator_map_1.operatorToString)(query.operator);
                // console.log('$op', $op);
                // 遍历的去遍历值
                const subqueries = query.operands.map((oprand) => this.encodeQuery(oprand, query.fieldName));
                //  subqueries [ { a: { '$eq': 3 } }, 10 ]
                return {
                    [$op]: subqueries,
                };
            }
            default: {
                const $op = (0, operator_map_1.operatorToString)(query.operator);
                if (query.operands.length === 1) {
                    const subquery = this.encodeQuery(query.operands[0]);
                    return {
                        [$op]: subquery,
                    };
                }
                const subqueries = query.operands.map(this.encodeQuery.bind(this));
                return {
                    [$op]: subqueries,
                };
            }
        }
    }
    encodeQueryCommand(query) {
        return this.encodeComparisonCommand(query);
    }
    encodeComparisonCommand(query) {
        // console.log('encodeComparisonCommand', query);
        if (query.fieldName === Symbols_1.SYMBOL_UNSET_FIELD_NAME) {
            // 兜底情况，当key值为设置时不能进行编码
            throw new error_1.DataBaseError(Object.assign(Object.assign({}, error_1.ERRORS.INVALID_PARAM), { errMsg: error_1.ErrorMsg.common.UNSET_FIELD_ERROR }));
        }
        const $op = (0, operator_map_1.operatorToString)(query.operator);
        switch (query.operator) {
            case query_1.QUERY_COMMANDS_LITERAL.EQ:
            case query_1.QUERY_COMMANDS_LITERAL.NEQ:
            case query_1.QUERY_COMMANDS_LITERAL.LT:
            case query_1.QUERY_COMMANDS_LITERAL.LTE:
            case query_1.QUERY_COMMANDS_LITERAL.GT:
            case query_1.QUERY_COMMANDS_LITERAL.GTE: {
                return {
                    [query.fieldName]: {
                        [$op]: (0, common_1.encodeInternalDataType)(query.operands[0]),
                    },
                };
            }
            case query_1.QUERY_COMMANDS_LITERAL.IN:
            case query_1.QUERY_COMMANDS_LITERAL.NIN: {
                return {
                    [query.fieldName]: {
                        [$op]: (0, common_1.encodeInternalDataType)(query.operands),
                    },
                };
            }
            default: {
                return {
                    [query.fieldName]: {
                        [$op]: (0, common_1.encodeInternalDataType)(query.operands[0]),
                    },
                };
            }
        }
    }
    encodeQueryObject(query) {
        // {a: {name: 'ckq', sex:{b: 4}}, age: 3} -> { a.name: 'ckq', a.sex.b : 4, age: 3 } // 对key 进行编码
        const flattened = (0, common_1.flattenQueryObject)(query);
        for (const key of Object.keys(flattened)) {
            // 对值进行编码
            const val = flattened[key];
            if ((0, logic_1.isLogicCommand)(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeLogicCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
                // queryCommand
            }
            else if ((0, query_1.isComparisonCommand)(val)) {
                // command.eq(13);
                /*
               val QueryCommand {
               operator: 'eq',
               operands: [ 3 ],
               fieldName: InternalSymbol {}
            }
                */
                // 设置key 值
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeComparisonCommand(flattened[key]);
                // condition { 'a.sex.b': { '$eq': 3 } }
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if ((0, common_1.isConversionRequired)(val)) {
                flattened[key] = (0, common_1.encodeInternalDataType)(val);
            }
        }
        // console.log('flattened', flattened);
        // 对于command 会转换为 {a.b: {$eq: 3}} 普通的会转换为 {a.b: 3}}
        return flattened;
    }
    // 编码值
    mergeConditionAfterEncode(query, condition, key) {
        /* 'a.sex.b':  val QueryCommand {
      operator: 'eq',
      operands: [ 3 ],
      fieldName: I
      */
        // condition 'a.sex.b': { '$eq': 3 }
        // a.sex.b
        //  console.log('query', query);
        // console.log('condition', condition);
        if (!condition[key]) {
            delete query[key];
        }
        // eslint-disable-next-line guard-for-in
        for (const conditionKey in condition) {
            // console.log('123', isObject(query[conditionKey]));
            //   console.log('1234', isObject(condition[conditionKey]));
            if (query[conditionKey]) {
                if ((0, typings_1.isArray)(query[conditionKey])) {
                    console.log(1);
                    query[conditionKey] = [
                        ...query[conditionKey],
                        ...condition[conditionKey],
                    ];
                }
                else if ((0, typings_1.isObject)(query[conditionKey])) {
                    //    console.log(2);
                    if ((0, typings_1.isObject)(condition[conditionKey])) {
                        //     console.log(3);
                        Object.assign(query, condition);
                        //    console.log('在这儿');
                    }
                    else {
                        console.log(4);
                        query[conditionKey] = condition[conditionKey];
                    }
                }
                else {
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                query[conditionKey] = condition[conditionKey];
            }
        }
    }
}
exports.QueryEncoder = QueryEncoder;
//# sourceMappingURL=query.js.map