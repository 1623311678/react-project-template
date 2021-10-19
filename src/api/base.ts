/**
 * @description FPP graphql接口
 */
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BatchHttpLink } from "apollo-link-batch-http"; // createNetworkInterface
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { message } from 'antd';
import { gotoAccountPage } from '../auth/utils'

const linkWithError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    message.error(graphQLErrors[0].message)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions && extensions.code == "UNAUTHENTICATED") {
        // localStorage.setItem("token", ''); // token可能已经失效了,删除之
        gotoAccountPage()
        return;
      }

      if (extensions && extensions.code == "FORBIDDEN") {//访问没有权限的接口，就刷新当前页面
        location.reload();
        return;
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// 有一些操作不需要token
const operationNotNeedAuth = [
  'staffAccept'
]

export const authLink = setContext((operation, prevContext) => {
  const token = localStorage.getItem("token");

  const reg = /token=[a-zA-Z0-9_\-]*/;
  const tokenPair = reg.exec(window.location.href);
  const haveToken = tokenPair && tokenPair[0] // token来自sso

  if (!haveToken && !token && operationNotNeedAuth.indexOf(operation.operationName) < 0) {
    gotoAccountPage()
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `${token}` : "",
      Host: "fei-test.myfunpinpin.top"
    }
  };
});

// FPP apollo client
const cache = new InMemoryCache({
  addTypename: false,
  resultCaching: false,
});
const link = new BatchHttpLink({
  uri: "/admin/internal/web/graphql/core/"
  // uri:'http://dog:7705/graphql/core/'
});

const fppClient = new ApolloClient({
  cache,
  link: linkWithError.concat(authLink).concat(link)
  // link
});

export default fppClient;
