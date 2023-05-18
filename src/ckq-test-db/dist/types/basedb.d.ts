import { DbCommand } from './dbcommand';
import { ServerDate, ServerDateParam } from './server-date';
interface DataBaseConfig {
    envID?: string;
}
/**
 * 数据库模块
 *
 */
export declare class baseDb {
    serverDate: (opt?: ServerDateParam) => ServerDate;
    /**
     *
     * @param config
     */
    config: DataBaseConfig;
    static reqClass: any;
    /** 逻辑操作的命令 */
    command: typeof DbCommand;
    constructor(Request: any, config?: DataBaseConfig);
}
export {};
