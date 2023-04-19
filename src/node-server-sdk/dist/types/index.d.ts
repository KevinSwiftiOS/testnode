import { db as DB } from '@open-dy/cloud-db';
export declare class dySDK {
    private dbInstance;
    constructor(config?: any);
    getdatabase(): DB;
}
