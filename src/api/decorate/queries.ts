import gql from "graphql-tag";

// 旧版本
export const getDecorateQuery = gql`
  query decorate($flag:String!,$route:String!) {
    getDecorates(flag:$flag,route:$route) {
      templateData {
        sections
        indexes
      }
    }
  }
`;

/**
 * 获取店铺页面配置数据，按照页面进行划分
 *
 * @param route 页面路由
 * @param flag 标志 preview | release
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const fetchPageConfigQuery = gql`
  fragment item on DecorateContent {
    id  name  data  type
  }
  
  query getDecorate($route: String, $flag: String, $record: Float) {
    decorate(route: $route, flag: $flag, record: $record) { 
      config { ...item }
    }
  }
`;

/**
 * 获取店铺全局配置数据，包含 header footer 以及 global 配置
 *
 * @param flag 标志 preview | release
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const fetchGlobalConfigQuery = gql`
  fragment item on DecorateContent {
    id  name  data  type
  }
  
  query getDecorateGlobal($flag: String, $record: Float) {
    decorateGlobal(flag: $flag, record: $record) {
      globalConfig { ...item }
      header { ...item } 
      footer { ...item }
    }
  }
`;

/**
 * 保存店铺页面级配置数据，按照页面进行划分
 *
 * @param flag 标志 preview | release
 * @param route 页面路由
 * @param config 将要保存的数据
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const savePageConfigQuery = gql`
  fragment item on DecorateContent {
    id  name  data  type
  }

  mutation decorateUpdate($flag: String, $route: String, $config:[DecorateInput], $record: Float) {
    decorateUpdate(flag: $flag, route: $route, config: $config, record: $record) {
      decorate { config { ...item } }
      userErrors { code field message } 
    }
  }
`;

/**
 * 保存店铺页面级配置数据，包含 header footer 以及 global 配置
 *
 * @param flag 标志 preview | release
 * @param header 将要保存的 header 数据
 * @param footer 将要保存的 footer 数据
 * @param globalConfig 将要保存的 globalConfig 数据
 * @param record 存档主题的 id，用于获取指定存档的数据
 */
export const saveGlobalConfigQuery = gql`
  fragment item on DecorateContent{
    id  name  data  type
  }
  
  mutation decorateGlobalUpdate($flag: String, $header: DecorateInput, $footer: DecorateInput, $globalConfig:[DecorateInput], $record: Float) {
    decorateGlobalUpdate(flag: $flag, header: $header, footer: $footer, globalConfig: $globalConfig, record: $record) {
      decorate {
        header { ...item }
        footer { ...item }     
        globalConfig { ...item }
      }
      userErrors { code field message }
    }
  }
`

/**
 * 根据 id 获取模板详情
 *
 * @param id 要查询的模板的 id
 */
export const fetchRecordDetail = gql`
  query record($id: Int!) {
    recordRetrieve(id: $id) {
      code
      msg
      data { id home createdAt updatedAt name status mid }
    }
  }
`;