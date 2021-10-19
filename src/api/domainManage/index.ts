import * as queries from './queries'
import fppClient from "@src/api/base";

// 请求域名列表
export const getDomainList = () => fppClient
  .query({
      query: queries.getDomain,
      fetchPolicy: "network-only" // 不需要缓存
  })
