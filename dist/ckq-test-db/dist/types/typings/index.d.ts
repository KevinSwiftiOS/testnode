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
