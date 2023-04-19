import { InternalSymbol } from '../Symbols';

export const getType = (x: any): string =>
  Object.prototype.toString.call(x).slice(8, -1).toLowerCase();

export const isObject = <T extends Record<string, unknown>>(x: any): x is T =>
  getType(x) === 'object';

export const isString = (x: any): x is string => getType(x) === 'string';

export const isArray = <T extends any[] = any[]>(x: any): x is T =>
  Array.isArray(x);

export const isDate = (x: any): x is Date => getType(x) === 'date';

export const isRegExp = (x: any): x is RegExp => getType(x) === 'regexp';

export const isInternalObject = (x: any): boolean =>
  x && x._internalType instanceof InternalSymbol;

export interface GetRes {
  data: Array<any>;
  requestId: string;
}

export interface CountRes {
  total: number;
  requestId: string;
}

export interface UpdateRes {
  updated: number;
  requestId: string;
}

export interface RemoveRes {
  deleted: number;
  requestId: string;
}

export interface AddRes {
  id: string;
  requestId: string;
}
