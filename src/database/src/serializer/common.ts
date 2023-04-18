import { LogicCommand } from '../commands/logic';
import { DataBaseError, ERRORS } from '../Errors';
import {
  isArray,
  isDate,
  isInternalObject,
  isObject,
  isRegExp,
} from '../typings';
import { serialize as serializeInternalDataType } from './datatype';

export type IQueryCondition = Record<string, any> | LogicCommand;

export type AnyObject = {
  [x: string]: any;
};

export function flattenQueryObject(
  query: Record<string, any>
): Record<string, any> {
  return flatten(query, isConversionRequired, [], [query]);
}

function flatten(
  query: Record<string, any>,
  shouldPreserverObject: (object: AnyObject) => boolean,
  parents: string[],
  visited: AnyObject[]
): Record<string, any> {
  const cloned = { ...query };
  for (const key in query) {
    if (/^\$/.test(key)) {
      continue;
    }

    const value = query[key];
    if (value === undefined) {
      delete cloned[key];
      continue;
    }

    if (!value) {
      continue;
    }

    if (isObject(value) && !shouldPreserverObject(value)) {
      if (visited.includes(value)) {
        throw new DataBaseError({
          ...ERRORS.INVALID_PARAM,
          errMsg: '不能将循环结构转换为JSON',
        });
      }

      // 存储key
      const newParents = [...parents, key];
      // 存储value
      const newVisited = [...visited, value];

      const flattenedChild = flatten(
        value,
        shouldPreserverObject,
        newParents,
        newVisited
      );
      cloned[key] = flattenedChild;
      let hasKeyNotCombined = false;
      for (const childKey in flattenedChild) {
        if (!/^\$/.test(childKey)) {
          // 设置b.a
          cloned[`${key}.${childKey}`] = flattenedChild[childKey];
          delete cloned[key][childKey];
        } else {
          hasKeyNotCombined = true;
        }
      }

      if (!hasKeyNotCombined) {
        delete cloned[key];
      }
    }
  }

  return cloned;
}

export function mergeConditionAfterEncode(
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
        query[conditionKey].push(condition[conditionKey]);
      } else if (isObject(query[conditionKey])) {
        if (isObject(condition[conditionKey])) {
          Object.assign(query[conditionKey], condition[conditionKey]);
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

export function isConversionRequired(val: any): boolean {
  return isInternalObject(val) || isDate(val) || isRegExp(val);
}

export function encodeInternalDataType(val: any): IQueryCondition {
  return serializeInternalDataType(val);
}
