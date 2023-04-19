import { GetRes, RemoveRes, UpdateRes } from './typings';
export declare class DocumentReference {
    readonly id: string | number;
    readonly projection: any;
    get(): Promise<GetRes>;
    set(opts: any): Promise<UpdateRes>;
    update(opts: any): Promise<UpdateRes>;
    remove(): Promise<RemoveRes>;
}
