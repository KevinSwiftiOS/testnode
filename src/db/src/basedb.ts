import { Command } from './command';
import { ObjectIdConstructor } from './ObjectId/index';
import { ServerDateConstructor } from './serverDate/index';
// 云数据库相关配置
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
  _useFeature?: boolean; // 是否走新特性
  throwOnCode?: boolean; // 错误回包(带code) throw
}

interface ICredentialsInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private_key_id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private_key: string;
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
  config: ICloudBaseConfig;

  static ws: any;

  static reqClass: any;

  static wsClass: any;

  /** 逻辑操作的命令 */
  command: typeof Command;

  constructor(config?: any) {
    this.config = config;
    this.command = Command;
    this.serverDate = ServerDateConstructor;
    this.ObjectId = ObjectIdConstructor;
  }
}
