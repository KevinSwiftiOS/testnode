import { Point } from './geo/point';
import { CollectionReference } from './collection';
import { Command } from './command';
interface GeoTeyp {
    Point: typeof Point;
}
export { Query } from './query';
export { CollectionReference } from './collection';
export { DocumentReference } from './document';
interface ICloudBaseConfig {
    timeout?: number;
    isHttp?: boolean;
    secretId?: string;
    secretKey?: string;
    envName?: string;
    env?: string;
    sessionToken?: string;
    serviceUrl?: string;
    headers?: any;
    proxy?: string;
    version?: string;
    credentials?: ICredentialsInfo;
    _useFeature?: boolean;
    throwOnCode?: boolean;
}
interface ICredentialsInfo {
    private_key_id: string;
    private_key: string;
}
export declare class Db {
    Geo: GeoTeyp;
    command: typeof Command;
    RegExp: any;
    serverDate: any;
    ObjectId: any;
    startTransaction: any;
    runTransaction: any;
    config: ICloudBaseConfig;
    static ws: any;
    static reqClass: any;
    static wsClass: any;
    static createSign: Function;
    static getAccessToken: Function;
    static dataVersion: string;
    static runtime: string;
    static appSecretInfo: any;
    constructor(config?: any);
    collection(collName: string): CollectionReference;
    createCollection(collName: string): any;
}