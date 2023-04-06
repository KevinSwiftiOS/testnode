// transpile internal data type
import { LogicCommand } from '../commands/logic';
import { SYMBOL_OBJECTID, SYMBOL_SERVER_DATE } from '../helper/symbol';
import { ObjectId } from '../ObjectId/index';
import { ServerDate } from '../serverDate/index';
import {
  getType,
  isArray,
  isDate,
  isInternalObject,
  isObject,
  isRegExp,
} from '../utils/type';

export type IQueryCondition = Record<string, any> | LogicCommand;

export type AnyObject = {
  [x: string]: any;
};

export function serialize(val: any): IQueryCondition {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return serializeHelper(val, [val]);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function serializeHelper(val: any, visited: object[]): Record<string, any> {
  if (isInternalObject(val)) {
    switch (val._internalType) {
      case SYMBOL_SERVER_DATE: {
        return (val as ServerDate).parse();
      }

      case SYMBOL_OBJECTID: {
        return (val as ObjectId).parse();
      }

      default: {
        return val.toJSON ? val.toJSON() : val;
      }
    }
  } else if (isDate(val)) {
    return val;
    // return {
    //   $date: +val,
    // }
  } else if (isRegExp(val)) {
    return {
      $regularExpression: {
        pattern: val.source,
        options: val.flags,
      },
    };
  } else if (isArray(val)) {
    return val.map((item) => {
      if (visited.includes(item)) {
        throw new Error('Cannot convert circular structure to JSON');
      }

      return serializeHelper(item, [...visited, item]);
    });
  } else if (isObject(val)) {
    const rawRet: AnyObject = { ...val };
    const finalRet: AnyObject = {};
    // eslint-disable-next-line guard-for-in
    for (const key in rawRet) {
      if (visited.includes(rawRet[key])) {
        throw new Error('Cannot convert circular structure to JSON');
      }

      if (rawRet[key] !== undefined) {
        // 过滤掉undefined
        finalRet[key] = serializeHelper(rawRet[key], [...visited, rawRet[key]]);
      }
    }

    return finalRet;
  } else {
    return val;
  }
}

export function deserialize(object: AnyObject): any {
  const ret = { ...object };
  // eslint-disable-next-line guard-for-in
  for (const key in ret) {
    // eslint-disable-next-line default-case
    switch (key) {
      case '$date': {
        // eslint-disable-next-line default-case
        switch (getType(ret[key])) {
          case 'number': {
            // normal timestamp
            return new Date(ret[key]);
          }

          case 'object': {
            // serverDate
            return new ServerDate(ret[key]);
          }
        }

        break;
      }

      case 'type': {
        // eslint-disable-next-line default-case
        break;
      }
    }
  }

  return object;
}
