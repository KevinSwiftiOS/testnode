import { IWatchOptions, DBRealtimeListener } from './typings/index';
export declare class DocumentReference {
    readonly id: string | number;
    readonly _transactionId: string;
    readonly projection: Object;
    private _apiOptions;
    set(data: Object): Promise<any>;
    update(data: Object): Promise<any>;
    delete(): Promise<any>;
    remove(): Promise<any>;
    get(): Promise<any>;
    field(projection: Object): DocumentReference;
    watch: (options: IWatchOptions) => DBRealtimeListener;
}