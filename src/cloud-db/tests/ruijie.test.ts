import axios from 'axios';

import { baseDb, db } from '../src';
class Request {
  private envID: string;
  constructor(config: { envID: string; throwOnNotFound: boolean }) {
    this.envID = config.envID;
  }

  static headers = {
    'X-TT-APPID': 'ttb75ec1e32866e51501',
    'X-TT-ENVID': 'env-eG62dEb5km',
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
let id1: '';
let id2: '';

beforeEach(() => {
  dbInstance = new db({ throwOnNotFound: true, envID: 'env-eG62dEb5km' });
  baseDb.reqClass = Request;
});

// test('Collection测试：', async () => { });

test('get 空collection', async () => {
  const res = await dbInstance.collection('collection1').get();
  // if (res.data.length != 0){
  //   // 初始化自动化数据库
  // }
  expect(res.data).toEqual([]);
  expect((res as any).requestId).not.toEqual('');
});

test('add docu1到coll1成功', async () => {
  const res = await dbInstance.collection('collection1').add({
    docu1: 'data1',
  });
  expect((res as any).requestId).not.toEqual('');
  expect((res as any).id).not.toEqual('');
  id1 = (res as any).id;
});

test('update  docu1从coll1成功', async () => {
  const res = await dbInstance
    .collection('collection1')
    .where({ _id: id1 })
    .update({
      update: true,
    });
  expect((res as any).requestId).not.toEqual('');
  expect(res.updated).toEqual(1); // 1成功，0失败
});

test('count  coll1成功', async () => {
  const res = await dbInstance.collection('collection1').count();
  expect((res as any).requestId).not.toEqual('');
  expect(res.total).toEqual(1);
});

test('remove  docu1从coll1成功', async () => {
  const res = await dbInstance
    .collection('collection1')
    .where({ _id: id1 })
    .remove();
  expect((res as any).requestId).not.toEqual('');
  expect(res.deleted).toEqual(1); // 1成功，0失败
});

// collection2 查询测试
test('limit  3从coll2成功', async () => {
  const res = await dbInstance.collection('collection2').limit(3).get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(3);
});

test('orderBy  age升从coll2成功', async () => {
  const res = await dbInstance
    .collection('collection2')
    .orderBy('age', 'asc')
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect((res.data[0] as any).age).toEqual(17);
  expect((res.data[6] as any).age).toEqual(23);
});

test('orderBy  age降从coll2成功', async () => {
  const res = await dbInstance
    .collection('collection2')
    .orderBy('age', 'desc')
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect((res.data[0] as any).age).toEqual(23);
  expect((res.data[6] as any).age).toEqual(17);
});

test('skip  3从coll2成功', async () => {
  const res = await dbInstance.collection('collection2').skip(3).get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(4);
});

test('field  Adult true从coll2成功', async () => {
  const res = await dbInstance
    .collection('collection2')
    .field({
      adult: true,
    })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect((res.data[0] as any).adult !== undefined).toEqual(true);
});

test('field  Adult false从coll2成功', async () => {
  const res = await dbInstance
    .collection('collection2')
    .field({
      adult: false,
    })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect((res.data[0] as any).adult !== undefined).toEqual(false);
});

// command 基于 collection2
test('eq  male从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ gender: _.eq('male') })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(4);
});

test('neq  male从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ gender: _.neq('male') })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(3);
});

test('lt  age20从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ age: _.lt(20) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(3);
});

test('lte  age20从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ age: _.lte(20) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(4);
});

test('gt  age21从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ age: _.gt(21) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(2);
});

test('gte  age21从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ age: _.gte(21) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(3);
});

test('in  countryAB从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ country: _.in(['A', 'B']) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(5);
});

test('nin  countryAB从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where({ country: _.nin(['A', 'B']) })
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(2);
});

test('and  countryA male从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where(_.and([{ country: _.eq('A') }, { gender: 'male' }]))
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(2);
});

test('or  countryA male从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where(_.or([{ country: _.eq('A') }, { gender: 'male' }]))
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(5);
});

test('nor  countryA male从coll2成功', async () => {
  const _ = dbInstance.command;
  const res = await dbInstance
    .collection('collection2')
    .where(_.nor([{ country: _.eq('A') }, { gender: 'male' }]))
    .get();
  expect((res as any).requestId).not.toEqual('');
  expect(res.data.length).toEqual(2);
});

// Document测试：
// test('Document测试：', async () => {});

test('get  id2从coll2成功', async () => {
  const addRes = await dbInstance.collection('collection2').add({
    int: 1,
    string: '1',
    bool: true,
    array: [1, '1', true],
    obj: {
      int: 1,
      string: '1',
      bool: true,
    },
  });
  expect((addRes as any).requestId).not.toEqual('');
  expect((addRes as any).id).not.toEqual('');
  id2 = (addRes as any).id;
  const res = await dbInstance.collection('collection2').doc(id2).get();
  expect((res as any).requestId).not.toEqual('');
  expect((res.data[0] as any)._id).toEqual(id2);
});

test('update  id2从coll2成功', async () => {
  const res = await dbInstance
    .collection('collection2')
    .doc(id2)
    .update({
      int: 0,
      string: '0',
      bool: false,
      array: [0, '0', false],
      obj: {
        int: 0,
        string: '0',
        bool: false,
      },
    });
  expect((res as any).requestId).not.toEqual('');
  expect(res.updated).toEqual(1);

  // 检查变更结果
  const getRes = await dbInstance.collection('collection2').doc(id2).get();
  const data = getRes.data[0];
  delete data._id;
  expect(data).not.toBe(null);
});
//   expect((data)).toEqual({
//     int: 1,
//     string: '1',
//     bool: true,
//     array: [ 1, '1', true ],
//     obj: { string: '1', bool: false, int: 1 }
//   });
// });

test('set  id2从coll2成功', async () => {
  const res = await dbInstance.collection('collection2').doc(id2).set({
    int: '1',
  });
  expect((res as any).requestId).not.toEqual('');
  expect(res.updated).toEqual(1);

  // 检查变更结果
  const getRes = await dbInstance.collection('collection2').doc(id2).get();
  expect(getRes.data[0] as any).toEqual({ int: '1', _id: id2 });
});

test('remove  id2从coll2成功', async () => {
  const res = await dbInstance.collection('collection2').doc(id2).remove();
  expect((res as any).requestId).not.toEqual('');
  expect(res.deleted).toEqual(1);
});
