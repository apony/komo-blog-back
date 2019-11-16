# komo-blog-back

Blog Backend Project【Koa Server and Mongodb Database】

> 技术栈：koa+mongodb

## 介绍

- 此项目为 reant-blog-front 提供接口服务

## 安装依赖

```shell
npm install
```

## 安装 nodemon

```shell
npm i nodemon -g
```

## 运行服务

```shell
npm run server
```

## tips

- 运行端口：http://loaclhost:9000
- 安装 mongodb，q 群有安装教程(723594858),mongoDB 可视化工具：Robo3T
- nodemon 可以检测代码变化，重新运行 node app.js
- 修改 mongodb 端口为 30000，默认为 27017（安装目录找到 mongod.cfg 修改 port 字段即可，然后重启 mongodb 服务）
