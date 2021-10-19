/**
 * @description FPP 主题模版 请求mutation
 */
import gql from "graphql-tag";

// 模版导入
export const mutationDecorate = gql`
  mutation decorate($mid: Float!) {
    mouldImport(mid: $mid) {
       userErrors{
            field
            message
            code
        }
    }
  }
`;
// 存档主题-重命名
export const fppMutationRecordRename = gql`
  mutation record($id: Float!, $name: String!){
    recordRename(id: $id, name: $name){
        code
        msg
        data{
            id
            home
            createdAt
            updatedAt
            name
            status
            mid
        }
    }
  }
`;
// 存档主题-发布
export const fppMutationRecordPublish = gql`
  mutation record($id: Float!){
    recordPublish(id: $id){
        code
        msg
        data
    }
  }
`;
// 存档主题-删除
export const fppMutationRecordRemove = gql`
  mutation record($id: Float!){
    recordRemove(id: $id){
        code
        msg
        data
    }
  }
`;
