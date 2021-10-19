/**
 * @description FPP 权限 请求query
 */
import gql from "graphql-tag";

// 域名列表
export const getDomain = gql`
  fragment domainItem on Domain {
    id
    domain
    status
    isFpp
    isDefault
    createdAt
  }
  query getDomainList($first: Int) {
    domains(first: $first) {
      edges {
        cursor
        node {
          ...domainItem
        }
      }
    }
    domainRedirect {
      redirect
    }
  }
`;
