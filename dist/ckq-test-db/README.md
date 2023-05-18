# @open-dy/cloud-db
抖音云云数据库sdk
## 安装
```
yarn add @open-dy/cloud-db
```

## 使用方式
```
import { DataBaseError, Db } from '@open-dy/cloud-db';
/实现一个网络请求类，并提供异步的 send 方法。
class Request {
  async send(action: string, data: string, _: string) {
    const params = Object.assign({}, data, {
      action,
    });
    const res = await axios({
      method: 'post',
      url: '',
      data: params,
    });
    return res?.data?.data || {};
  }
}
let db = new Db(Request);
const res = db.collection('todos').get();
```
