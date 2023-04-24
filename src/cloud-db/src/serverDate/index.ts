import { DataBaseError, ErrorMsg, ERRORS } from '../error';
import { InternalSymbol, SYMBOL_SERVER_DATE } from '../Symbols';

export class ServerDate {
  readonly offset: number;
  // 查询，更新，添加，删除里是否有serverDate,调用了serverDate 会去调用parse方法，整体置为true,
  // 在发送网络请求前判断是否有serverDate，拼接完参数后serverDate 重置。
  static isHasServerDate: boolean;
  static resetHasServerDate() {
    this.isHasServerDate = false;
  }

  static setHasServerDate(value:any) {
    this.isHasServerDate = value;
  }

  static getServerDate() {
    return this.isHasServerDate;
  }

  constructor({ offset = 0 } = {}) {
    if (!Number.isInteger(offset)) {
      throw new DataBaseError({
        ...ERRORS.INVALID_PARAM,
        errMsg: ErrorMsg.serverDate.SERVER_DATE_PARAM_ERROR,
      });
    }

    this.offset = offset;
  }

  get _internalType(): InternalSymbol {
    return SYMBOL_SERVER_DATE;
  }

  parse(): Record<string, any> {
    ServerDate.setHasServerDate(true);
    return {
      $dyc_server_date: {
        offset: this.offset,
      },
    };
  }
}

export function ServerDateConstructor(opt:any) {
  return new ServerDate(opt);
}
