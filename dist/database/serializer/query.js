"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEncoder = exports.QuerySerializer = void 0;
const logic_1 = require("../commands/logic");
const query_1 = require("../commands/query");
const Errors_1 = require("../Errors");
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
        if ((0, common_1.isConversionRequired)(query)) {
            if ((0, logic_1.isLogicCommand)(query)) {
                return this.encodeLogicCommand(query);
            }
            if ((0, query_1.isQueryCommand)(query)) {
                return this.encodeQueryCommand(query);
            }
        }
        if ((0, typings_1.isObject)(query)) {
            return this.encodeQueryObject(query);
        }
        return query;
    }
    encodeLogicCommand(query) {
        switch (query.operator) {
            case logic_1.LOGIC_COMMANDS_LITERAL.NOR:
            case logic_1.LOGIC_COMMANDS_LITERAL.AND:
            case logic_1.LOGIC_COMMANDS_LITERAL.OR: {
                const $op = (0, operator_map_1.operatorToString)(query.operator);
                const subqueries = query.operands.map((oprand) => this.encodeQuery(oprand, query.fieldName));
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
        if (query.fieldName === Symbols_1.SYMBOL_UNSET_FIELD_NAME) {
            // 兜底情况，当key值为设置时不能进行编码
            throw new Errors_1.DataBaseError(Object.assign(Object.assign({}, Errors_1.ERRORS.INVALID_PARAM), { errMsg: '不能对未设置字段名的比较命令进行编码' }));
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
            case query_1.QUERY_COMMANDS_LITERAL.NIN:
            case query_1.QUERY_COMMANDS_LITERAL.ALL: {
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
        // {a: {b: 2}, c: 3} -> { a.b: 2, c: 3 } // 对key 进行编码
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
                // 设置key 值
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeComparisonCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if ((0, common_1.isConversionRequired)(val)) {
                flattened[key] = (0, common_1.encodeInternalDataType)(val);
            }
        }
        return flattened;
    }
    // 编码值
    mergeConditionAfterEncode(query, condition, key) {
        if (!condition[key]) {
            delete query[key];
        }
        // 这里的测试用例再想下
        for (const conditionKey in condition) {
            if (query[conditionKey]) {
                if ((0, typings_1.isArray)(query[conditionKey])) {
                    query[conditionKey] = [
                        ...query[conditionKey],
                        ...condition[conditionKey],
                    ];
                }
                else if ((0, typings_1.isObject)(query[conditionKey])) {
                    if ((0, typings_1.isObject)(condition[conditionKey])) {
                        Object.assign(query, condition);
                    }
                    else {
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