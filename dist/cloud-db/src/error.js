"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = exports.ErrorMsg = exports.ERRORS = void 0;
/**
 * 错误内容
 */
exports.ERRORS = {
    INVALID_PARAM: {
        errorCode: 156401,
        errMsg: '非法参数',
    },
    DATABASE_REQUEST_FAILED: {
        errorCode: 156402,
        errMsg: '请求失败',
    },
};
exports.ErrorMsg = {
    common: {
        PRESERVER_ERROR: '不能将循环结构转换为JSON',
        UNSET_FIELD_ERROR: '不能对未设置字段名的比较命令进行编码',
    },
    serverDate: {
        SERVER_DATE_PARAM_ERROR: 'serverDate值必须是一个整型',
    },
    symobl: {
        SYMBOL_PARAM_ERROR: 'InternalSymbol不能被新操作符实例化',
    },
    collection: {
        COLLECTION_PARAM_ERROR: '集合名必填',
        add: {
            ADD_PARAM_ERROR: '参数必须是对象',
        },
        where: {
            WHERE_PARAM_OBJECT_ERROR: '查询参数必须为对象',
            WHREE_PARAM_UNDEFINED_ERROR: '查询参数对象值不能均为undefined',
        },
        'order-by': {
            ORDER_BY_FIELD_PATH_ERROR: '非法排序路径',
            ORDER_BY_DIRECTION_ERROR: '排序字符不合法',
        },
        limit: {
            LIMIT_PARAM_ERROR: 'limit必须是一个整型',
        },
        skip: {
            SKIP_PARAM_ERROR: 'skip必须是一个整型',
        },
        update: {
            UPDATE_PARAM_ERROR: '参数必须是非空对象',
            UPDATE_ID_ERROR: '不能更新id的值',
        },
        remove: {
            REMOVE_PARAM_ERROR: 'remove()操作不支持skip,limit,projection,orderBy',
        },
    },
    doc: {
        set: {
            SET_PARAM_ERROR: 'docId必须为非空字符串',
            SET_PARAM_OBJECT_ERROR: '参数必须是非空对象',
            SET_PARAM_HAS_ID_ERROR: '_id值不能更新',
        },
        update: {
            UPDATE_PARAM_ERROR: 'docId必须为非空字符串',
            UPDATE_PARAM_OBJECT_ERROR: '参数必须是非空对象',
            UPDATE_PARAM_HAS_ID_ERROR: '_id值不能更新',
        },
        get: {
            GET_PARAM_ERROR: 'docId必须为非空字符串',
        },
    },
};
class DataBaseError extends Error {
    constructor(options) {
        super(options.errMsg);
        this.errorCode = 0;
        Object.defineProperties(this, {
            message: {
                get() {
                    return `errCode: ${this.errorCode || ''} | errMsg: ${this.errMsg}`;
                },
                set(msg) {
                    this.errMsg = msg;
                },
            },
        });
        this.errorCode = options.errorCode || 0;
        this.errMsg = options.errMsg || '';
    }
}
exports.DataBaseError = DataBaseError;
//# sourceMappingURL=error.js.map