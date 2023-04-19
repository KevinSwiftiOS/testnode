import { baseDb, DataBaseError, db as DB } from './cloud-db/src';
import axios from 'axios';
class Request {
  async send(action: unknown, data: unknown) {
    const params = Object.assign({}, data, {
      action,
    });

    const res = await axios({
      method: 'post',
      url: 'http://cloud-database-api.dycloud.run/api/cloud_database/exec_cloud_database_cmd',
      data: params,
      headers: {
        'X-TT-ENV': 'ppe_cloud_database_dyc',
        'content-type': 'application/json',
        'x-use-ppe': 1,
      },
    });
    if (res.status !== 200) {
      throw new DataBaseError({
        errMsg: res.statusText,
        errorCode: res.status,
      });
    }

    if (res.data.status_code) {
      throw new DataBaseError({
        errMsg: res.data.status_message ?? '',
        errorCode: res.data.status_code,
      });
    }

    return res?.data?.data || '{}';
  }
}
export class dySDK {
  private dbInstance;
  constructor(config?: any) {
    const dbInstance = new DB(config);
    baseDb.reqClass = Request;
    this.dbInstance = dbInstance;
  }

  getdatabase(): DB {
    return this.dbInstance;
  }
}
