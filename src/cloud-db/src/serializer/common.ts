import { LogicCommand } from '../commands/logic';
import { DataBaseError, ErrorMsg, ERRORS } from '../error';
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
  // console.log('query', query);
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

    // 值是对象的情况下再进入 { 'person': { name: 'ckq' } }
    if (isObject(value) && !shouldPreserverObject(value)) {
      // 避免循引用
      if (visited.includes(value)) {
        throw new DataBaseError({
          ...ERRORS.INVALID_PARAM,
          errMsg: ErrorMsg.common.PRESERVER_ERROR,
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
      // console.log('flattenedChild', flattenedChild);
      // console.log('cloned', cloned);
      cloned[key] = flattenedChild;
      let hasKeyNotCombined = false;
      for (const childKey in flattenedChild) {
        if (!/^\$/.test(childKey)) {
          // 设置person.name = ckq;
          cloned[`${key}.${childKey}`] = flattenedChild[childKey];
          delete cloned[key][childKey];
        } else {
          hasKeyNotCombined = true;
        }
      }

      // console.log('hasKeyNotCombined', hasKeyNotCombined);

      if (!hasKeyNotCombined) {
        // person 拿掉
        delete cloned[key];
      }
    }
  }

  // console.log('cloned', cloned);
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
