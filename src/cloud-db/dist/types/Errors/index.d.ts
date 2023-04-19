export declare const ERRORS: {
    INVALID_PARAM: {
        errorCode: number;
        errMsg: string;
    };
    DATABASE_REQUEST_FAILED: {
        errorCode: number;
        errMsg: string;
    };
};
export declare const ErrorMsg: {
    common: {
        PRESERVER_ERROR: string;
        UNSET_FIELD_ERROR: string;
    };
    serverDate: {
        SERVER_DATE_PARAM_ERROR: string;
    };
    symobl: {
        SYMBOL_PARAM_ERROR: string;
    };
    collection: {
        COLLECTION_PARAM_ERROR: string;
        add: {
            ADD_PARAM_ERROR: string;
        };
        where: {
            WHERE_PARAM_OBJECT_ERROR: string;
            WHREE_PARAM_UNDEFINED_ERROR: string;
        };
        'order-by': {
            ORDER_BY_FIELD_PATH_ERROR: string;
            ORDER_BY_DIRECTION_ERROR: string;
        };
        limit: {
            LIMIT_PARAM_ERROR: string;
        };
        skip: {
            SKIP_PARAM_ERROR: string;
        };
        update: {
            UPDATE_PARAM_ERROR: string;
            UPDATE_ID_ERROR: string;
        };
        remove: {
            REMOVE_PARAM_ERROR: string;
        };
    };
    doc: {
        set: {
            SET_PARAM_ERROR: string;
            SET_PARAM_OBJECT_ERROR: string;
            SET_PARAM_HAS_ID_ERROR: string;
        };
        update: {
            UPDATE_PARAM_ERROR: string;
            UPDATE_PARAM_OBJECT_ERROR: string;
            UPDATE_PARAM_HAS_ID_ERROR: string;
        };
        get: {
            GET_PARAM_ERROR: string;
        };
    };
};
interface ErrorConstructorOptions {
    errorCode?: number;
    errMsg: string;
}
export declare class DataBaseError extends Error {
    errorCode: number;
    errMsg: string;
    requestID?: string;
    constructor(options: ErrorConstructorOptions);
}
export {};
