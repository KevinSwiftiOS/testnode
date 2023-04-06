// import { apiFailMsg } from "./msg"
import { ERR_CODE } from '../config/error.config';
import { isString } from './type';

export interface ICloudSDKError extends Error {
  errCode: number;
  errMsg: string;
}

export class CloudSDKError extends Error {
  errCode = 'UNKNOWN_ERROR';
  errMsg: string;

  requestID?: string;

  constructor(options: IErrorConstructorOptions) {
    super(options.errMsg);

    Object.defineProperties(this, {
      message: {
        get() {
          return `errCode: ${this.errCode} ${
            ERR_CODE[this.errCode] || ''
          } | errMsg: ${this.errMsg}`;
        },
        set(msg: string) {
          this.errMsg = msg;
        },
      },
    });

    this.errCode = options.errCode || 'UNKNOWN_ERROR';
    this.errMsg = options.errMsg;
  }

  get message(): string {
    return `errCode: ${this.errCode} | errMsg: ${this.errMsg}`;
  }

  set message(msg: string) {
    this.errMsg = msg;
  }
}

interface IErrorConstructorOptions {
  errCode?: string;
  errMsg: string;
}

export function isSDKError(error: any): error is CloudSDKError {
  return (
    error && error instanceof Error && isString((error as CloudSDKError).errMsg)
  );
}

// export function returnAsCloudSDKError(err: any, appendMsg = ""): CloudSDKError {
//   if (err) {
//     if (isSDKError(err)) {
//       if (appendMsg) {
//         err.errMsg += "; " + appendMsg
//       }
//       return err
//     }

//     const errCode = err ? err.errCode : undefined
//     const errMsg =
//       ((err && err.errMsg) || err.toString() || "unknown error") +
//       "; " +
//       appendMsg
//     return new CloudSDKError({
//       errCode,
//       errMsg
//     })
//   }

//   return new CloudSDKError({
//     errMsg: appendMsg
//   })
// }

// export function returnAsFinalCloudSDKError(
//   err: any,
//   apiName: string
// ): CloudSDKError {
//   if (err && isSDKError(err)) {
//     return err
//   }

//   const e = returnAsCloudSDKError(err, `at ${apiName} api; `)
//   e.errMsg = apiFailMsg(apiName, e.errMsg)
//   return e
// }

// ============= internal used error ================

// export class GenericError<T extends string, P = any> extends Error {
//   type: T
//   payload: P
//   generic = true

//   constructor(type: T, payload: P, message: string) {
//     super(message)
//     this.type = type
//     this.payload = payload
//   }
// }

// export const isGenericError = <T extends string, P>(e: any): e is GenericError<T, P> => e.generic

export interface IGenericError<T extends string, P = any> extends Error {
  type: T;
  payload: P;
  generic: boolean;
}

export const isGenericError = <T extends string, P>(
  e: any
): e is IGenericError<T, P> => e.generic;

export class TimeoutError
  extends Error
  implements IGenericError<'timeout', null>
{
  type = 'timeout' as const;
  payload = null;
  generic = true;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, no-useless-constructor
  constructor(message: string) {
    super(message);
  }
}

export const isTimeoutError = (e: any): e is TimeoutError =>
  e.type === 'timeout';

export class CancelledError
  extends Error
  implements IGenericError<'cancelled', null>
{
  type = 'cancelled' as const;
  payload = null;
  generic = true;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, no-useless-constructor
  constructor(message: string) {
    super(message);
  }
}

export const isCancelledError = (e: any): e is CancelledError =>
  e.type === 'cancelled';
