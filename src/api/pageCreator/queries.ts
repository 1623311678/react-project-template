/**
 * @description FPP 首页 请求query
 */
import gql from "graphql-tag";

// 获取自建页面列表
export const getPageList = gql`
  query shopSettingPageList($input: onlineShopPageInput){
    shopSettingPageList(input: $input){
      id
      title
      handle
      body
      published
      updatedAt
    }
  }
`;
// 获取自建页面详情
export const getPageDetails = gql`
  query shopSettingPageDetail($input: onlineShopPageInput){
    shopSettingPageDetail(input: $input){
      id
      title
      handle
      body
      published
    }
  }
`;