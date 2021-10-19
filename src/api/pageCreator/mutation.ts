/**
 * @description FPP 首页 请求mutation
 */
import gql from "graphql-tag";

// 创建新页面
export const PageCreate = gql`
  mutation shopSettingPageCreate($input: onlineShopPageInput){
    shopSettingPageCreate(input: $input){
      id
      title
      body
      published
      userErrors {
        code
        field
        message
      }
    }
  }
`;
// 删除页面
export const PageDelete = gql`
  mutation shopSettingPageDelete($input: onlineShopPageInput){
    shopSettingPageDelete(input: $input){
      userErrors {
        code
        field
        message
      }
    }
  }
`;
// 更新页面
export const PageUpdate = gql`
  mutation shopSettingPageUpdate($input: onlineShopPageInput){
    shopSettingPageUpdate(input: $input){
      id
      title
      body
      published
      userErrors {
        code
        field
        message
      }
    }
  }
`;
// 复制页面
export const PageCopy = gql`
  mutation shopSettingPageCopy($input: onlineShopPageCopyInput){
    shopSettingPageCopy(input: $input){
      id
      title
      body
      published
      userErrors {
        code
        field
        message
      }
    }
  }
`;
// 批量控制页面
export const PagesUpdate = gql`
  mutation shopSettingPagesUpdate($input: shopSettingPagesUpdateInput!){
    shopSettingPagesUpdate(input: $input){
      userErrors{
        code
        field
        message
      }
    }
  }
`