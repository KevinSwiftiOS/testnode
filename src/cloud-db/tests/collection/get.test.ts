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
test('get', async () => {
  const res = await dbInstance.collection('unittest1').get();
  expect(res?.data.length).not.toEqual(0);
});
test('get', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .where({ name: 'ckq' })
    .get();
  expect(res?.data).toEqual([
    { name: 'ckq', _id: '643c05ce9b535b9202604f5a', price: 1 },
  ]);
});
test('get where', async () => {
  try {
    await dbInstance.collection('unittest1').where([]).get();
  } catch (error) {
    expect(error.errorCode).toEqual(156_401);
  }
});
test('get where', async () => {
  try {
    await dbInstance.collection('unittest1').where({ key: undefined }).get();
  } catch (error) {
    expect(error.errorCode).toEqual(156_401);
  }
});

test('get orderby', async () => {
  try {
    await dbInstance.collection('unittest1').orderBy('', 'desc').get();
  } catch (error) {
    expect(error.errorCode).toEqual(156_401);
    expect(error.errMsg).toEqual('非法排序路径');
  }
});

test('get orderby', async () => {
  try {
    await dbInstance
      .collection('unittest1')
      .orderBy('a', '' as any)
      .get();
  } catch (error) {
    expect(error.errorCode).toEqual(156_401);
    expect(error.errMsg).toEqual('排序字符不合法');
  }
});

test('get orderby', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .orderBy('price', 'asc')
    .get();
  expect(res.data.length).not.toEqual(0);
});

test('get orderby', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .orderBy('price', 'desc')
    .get();
  expect(res.data.length).not.toEqual(0);
});

test('get limit', async () => {
  const res = await dbInstance.collection('unittest1').limit(1).get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
  ]);
});

test('get limit', async () => {
  try {
    await dbInstance
      .collection('unittest1')
      .limit('' as any)
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('limit必须是一个整型');
  }
});
test('get skip', async () => {
  try {
    await dbInstance
      .collection('unittest1')
      .skip('' as any)
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('skip必须是一个整型');
  }
});
test('get skip', async () => {
  const res = await dbInstance.collection('unittest1').skip(1).get();
  expect(res.data.length).not.toEqual(0);
});
test('get field', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .field({ price: true })
    .get();
  expect(res.data.length).not.toEqual(0);
});
test('get field', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .field({ price: false })
    .get();
  expect(res.data.length).not.toEqual(0);
});
test('get field', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .field({ price: 0 })
    .get();

  expect(res.data.length).not.toEqual(0);
});

test('get field', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .field({ price: 1 })
    .get();
  expect(res.data.length).not.toEqual(0);
});
test('get field', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .field({ price: { a: 1 } })
    .get();

  expect(res.data).toEqual([]);
});

test('count', async () => {
  const res = await dbInstance.collection('unittest1').count();

  expect(res.total).not.toEqual(0);
});
test('count', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .where({ name: 'ckq' })
    .count();
  expect(res.total).toEqual(1);
});
