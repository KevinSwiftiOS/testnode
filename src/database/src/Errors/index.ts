/**
 * 错误内容
 */
export const ERRORS = {
  INVALID_PARAM: {
    errorCode: 156_401,
    errMsg: '非法参数',
  },
  DATABASE_REQUEST_FAILED: {
    errorCode: 156_402,
    errMsg: '请求失败',
  },
};

export enum ErrorMsg {
  DocIDError = '文档ID不合法',
  CollNameError = '集合名称不合法',
  OpStrError = '操作符不合法',
  DirectionError = '排序字符不合法',
  IntergerError = '必须是一个整型',
  BooleanError = '必须是一个布尔类型',
  ArrayError = '必须为一个数组',
  QueryParamTypeError = '查询参数必须为对象',
  QueryParamValueError = '查询参数对象值不能均为undefined',
  CentersPhereError = 'centersPhere结构不合法',
}
interface ErrorConstructorOptions {
  errorCode?: number;
  errMsg: string;
}

export class DataBaseError extends Error {
  errorCode = 0;
  errMsg: string;
  requestID?: string;

  constructor(options: ErrorConstructorOptions) {
    super(options.errMsg);

    Object.defineProperties(this, {
      message: {
        get() {
          return `errCode: ${this.errorCode || ''} | errMsg: ${this.errMsg}`;
        },
        set(msg: string) {
          this.errMsg = msg;
        },
      },
    });

    this.errorCode = options.errorCode || 0;
    this.errMsg = options.errMsg || '';
  }
}
