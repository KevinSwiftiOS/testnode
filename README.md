# douyincloud-nodejs-koa-demo
本项目是抖音云平台基于 Nodejs [koa](https://koajs.com/) 框架的开发模版，模版通过使用 Redis 和 MongoDB 实现了简单的 hello-world 功能。\
抖音云平台支持基于 Git 代码和 Docker 镜像部署两种方式。其中，Dockerfile 文件可以参考本项目中的 Dockerfile 文件。
部署在抖音云平台的服务日志需要重定向到标准输出，并在抖音云平台日志功能中查看。

## 目录结构
~~~
.
├── Dockerfile              Dockerfile文件
├── Readme.md               Readme文件
├── src                     源码目录
│ ├── server.ts             应用入口文件
├── run.sh                  容器运行时启动文件
├── package.json            npm 包管理文件
~~~

## 请求方法
前往抖音云托管平台「调试」功能界面，进行请求调试。

## API说明
### `POST /api/set_data_to_redis?key=test`
调用 redis 组件设置数据，其中 key 通过 query 传递，value 在 HTTP request body中传递
### 请求参数
- `value`:`string` 写入redis的数据


### 响应结果
```json
{
    "success": true,
}
```


