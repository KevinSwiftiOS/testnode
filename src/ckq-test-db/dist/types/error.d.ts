import { DatabaseMethod } from './constant';
/**
 * 错误内容
 */
export declare const SDKErrors: {
    common: {
        PRESERVER_ERROR: {
            errorCode: number;
            errMsg: string;
        };
        UNSET_FIELD_ERROR: {
            errorCode: number;
            errMsg: string;
        };
    };
    serverDate: {
        SERVER_DATE_PARAM_ERROR: {
            errorCode: number;
            errMsg: string;
        };
    };
    symobl: {
        SYMBOL_PARAM_ERROR: {
            errorCode: number;
            errMsg: string;
        };
    };
    collection: {
        COLLECTION_PARAM_ERROR: {
            errorCode: number;
            errMsg: string;
        };
        add: {
            ADD_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            ADD_PARAM_ID_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        where: {
            WHERE_PARAM_OBJECT_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            WHREE_PARAM_UNDEFINED_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        'order-by': {
            ORDER_BY_FIELD_PATH_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            ORDER_BY_DIRECTION_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        limit: {
            LIMIT_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        skip: {
            SKIP_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        field: {
            FILED_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        update: {
            UPDATE_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            UPDATE_ID_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        remove: {
            REMOVE_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
    };
    doc: {
        set: {
            SET_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            SET_PARAM_OBJECT_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            SET_PARAM_HAS_ID_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        update: {
            UPDATE_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            UPDATE_PARAM_OBJECT_ERROR: {
                errorCode: number;
                errMsg: string;
            };
            UPDATE_PARAM_HAS_ID_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
        get: {
            GET_PARAM_ERROR: {
                errorCode: number;
                errMsg: string;
            };
        };
    };
};
interface ErrorConstructorOptions {
    errorCode: number;
    errMsg: string;
}
export declare class DataBaseError extends Error {
    errorCode: number;
    errMsg: string;
    static reqClass: any;
    static dbConfig: any;
    constructor(options: ErrorConstructorOptions);
}
export declare const ReportDataBaseError: (params: ErrorConstructorOptions, method: DatabaseMethod) => void;
export {};
