### 版本环境要求：

```
 "node": ">=12.12.0",
 "npm": ">=6.11.0"

```

### 本地开发

```
$ npm i
$ npm start

```
run in http://localhost:9004

在 config/webpack.dev.config.js 内修改本地代理的店铺url，随后，本地地址内填写对应的token即可

### 不同的分支名对应不同的环境
- dev: 测试环境, 后端接口为 api-dev,连接测试环境数据库, 各种key为测试key
- master: 测试环境, 后端接口为 api-test,连接测试环境数据库, 各种key为测试key
- pre: 预发布环境, 后端接口为 api-prod,连接正式环境数据库, 各种key为正式环境
- prod: 正式环境, 后端接口为 api-pre,连接正式环境数据库, 各种key为正式环境
-

### 上线
- 直接合并代码到prod分支,会自动触发对应流水线


### 环境变量
- 部署时, 运维会把 DEPLOY_ENV 直接写入, 项目中通过 process.env.DEPLOY_ENV 可以拿到
