import axios from 'axios';

import { baseDb, db } from '../../src';
class Request {
  private envID: string;
  constructor(config: { envID: string; throwOnNotFound: boolean }) {
    this.envID = config.envID;
  }

  static headers = {
    'X-TT-APPID': 'ttb75ec1e32866e51501',
    'X-TT-OPENID': '123',
    'X-TT-ENV': 'boe_cloud_database_dyc',
    'X-TT-Source': 'CLOUD_DB_SERVER',
    'content-type': 'application/json',
  };

  static setHeaders(config) {
    this.headers = { ...this.headers, ...config };
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async send(action: unknown, data: unknown) {
    const params = Object.assign({}, data, {
      action,
    });
    const res = await axios({
      method: 'post',
      url: 'http://dycloud-database-api-boe.byted.org/api/cloud_database/exec_cloud_database_cmd',
      data: params,
      headers: { ...Request.headers, 'X-TT-ENVID': this.envID },
    });
    return res.data.data;
  }
}
let dbInstance: db;
beforeEach(() => {
  dbInstance = new db({ envID: 'env-eG62dEb5km', throwOnNotFound: true });
  baseDb.reqClass = Request;
});
test('test update', async () => {
  try {
    await dbInstance.collection('unittest1').update({ _id: 1 });
  } catch (error) {
    expect(error.errMsg).toBe('不能更新id的值');
  }
});
test('test update', async () => {
  try {
    await dbInstance.collection('unittest1').update([]);
  } catch (error) {
    expect(error.errMsg).toBe('参数必须为非空对象');
  }
});
test('test update', async () => {
  try {
    await dbInstance.collection('unittest1').update([]);
  } catch (error) {
    expect(error.errMsg).toBe('参数必须为非空对象');
  }
});
test('test update', async () => {
  const res = await dbInstance.collection('unittest3').update({
    name: 'chenghe',
  });
  expect(res.updated).toEqual(1);
});

test('test update', async () => {
  const res = await dbInstance
    .collection('unittest3')
    .where({ name: 'chenghe' })
    .update({
      name: 'ckq',
    });
  expect(res.updated).toEqual(1);
});
