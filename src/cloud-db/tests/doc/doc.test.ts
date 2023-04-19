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

test('doc get', async () => {
  try {
    await dbInstance.collection('unittest1').doc([] as any);
  } catch (error) {
    expect(error.errMsg).toEqual('docId必须为字符串或数字');
  }
});

test('doc get', async () => {
  const res = await dbInstance
    .collection('unittest1')
    .doc('643c05ce9b535b9202604f5a')
    .get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
  ]);
});

test('doc add', async () => {
  try {
    await dbInstance.collection('unittest1').add('' as any);
  } catch (error) {
    expect(error.errMsg).toEqual('参数必须是非空对象');
  }
});

test('doc add', async () => {
  const res = await dbInstance.collection('unittest1').add({ name: 'chenghe' });
  expect(res.id).not.toBe(undefined);
});

test('doc set', async () => {
  try {
    await dbInstance
      .collection('unittest1')
      .doc('')
      .set('' as any);
  } catch (error) {
    expect(error.errMsg).toEqual('docId不能为空');
  }
});

test('doc set', async () => {
  try {
    await dbInstance.collection('unittest4').doc('a').set({ _id: 1 });
  } catch (error) {
    expect(error.errMsg).toEqual('_id值不能更新');
  }
});

test('doc set', async () => {
  try {
    await dbInstance.collection('unittest4').doc('a').set([]);
  } catch (error) {
    expect(error.errMsg).toEqual('参数必须为非空对象');
  }
});

test('doc set', async () => {
  try {
    const _ = dbInstance.command;
    await dbInstance.collection('unittest4').doc('a').set(_.eq(10));
  } catch (error) {
    expect(error.errMsg).toEqual('参数必须为非空对象');
  }
});

test('doc set', async () => {
  const res = await dbInstance
    .collection('unittest4')
    .doc('123')
    .set({ name: 'chenghe' });
  expect(res.updated).toBe(0);
});
test('doc update', async () => {
  try {
    await dbInstance
      .collection('unittest4')
      .doc('643c1de89b535b9202604f5d')
      .update('');
  } catch (error) {
    expect(error.errMsg).toBe('参数必须为非空对象');
  }
});
test('doc update', async () => {
  try {
    await dbInstance
      .collection('unittest4')
      .doc('643c1de89b535b9202604f5d')
      .update([]);
  } catch (error) {
    expect(error.errMsg).toBe('参数必须为非空对象');
  }
});

test('doc update', async () => {
  try {
    await dbInstance
      .collection('unittest4')
      .doc('643c1de89b535b9202604f5d')
      .update({ _id: 1 });
  } catch (error) {
    expect(error.errMsg).toBe('_id值不能更新');
  }
});

test('doc update', async () => {
  const res = await dbInstance
    .collection('unittest4')
    .doc('643c1de89b535b9202604f5d')
    .update({ name: '12323' });
  expect(res.updated).toEqual(0);
});
test('doc remove', async () => {
  const res = await dbInstance
    .collection('unittest4')
    .doc('643c1de89b535b9202604f5d')
    .remove();
  expect(res.deleted).toEqual(0);
});
