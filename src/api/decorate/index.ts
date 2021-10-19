import fppClient from "@src/api/base";
import { RouteNameEnum } from "@src/fitshop/reducer";
import {
  fetchGlobalConfigQuery,
  fetchPageConfigQuery,
  getDecorateQuery,
  saveGlobalConfigQuery,
  savePageConfigQuery,
  fetchRecordDetail,
} from "@src/api/decorate/queries";

import * as mutations from "./mutations";

interface GetDecorateParams {
  flag: "preview" | "release",
  route?: string | RouteNameEnum,
  config?: object,
  header?: object,
  footer?: object,
  globalConfig?: object,
  record?: number,
}

type updateDecorateParams = GetDecorateParams & {
  decorateData: object,
}

// 旧版本
export const updateDecorate = ({ flag = "preview", decorateData = {}, route = "home" }: updateDecorateParams) => fppClient
    .mutate({
      mutation: mutations.decorateSetMutation,
      variables: {
        config: decorateData,
        flag,
        route
      }
    });

// 旧版本
export const getDecorate = ({ flag = 'release', route = "home" }: GetDecorateParams) => fppClient
    .query({
      query: getDecorateQuery,
      variables: {
        flag,
        route
      },
      fetchPolicy: "network-only",
    })

/**
 * 获取店铺页面配置数据，按照页面进行划分
 *
 * @param route 页面路由
 * @param flag 标志 preview | release
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const fetchPageConfig = (
  { flag = "release", route = "home", record }: GetDecorateParams
) =>
  fppClient
    .query({
      fetchPolicy: "network-only",
      query: fetchPageConfigQuery,
      variables: { flag, route, record },
    });
;

/**
 * 获取全局店铺配置数据，包含 header footer 以及 global 配置
 *
 * @param flag 标志 preview | release
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const fetchGlobalConfig = ({ flag = "release", record }: GetDecorateParams) =>
  fppClient
    .query({
      fetchPolicy: "network-only",
      query: fetchGlobalConfigQuery,
      variables: { flag, record },
    });
;

/**
 * 保存店铺页面配置数据，按照页面进行划分
 *
 * @param route 页面路由
 * @param flag 标志 preview | release
 * @param config 将要保存的页面配置数据
 * @param record 存档主题的 id，用于保存指定存档的数据
 */
export const savePageConfig = (
  { flag = "release", route = "home", config = {}, record }: GetDecorateParams
) =>
  fppClient
    .mutate({
      mutation: savePageConfigQuery,
      variables: { config, flag, route, record },
    });
;

/**
 * 获取全局店铺配置数据，包含 header footer 以及 global 配置
 *
 * @param flag 标志 preview | release
 * @param header 将要保存的 header 数据
 * @param footer 将要保存的 footer 数据
 * @param globalConfig 将要保存的 globalConfig 数据
 * @param record 存档主题的 id，用于保存指定存档的数据
 */
export const saveGlobalConfig = (
  { flag = "release", header = {}, footer = {}, globalConfig = {}, record }: GetDecorateParams
) =>
  fppClient
    .mutate({
      mutation: saveGlobalConfigQuery,
      variables: { flag, footer, globalConfig, header, record },
    });
;

/**
 * 根据 id 获取模板详情数据
 * 
 * @param id 要查询的模板的 id
 */
export const getRecordDetail = (id) => 
fppClient
  .query({
    query: fetchRecordDetail,
    variables: { id },
    fetchPolicy: "network-only",
  });