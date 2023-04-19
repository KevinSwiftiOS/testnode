import axios from 'axios';

import { baseDb, DataBaseError, db } from '../src';
import UpdateCommand, { UPDATE_COMMANDS_LITERAL } from '../src/commands/update';
import { ObjectId, ObjectIdConstructor } from '../src/ObjectId';
import { QueryEncoder } from '../src/serializer/query';
import { InternalSymbol } from '../src/Symbols';
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
// cl

test('test mock', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return {};
    }
  }
  baseDb.reqClass = Request;
  const res = await dbInstance.collection('ServerDate').doc('asc').get();
  expect(res).toEqual({ data: [], requestId: '' });
});

test('test mock', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return {};
    }
  }
  baseDb.reqClass = Request;

  const res = await dbInstance.collection('ServerDate').doc('asc').remove();
  expect(res).toEqual({ deleted: 0, requestId: '' });
});

test('test mock', async () => {
  class Request {
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async send() {
      return {};
    }
  }
  baseDb.reqClass = Request;
  const res = await dbInstance.collection('ServerDate').doc('asc').update({});
  expect(res).toEqual({ updated: 0, requestId: '' });
});

test('test mock', async () => {
  try {
    // eslint-disable-next-line no-new
    new InternalSymbol([], []);
    InternalSymbol.for([]);
  } catch (error) {
    expect(error.errMsg).toEqual('InternalSymbol不能被新操作符实例化');
  }
});

test('test serializer', async () => {
  const res = await dbInstance
    .collection('testCommands')
    .where({ price: '' })
    .get();
  expect(res.data).toEqual([]);
});

test('test serializer', async () => {
  const res = await dbInstance
    .collection('testCommands')
    .where({ $price: 13 })
    .get();
  expect(res.data).toEqual([]);
});

test('test serializer', async () => {
  const res = await dbInstance
    .collection('testCommands')
    .where({ b: { a: 1 }, a: 1 })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e0381c5b94adea3f5991f',
      a: 1,
      b: {
        a: 1,
      },
    },
  ]);
});

test('test serializer', async () => {
  const res = await dbInstance
    .collection('testCommands')
    .where({ b: { a: 1 }, a: 1 })
    .get();
  expect(res.data).not.toEqual(0);
});

test('test serializer', async () => {
  const b: any = {};
  const a = {
    b: b,
  };
  b.a = a;
  try {
    await dbInstance.collection('testCommands').where(a).get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能将循环结构转换为JSON');
  }
});

test('test serializer', async () => {
  try {
    await dbInstance
      .collection('testCommands')
      .where(dbInstance.command.eq(3))
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能对未设置字段名的比较命令进行编码');
  }
});

test('test serializer', async () => {
  const b: any = {};
  const a = {
    b: b,
  };
  b.a = a;
  try {
    await dbInstance
      .collection('testCommands')
      .where({ a: dbInstance.command.eq(b) })
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能将循环结构转换为JSON');
  }
});
test('test serializer', async () => {
  const b: any = {};
  delete b.toJSON;
  try {
    await dbInstance
      .collection('testCommands')
      .where({ a: ObjectIdConstructor({ id: '123' }) })
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能将循环结构转换为JSON');
  }
});
test('test Objectid', async () => {
  const b: any = {};
  delete b.toJSON;
  try {
    await dbInstance
      .collection('testCommands')
      .where({ a: new ObjectId() })
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能将循环结构转换为JSON');
  }
});
test('test Objectid', async () => {
  const b: any = {};
  delete b.toJSON;
  try {
    await dbInstance
      .collection('testCommands')
      .where({ a: new ObjectId({}) })
      .get();
  } catch (error) {
    expect(error.errMsg).toEqual('不能将循环结构转换为JSON');
  }
});

test('test Objectid', async () => {
  const res1 = await dbInstance
    .collection('testcommands')
    .where({ name: 1 })
    .update({ $a: 1 });
  expect(res1.updated).toEqual(0);
});
test('test Database Error', async () => {
  const err = new DataBaseError({ errMsg: '', errorCode: 0 });
  expect(err.errorCode).toEqual(0);
  expect(err.message).toEqual('errCode:  | errMsg: ');
});

test('test Database Error', async () => {
  const err = new DataBaseError({ errMsg: '', errorCode: 0 });
  err.message = '123';
  expect(err.errMsg).toEqual('123');
});

test('test Database Error', async () => {
  try {
    InternalSymbol.for('1');
    expect(InternalSymbol.for('1')).not.toBe(null);
  } catch {}
});

test('test Database Error', async () => {
  const res1 = await dbInstance
    .collection('testcommands')
    .where({ name: 1 })
    .update({ SYMBOL_UNSET_FIELD_NAME: 1 });
  expect(res1.updated).toEqual(0);
});

test('query encoder', () => {
  const encoder = new QueryEncoder();
  expect(encoder.encodeQuery(1 as any)).toBe(1);
});

test('query encoder', () => {
  const encoder = new QueryEncoder();
  const updater = new UpdateCommand(UPDATE_COMMANDS_LITERAL.SET, [3]);
  expect(encoder.encodeLogicCommand(updater as any)).toEqual({ $set: 3 });
});

test('query encoder', () => {
  const encoder = new QueryEncoder();
  const updater = new UpdateCommand(UPDATE_COMMANDS_LITERAL.SET, [3, 4]);
  expect(encoder.encodeLogicCommand(updater as any)).toEqual({ $set: [3, 4] });
});

test('query encoder', () => {
  try {
    const encoder = new QueryEncoder();
    const updater = new UpdateCommand(UPDATE_COMMANDS_LITERAL.SET, [3, 4]);
    expect(encoder.encodeComparisonCommand(updater as any)).toBe(undefined);
  } catch (error) {
    expect(error.errMsg).toEqual('不能对未设置字段名的比较命令进行编码');
  }
});

test('query encoder', () => {
  try {
    const encoder = new QueryEncoder();
    expect(
      encoder.mergeConditionAfterEncode({ a: [1, 2] }, { a: [1, 2] }, 'a')
    ).toBe(undefined);
  } catch {}
});

test('query encoder', () => {
  const encoder = new QueryEncoder();
  expect(
    encoder.mergeConditionAfterEncode({ a: { b: 2 } }, { a: 2 }, 'a')
  ).toBe(undefined);
});
test('query encoder', () => {
  const encoder = new QueryEncoder();
  expect(encoder.mergeConditionAfterEncode({ a: 1 }, { a: 2 }, 'a')).toBe(
    undefined
  );
});
