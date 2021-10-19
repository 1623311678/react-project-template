import { IMessageContext } from "@src/components/messages";
import { UseNotifierResult } from "@src/hooks/useNotifier";
import { commonMessages } from "@src/intl";
import { ApolloError } from "apollo-client";
import { IntlShape } from "react-intl";
import { ACCOUNT_SITE_URL } from "../config";
import { isJwtError, isTokenExpired } from "./errors";

export enum TOKEN_STORAGE_KEY {
  AUTH = "auth",
  CSRF = "csrf"
}

export const getTokens = () => ({
  auth:
    localStorage.getItem(TOKEN_STORAGE_KEY.AUTH) ||
    sessionStorage.getItem(TOKEN_STORAGE_KEY.AUTH),
  refresh:
    localStorage.getItem(TOKEN_STORAGE_KEY.CSRF) ||
    sessionStorage.getItem(TOKEN_STORAGE_KEY.CSRF)
});

export const setTokens = (auth: string, csrf: string, persist: boolean) => {
  if (persist) {
    localStorage.setItem(TOKEN_STORAGE_KEY.AUTH, auth);
    localStorage.setItem(TOKEN_STORAGE_KEY.CSRF, csrf);
  } else {
    sessionStorage.setItem(TOKEN_STORAGE_KEY.AUTH, auth);
    sessionStorage.setItem(TOKEN_STORAGE_KEY.CSRF, csrf);
  }
};

export const setAuthToken = (auth: string, persist: boolean) => {
  if (persist) {
    localStorage.setItem(TOKEN_STORAGE_KEY.AUTH, auth);
  } else {
    sessionStorage.setItem(TOKEN_STORAGE_KEY.AUTH, auth);
  }
};

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY.AUTH);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY.AUTH);
};

export const displayDemoMessage = (
  intl: IntlShape,
  notify: UseNotifierResult
) => {
  notify({
    text: intl.formatMessage(commonMessages.demo)
  });
};

export async function handleQueryAuthError(
  error: ApolloError,
  notify: IMessageContext,
  tokenRefresh: () => Promise<boolean>,
  logout: () => void,
  intl: IntlShape
) {
  if (error.graphQLErrors.some(isJwtError)) {
    if (error.graphQLErrors.every(isTokenExpired)) {
      const success = await tokenRefresh();

      if (!success) {
        logout();
        notify({
          status: "error",
          text: intl.formatMessage(commonMessages.sessionExpired)
        });
      }
    } else {
      logout();
      notify({
        status: "error",
        text: intl.formatMessage(commonMessages.somethingWentWrong)
      });
    }
  } else if (
    !error.graphQLErrors.every(
      err => err.extensions?.exception?.code === "PermissionDenied"
    )
  ) {
    notify({
      status: "error",
      text: intl.formatMessage(commonMessages.somethingWentWrong)
    });
  }
}



// fpp方法

export const gotoAccountPage = () => {
  if (window.location.href.indexOf("localhost") > -1) {
    console.error("本地开发, gotoAccountPage 不执行")
    // 本地开发的地址
    // let ACCOUNT_SITE_URL = "http://localhost:8888/redirect";
    // const fromUrl = encodeURIComponent(window.location.href);
    // window.location.href = `${ACCOUNT_SITE_URL}?fromUrl=${fromUrl}`;
    // 本地开发, 不用跳转到Account站
    return
  }

  const fromUrl = encodeURIComponent(window.location.href);
  window.location.href = `${ACCOUNT_SITE_URL}?fromUrl=${fromUrl}`;
}

/*退出登录*/
export const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = `${ACCOUNT_SITE_URL}/login`;
}


export const grabToken =  async() => {
  const reg = /\?token=[a-zA-Z0-9_\-]*/;
  let tokenPair = reg.exec(window.location.href);
  if (tokenPair && tokenPair[0]) {
    let token = tokenPair[0].split("=")[1];;
    if (token) {
      localStorage.setItem("token", token);
      const destUrl = window.location.href.replace(tokenPair[0], '')
      window.location.replace(destUrl);
    }
  } else {
    const token = localStorage.getItem("token");
    if (token) return;
    gotoAccountPage();
  }
}
