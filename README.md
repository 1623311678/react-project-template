# 用到的第三方库
  - [material-ui](https://material-ui.com/zh/getting-started/installation/)

test env
## Getting Started

### Prerequisites

- Node.js 12.12+
- A running instance of [Saleor](https://github.com/mirumee/saleor/).

### 本地开发

```
$ npm i
$ npm start

```

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
