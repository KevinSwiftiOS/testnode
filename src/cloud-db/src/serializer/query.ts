import {
  isLogicCommand,
  LOGIC_COMMANDS_LITERAL,
  LogicCommand,
} from '../commands/logic';
import {
  isComparisonCommand,
  isQueryCommand,
  QUERY_COMMANDS_LITERAL,
  QueryCommand,
} from '../commands/query';
import { DataBaseError, ErrorMsg, ERRORS } from '../Errors';
import { operatorToString } from '../operator-map';
import { SYMBOL_UNSET_FIELD_NAME } from '../Symbols';
import { isArray, isObject } from '../typings';
import { stringifyByEJSON } from '../util';
import {
  encodeInternalDataType,
  flattenQueryObject,
  isConversionRequired,
} from './common';

export type IQueryCondition = Record<string, any> | LogicCommand;

export const QuerySerializer = {
  encodeEJSON(query: IQueryCondition | QueryCommand | LogicCommand): string {
    const encoder = new QueryEncoder();
    // 编码查询条件
    return stringifyByEJSON(encoder.encodeQuery(query));
  },
};

export class QueryEncoder {
  encodeQuery(
    query: IQueryCondition | QueryCommand | LogicCommand,
    _?: any
  ): IQueryCondition {
    if (isConversionRequired(query)) {
      if (isLogicCommand(query)) {
        return this.encodeLogicCommand(query);
      }

      if (isQueryCommand(query)) {
        return this.encodeQueryCommand(query);
      }
    }

    if (isObject(query)) {
      return this.encodeQueryObject(query);
    }

    return query;
  }

  encodeLogicCommand(query: LogicCommand): IQueryCondition {
    switch (query.operator) {
      case LOGIC_COMMANDS_LITERAL.NOR:
      case LOGIC_COMMANDS_LITERAL.AND:
      case LOGIC_COMMANDS_LITERAL.OR: {
        const $op = operatorToString(query.operator);
        const subqueries = query.operands.map((oprand: any) =>
          this.encodeQuery(oprand, query.fieldName)
        );
        return {
          [$op]: subqueries,
        };
      }

      default: {
        const $op = operatorToString(query.operator);
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

  encodeQueryCommand(query: QueryCommand): IQueryCondition {
    return this.encodeComparisonCommand(query);
  }

  encodeComparisonCommand(query: QueryCommand): IQueryCondition {
    if (query.fieldName === SYMBOL_UNSET_FIELD_NAME) {
      // 兜底情况，当key值为设置时不能进行编码
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.common.UNSET_FIELD_ERROR,
      });
    }

    const $op = operatorToString(query.operator);

    switch (query.operator) {
      case QUERY_COMMANDS_LITERAL.EQ:
      case QUERY_COMMANDS_LITERAL.NEQ:
      case QUERY_COMMANDS_LITERAL.LT:
      case QUERY_COMMANDS_LITERAL.LTE:
      case QUERY_COMMANDS_LITERAL.GT:
      case QUERY_COMMANDS_LITERAL.GTE: {
        return {
          [query.fieldName as string]: {
            [$op]: encodeInternalDataType(query.operands[0]),
          },
        };
      }

      case QUERY_COMMANDS_LITERAL.IN:
      case QUERY_COMMANDS_LITERAL.NIN:
      case QUERY_COMMANDS_LITERAL.ALL: {
        return {
          [query.fieldName as string]: {
            [$op]: encodeInternalDataType(query.operands),
          },
        };
      }

      default: {
        return {
          [query.fieldName as string]: {
            [$op]: encodeInternalDataType(query.operands[0]),
          },
        };
      }
    }
  }

  encodeQueryObject(query: IQueryCondition): IQueryCondition {
    // {a: {b: 2}, c: 3} -> { a.b: 2, c: 3 } // 对key 进行编码
    const flattened = flattenQueryObject(query);
    for (const key of Object.keys(flattened)) {
      // 对值进行编码
      const val = flattened[key];
      if (isLogicCommand(val)) {
        flattened[key] = val._setFieldName(key);
        const condition = this.encodeLogicCommand(flattened[key]);
        this.mergeConditionAfterEncode(flattened, condition, key);
        // queryCommand
      } else if (isComparisonCommand(val)) {
        // 设置key 值
        flattened[key] = val._setFieldName(key);
        const condition = this.encodeComparisonCommand(flattened[key]);
        this.mergeConditionAfterEncode(flattened, condition, key);
      } else if (isConversionRequired(val)) {
        flattened[key] = encodeInternalDataType(val);
      }
    }

    // 对于command 会转换为 {a.b: {$eq: 3}} 普通的会转换为 {a.b: 3}}
    return flattened;
  }

  // 编码值
  mergeConditionAfterEncode(
    query: Record<string, any>,
    condition: Record<string, any>,
    key: string
  ): void {
    if (!condition[key]) {
      delete query[key];
    }
    // 这里的测试用例再想下

    for (const conditionKey in condition) {
      if (query[conditionKey]) {
        if (isArray(query[conditionKey])) {
          query[conditionKey] = [
            ...query[conditionKey],
            ...condition[conditionKey],
          ];
        } else if (isObject(query[conditionKey])) {
          if (isObject(condition[conditionKey])) {
            Object.assign(query, condition);
          } else {
            query[conditionKey] = condition[conditionKey];
          }
        } else {
          query[conditionKey] = condition[conditionKey];
        }
      } else {
        query[conditionKey] = condition[conditionKey];
      }
    }
  }
}
