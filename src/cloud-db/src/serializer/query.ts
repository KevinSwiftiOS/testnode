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
import { DataBaseError, ErrorMsg, ERRORS } from '../error';
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
    // console.log('isConversionRequired', isConversionRequired(query));
    if (isConversionRequired(query)) {
      if (isLogicCommand(query)) {
        const encodeRes = this.encodeLogicCommand(query);
        // console.log('encodeRes', encodeRes);
        return encodeRes;
      }

      if (isQueryCommand(query)) {
        return this.encodeQueryCommand(query);
      }
    }

    if (isObject(query)) {
      // 作为一个普通的对象传入{person: {name: 'ckq'}}
      return this.encodeQueryObject(query);
    }

    return query;
  }

  encodeLogicCommand(query: LogicCommand): IQueryCondition {
    // dbInstance.command.and([dbInstance.command.eq(3), 10])
    switch (query.operator) {
      case LOGIC_COMMANDS_LITERAL.NOR:
      case LOGIC_COMMANDS_LITERAL.AND:
      case LOGIC_COMMANDS_LITERAL.OR: {
        const $op = operatorToString(query.operator);
        // console.log('$op', $op);
        // 遍历的去遍历值
        const subqueries = query.operands.map((oprand: any) =>
          this.encodeQuery(oprand, query.fieldName)
        );
        //  subqueries [ { a: { '$eq': 3 } }, 10 ]
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
    // console.log('encodeComparisonCommand', query);
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
      case QUERY_COMMANDS_LITERAL.NIN: {
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
    // {a: {name: 'ckq', sex:{b: 4}}, age: 3} -> { a.name: 'ckq', a.sex.b : 4, age: 3 } // 对key 进行编码
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
      } else if (isConversionRequired(val)) {
        flattened[key] = encodeInternalDataType(val);
      }
    }

    // console.log('flattened', flattened);
    // 对于command 会转换为 {a.b: {$eq: 3}} 普通的会转换为 {a.b: 3}}
    return flattened;
  }

  // 编码值
  mergeConditionAfterEncode(
    query: Record<string, any>,
    condition: Record<string, any>,
    key: string
  ): void {
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
        if (isArray(query[conditionKey])) {
          console.log(1);
          query[conditionKey] = [
            ...query[conditionKey],
            ...condition[conditionKey],
          ];
        } else if (isObject(query[conditionKey])) {
          //    console.log(2);
          if (isObject(condition[conditionKey])) {
            //     console.log(3);
            Object.assign(query, condition);
            //    console.log('在这儿');
          } else {
            console.log(4);
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
