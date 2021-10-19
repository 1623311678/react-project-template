/**
 * @description FPP 域名变更mutation
 */
import gql from "graphql-tag";

//
export const domainCheck = gql`
  mutation domainCheck($domain: String) {
    domainCheck(domain: $domain) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;
// 域名连接
export const domainConnection = gql`
  mutation domainConnection($domain: String) {
    domainConnection(domain: $domain) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

// 连接状态验证
export const domainVerify = gql`
  mutation domainVerify($domain: String) {
    domainVerify(domain: $domain) {
      status
      record {
        message
        cname
        cnameCurrent
        a
        aCurrent
      }
      userErrors {
        code
        message
        field
      }
    }
  }
`;
// 域名ssl状态
export const domainDnsStatus = gql`
  mutation domainDnsStatus($domain: String) {
    domainDnsStatus(domain: $domain) {
      msg
      userErrors {
        code
        message
        field
      }
    }
  }
`;
// 设置主域名
export const domainSetDefault = gql`
  mutation domainSetDefault($domain: String) {
    domainSetDefault(domain: $domain) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;
// 设置主域名
export const domainSetRedirect = gql`
  mutation domainSetRedirect($redirect: Boolean!) {
    domainSetRedirect(redirect: $redirect) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;
// 域名删除
export const domainDelete = gql`
  mutation domainDelete($domainId: ID!) {
    domainDelete(domainId: $domainId) {
      userErrors {
        message
        code
        field
      }
    }
  }
`;
// 域名添加
export const domainCreate = gql`
  mutation domainCreate($domain: String) {
    domainCreate(domain: $domain) {
      domain {
        id
        status
        createdAt
      }
      userErrors {
        message
        field
        code
      }
    }
  }
`;
