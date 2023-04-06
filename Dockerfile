# 编译 typescript
FROM public-cn-beijing.cr.volces.com/public/base:node-16-alpine as builder

WORKDIR /opt/application/

COPY .  .

USER root

RUN npm install

RUN npm run build

# 生产环境镜像，不安装 devDependencies， 减少部署镜像大小
FROM node:16-alpine

WORKDIR /opt/application/

COPY --from=builder /opt/application/dist ./dist

COPY package.json ./

COPY run.sh ./

USER root

RUN npm install --production

RUN chmod -R 777 /opt/application/run.sh

EXPOSE 8000

CMD /opt/application/run.sh
