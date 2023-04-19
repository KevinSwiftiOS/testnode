import axios from 'axios';

import { baseDb, db } from '../../src';
import { QUERY_COMMANDS_LITERAL, QueryCommand } from '../../src/commands/query';
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

test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({ price: command.neq(2) })
    .get();
  expect(res.data).not.toEqual(0);
});
test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({
      price: command.and([
        {
          price: command.lt(10),
        },
        {
          name: command.eq('ckq'),
        },
      ]),
    })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
  ]);
});

test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({ price: command.gt(100).or(command.lte(1)) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
  ]);
});
test('test command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({ price: command.gte(2).or(command.lte(10)) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
    {
      _id: '643c06559b535b9202604f5b',
      name: 'chenghe',
      price: 2,
    },
  ]);
});
test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({ price: command.in([1, 2]) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643c05ce9b535b9202604f5a',
      name: 'ckq',
      price: 1,
    },
    {
      _id: '643c06559b535b9202604f5b',
      name: 'chenghe',
      price: 2,
    },
  ]);
});

test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({ price: command.nin([1]) })
    .get();
  expect(res.data.length).not.toEqual(0);
});
test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest1')
    .where({
      price: command.nor([command.lte(1), command.gte(3)]),
    })
    .get();
  expect(res.data.length).not.toEqual(0);
});
test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({
      price: command.nor(command.lte(1), command.gt(13)),
    })
    .get();
  expect(res.data).toEqual([
    { _id: '643d7d4dac1f3bfb53697ae3', price: 2 },
    { _id: '643d7d51ac1f3bfb53697ae4', price: 3 },
    { _id: '643e418bac1f3bfb53697ae9', asa: '12212' },
    { _id: '643e4190ac1f3bfb53697aea', asa: '12212' },
    { _id: '643e019bac1f3bfb53697ae5', price: 13 },
  ]);
});

test('command', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({
      price: command.and(command.gt(1), command.lt(3)),
    })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643d7d4dac1f3bfb53697ae3',
      price: 2,
    },
  ]);
});

test('command', async () => {
  const command = dbInstance.command;

  const res = await dbInstance
    .collection('unittest2')
    .where({
      price: command.or([command.lte(1), command.gte(3)]),
    })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643d7d48ac1f3bfb53697ae2',
      price: 1,
    },
    {
      _id: '643d7d51ac1f3bfb53697ae4',
      price: 3,
    },
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('command', async () => {
  const command = dbInstance.command;

  const res = await dbInstance
    .collection('unittest2')
    .where({
      price: command.or(command.lte(1), command.gte(3)),
    })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643d7d48ac1f3bfb53697ae2',
      price: 1,
    },
    {
      _id: '643d7d51ac1f3bfb53697ae4',
      price: 3,
    },
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('dbcommand', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({
      price: command.or(command.lte(1), command.gte(3)).and(command.lt(3)),
    })
    .get();
  expect(res.data.length).toEqual(1);
});

test('commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).eq(13) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});
test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).neq(14) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});
test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).gt(1) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).gte(1) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});
test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).lt(15) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).in([13, 14]) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).nin([4]) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('test commands', async () => {
  const command = dbInstance.command;
  const res = await dbInstance
    .collection('unittest2')
    .where({ price: command.eq(13).lt(64) })
    .get();
  expect(res.data).toEqual([
    {
      _id: '643e019bac1f3bfb53697ae5',
      price: 13,
    },
  ]);
});

test('test mock', () => {
  const command = new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [3]);
  expect(command.toJSON()).toEqual({
    $ne: 3,
  });
});

test('test mock', async () => {
  const command = new QueryCommand(QUERY_COMMANDS_LITERAL.IN, [3]);
  expect(command.toJSON()).toEqual({
    [`$in`]: [3],
  });
});
