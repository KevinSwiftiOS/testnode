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
   * 初始化
   *
   * 默认是 `default` 数据库，为今后扩展使用
   *
   * @param config
   */
  config: DataBaseConfig;

  static reqClass: any;

  /** 逻辑操作的命令 */
  command: typeof Command;

  constructor(config?: any) {
    this.config = config;
    this.command = Command;
    this.serverDate = ServerDateConstructor;
  }
}
