/**
 * @description FPP 主题模版 请求query
 */
import gql from "graphql-tag";

// 模版列表
export const queryDecorate = gql`
  query decorate {
    retrieveMould {
        pageInfo{
            hasNextPage
            hasPreviousPage
        }
        edges{
            cursor
            node{
                id
                home
                name
                using
                usingUrl
                displayUrl
                bill
            }
        }
    }
  }
`;
// 存档主题列表
export const fppQueryRecordList = gql`
  query record{
    recordList{
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
//  获取当前主题
export const fppQueryDecorateServing = gql`
  query record{
    decorateServing{
        code
        msg
        data{
            home
            name
            usingUrl
            displayUrl
        }
    }
  }
`;