/* eslint-disable padding-line-between-statements */
/* eslint-disable no-negated-condition */
import { LogicCommand } from '../commands/logic';
import {
  getType,
  isArray,
  isDate,
  isInternalObject,
  isObject,
  isRegExp,
} from '../utils/type';
import {
  deserialize as deserializeInternalDataType,
  serialize as serializeInternalDataType,
} from './datatype';

export type IQueryCondition = Record<string, any> | LogicCommand;

export type AnyObject = {
  [x: string]: any;
};

function flatten(
  query: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  shouldPreserverObject: (object: object) => boolean,
  parents: string[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  visited: object[]
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
        throw new Error('Cannot convert circular structure to JSON');
      }

      const newParents = [...parents, key];

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

export function flattenQueryObject(
  query: Record<string, any>
): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return flatten(query, isConversionRequired, [], [query]);
}

export function flattenObject(object: AnyObject): AnyObject {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return flatten(object, (_: object) => false, [], [object]);
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

export function isConversionRequired(val: any): boolean {
  return isInternalObject(val) || isDate(val) || isRegExp(val);
}

export function encodeInternalDataType(val: any): IQueryCondition {
  return serializeInternalDataType(val);
}

export function decodeInternalDataType(object: AnyObject): any {
  return deserializeInternalDataType(object);
}
