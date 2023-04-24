import { Command } from './command';
import { ServerDateConstructor } from './serverDate/index';

interface DataBaseConfig {
  envID?: string;
}
/**
 * 数据库模块
 *
 */
export class baseDb {
  serverDate: any;

  ObjectId: any;
  /**
   *
   * @param config
   */
  config: DataBaseConfig;

  static reqClass: any;

  /** 逻辑操作的命令 */
  command: typeof Command;

  constructor(Request: any, config?: any) {
    baseDb.reqClass = Request;
    this.config = config;
    this.command = Command;
    this.serverDate = ServerDateConstructor;
  }
}
