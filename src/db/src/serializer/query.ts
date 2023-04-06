/* eslint-disable guard-for-in */
/* eslint-disable unicorn/consistent-destructuring */
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
import { SYMBOL_UNSET_FIELD_NAME } from '../helper/symbol';
import { operatorToString } from '../operator-map';
import { getType, isArray, isDate, isObject, isRegExp } from '../utils/type';
import { stringifyByEJSON } from '../utils/utils';
import {
  encodeInternalDataType,
  flattenQueryObject,
  isConversionRequired,
} from './common';

export type IQueryCondition = Record<string, any> | LogicCommand;

export const QuerySerializer = {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  encode(
    query: IQueryCondition | QueryCommand | LogicCommand
  ): IQueryCondition {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const encoder = new QueryEncoder();
    return encoder.encodeQuery(query);
  },

  encodeEJSON(
    query: IQueryCondition | QueryCommand | LogicCommand,
    raw: boolean
  ): string {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const encoder = new QueryEncoder();
    return stringifyByEJSON(raw ? query : encoder.encodeQuery(query));
  },
};

class QueryEncoder {
  encodeQuery(
    query: IQueryCondition | QueryCommand | LogicCommand,
    key?: any
  ): IQueryCondition {
    if (isConversionRequired(query)) {
      if (isLogicCommand(query)) {
        return this.encodeLogicCommand(query);
      }

      if (isQueryCommand(query)) {
        return this.encodeQueryCommand(query);
      }

      if (isRegExp(query)) {
        //  /xxx/ 形式
        return { [key]: this.encodeRegExp(query) };
      }

      if (isDate(query)) {
        return { [key]: query };
      }
      return { [key]: this.encodeQueryObject(query) };
    }

    if (isObject(query)) {
      return this.encodeQueryObject(query);
    }

    return query;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  encodeRegExp(query: RegExp) {
    return {
      $regularExpression: {
        pattern: query.source,
        options: query.flags,
      },
    };
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

      case LOGIC_COMMANDS_LITERAL.NOT: {
        const $op = operatorToString(query.operator);
        const operatorExpression: QueryCommand | RegExp = query.operands[0];

        if (isRegExp(operatorExpression)) {
          return {
            [query.fieldName as string]: {
              [$op]: this.encodeRegExp(operatorExpression),
            },
          };
        }

        const subqueries =
          this.encodeQuery(operatorExpression)[query.fieldName as string];
        return {
          [query.fieldName as string]: {
            [$op]: subqueries,
          },
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
    if (isComparisonCommand(query)) {
      return this.encodeComparisonCommand(query);
    }

    // TODO: when more command types are added, change it here
    return this.encodeComparisonCommand(query);
  }

  encodeComparisonCommand(query: QueryCommand): IQueryCondition {
    if (query.fieldName === SYMBOL_UNSET_FIELD_NAME) {
      throw new Error(
        'Cannot encode a comparison command with unset field name'
      );
    }

    const $op = operatorToString(query.operator);

    switch (query.operator) {
      case QUERY_COMMANDS_LITERAL.EQ:
      case QUERY_COMMANDS_LITERAL.NEQ:
      case QUERY_COMMANDS_LITERAL.LT:
      case QUERY_COMMANDS_LITERAL.LTE:
      case QUERY_COMMANDS_LITERAL.GT:
      case QUERY_COMMANDS_LITERAL.GTE:
      case QUERY_COMMANDS_LITERAL.ELEM_MATCH:
      case QUERY_COMMANDS_LITERAL.EXISTS:
      case QUERY_COMMANDS_LITERAL.SIZE:
      case QUERY_COMMANDS_LITERAL.MOD: {
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
    const flattened = flattenQueryObject(query);
    for (const key in flattened) {
      const val = flattened[key];
      if (isLogicCommand(val)) {
        flattened[key] = val._setFieldName(key);
        const condition = this.encodeLogicCommand(flattened[key]);
        this.mergeConditionAfterEncode(flattened, condition, key);
      } else if (isComparisonCommand(val)) {
        flattened[key] = val._setFieldName(key);
        const condition = this.encodeComparisonCommand(flattened[key]);
        this.mergeConditionAfterEncode(flattened, condition, key);
      } else if (isConversionRequired(val)) {
        flattened[key] = encodeInternalDataType(val);
      }
    }

    return flattened;
  }

  mergeConditionAfterEncode(
    query: Record<string, any>,
    condition: Record<string, any>,
    key: string
  ): void {
    if (!condition[key]) {
      delete query[key];
    }

    for (const conditionKey in condition) {
      if (query[conditionKey]) {
        if (isArray(query[conditionKey])) {
          // bug
          query[conditionKey] = [
            ...query[conditionKey],
            ...condition[conditionKey],
          ];
        } else if (isObject(query[conditionKey])) {
          if (isObject(condition[conditionKey])) {
            Object.assign(query, condition);
          } else {
            console.warn(
              `unmergable condition, query is object but condition is ${getType(
                condition
              )}, can only overwrite`,
              condition,
              key
            );
            query[conditionKey] = condition[conditionKey];
          }
        } else {
          console.warn(
            `to-merge query is of type ${getType(query)}, can only overwrite`,
            query,
            condition,
            key
          );
          query[conditionKey] = condition[conditionKey];
        }
      } else {
        query[conditionKey] = condition[conditionKey];
      }
    }
  }
}
