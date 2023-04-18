import { Command } from './command';
interface DataBaseConfig {
    envID?: string;
}
export declare class baseDb {
    serverDate: any;
    ObjectId: any;
    config: DataBaseConfig;
    static reqClass: any;
    command: typeof Command;
    constructor(config?: any);
}
export {};
