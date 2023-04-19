import axios from 'axios';

import { baseDb, db } from '../src';
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

test('test serverdate', async () => {
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate({ offset: 10 }) });
  expect(res.id).not.toBe(undefined);
});

test('test serverdate', async () => {
  try {
    await dbInstance
      .collection('ServerDate')
      .add({ date: dbInstance.serverDate({ offset: '10' }) });
  } catch (error) {
    expect(error.errMsg).toBe('serverDate值必须是一个整型');
  }
});

test('test serverdate', async () => {
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate({}) });
  expect(res.id).not.toBe(undefined);
});

test('test serverdate', async () => {
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate() });
  expect(res.id).not.toBe(undefined);
});

test('test', async () => {
  const res = await dbInstance
    .collection('ServerDate')
    .add({ time: new Date() });
  expect(res.id).not.toEqual(undefined);
});

test('test', async () => {
  const res = await dbInstance.collection('ServerDate').get();
  expect(res.data.length).not.toEqual(0);
});

test('test', async () => {
  const res = await dbInstance
    .collection('ServerDate')
    .where({ a: undefined as any, b: 123 })
    .get();
  expect(res.data).not.toEqual(0);
});
test('test serverdate', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return { data: { inserted_ids: ['123'], request_id: undefined } };
    }
  }
  baseDb.reqClass = Request;
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate() });
  expect(res).not.toEqual({ id: '123', request_id: '' });
});

test('test serverdate', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return { data: { inserted_ids: [], request_id: '' } };
    }
  }
  baseDb.reqClass = Request;
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate() });
  expect(res).not.toEqual({ id: [], request_id: '' });
});

test('test serverdate', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // async send() {}
  }
  baseDb.reqClass = Request;
  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate() });
  expect(res).toEqual({ id: undefined, requestId: '' });
});

test('test serverdate', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return { request_id: undefined };
    }
  }
  baseDb.reqClass = Request;

  const res = await dbInstance
    .collection('ServerDate')
    .add({ date: dbInstance.serverDate() });
  expect(res).toEqual({ id: undefined, requestId: '' });
});
