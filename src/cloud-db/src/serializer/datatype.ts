// transpile internal data type
import { LogicCommand } from '../commands/logic';
import { DataBaseError, ErrorMsg, ERRORS } from '../error';
import { ObjectId } from '../ObjectId/index';
import { ServerDate } from '../serverDate/index';
import { SYMBOL_OBJECTID, SYMBOL_SERVER_DATE } from '../Symbols';
import { isArray, isDate, isInternalObject, isObject } from '../typings';

export type IQueryCondition = Record<string, any> | LogicCommand;

export type AnyObject = {
  [x: string]: any;
};

export function serialize(val: any): IQueryCondition {
  return serializeHelper(val, [val]);
}

function serializeHelper(val: any, visited: AnyObject[]): Record<string, any> {
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
  } else if (isArray(val)) {
    return val.map((item) => {
      if (visited.includes(item)) {
        throw new DataBaseError({
          ...ERRORS.INVALID_PARAM,
          errMsg: ErrorMsg.common.PRESERVER_ERROR,
        });
      }

      return serializeHelper(item, [...visited, item]);
    });
  } else if (isObject(val)) {
    const rawRet: AnyObject = { ...val };
    const finalRet: AnyObject = {};
    for (const key of Object.keys(rawRet)) {
      if (visited.includes(rawRet[key])) {
        throw new DataBaseError({
          ...ERRORS.INVALID_PARAM,
          errMsg: ErrorMsg.common.PRESERVER_ERROR,
        });
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
