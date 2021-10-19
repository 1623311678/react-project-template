import React from "react";
import { render } from "react-dom";
import { Modal } from "antd";
import "antd/dist/antd.min.css";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { setCookie } from "@src/utils/cookie";
import ThemeProvider from "@src/components/Theme";
import "@src/common/styles/common.scss";
import "@assets/fonts/fpp-backend/iconfont.js";
import "@assets/fonts/papaya/iconfont.js";
import { grabToken } from "@src/auth/utils";
import loadable from "@loadable/component";
const FitShopPage = loadable(() =>
  import(
    /* webpackChunkName: "FitShopPage" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "@src/fitshop"
  )
);
// const AcceptInvitationPage = loadable(() =>
//   import(
//     /* webpackChunkName: "AcceptInvitationPage" */
//     /* webpackMode: "lazy" */
//     /* webpackPrefetch: true */
//     /* webpackPreload: true */
//     "@src/acceptInvitation"
//   )
// );
const ThemeNotFount = loadable(() =>
  import(
    /* webpackChunkName: "AcceptInvitationPage" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "@src/fitshop/components/NotFound"
  )
);

const App: React.FC = () => {
  if (window.location.href.indexOf("acceptInvitation") < 0) {
    grabToken();
  }
  setCookie();
  const getConfirmAction = (message = "", callback) => {
    console.log(callback, "callbackcallback");
    Modal.confirm({
      title: "未保存的更改",
      content: "如果退出此页面，任何未保存的更改都将丢失。",
      onOk: () => {
        callback(true);
      },
      onCancel: () => {
        callback(false);
      }
    });
  };

  return (
    <ThemeProvider isDefaultDark={false}>
      <HashRouter getUserConfirmation={getConfirmAction}>
        <Routes />
      </HashRouter>
    </ThemeProvider>
  );
};

const Routes: React.FC = () => {
  return (
    <>
      <Redirect from='/' to="/themes" />
      <Switch>
        <Route exact path={"/themes/:id?"} component={FitShopPage}></Route>
        {/* <Route
          exact
          path={"/acceptInvitation"}
          component={AcceptInvitationPage}
        ></Route> */}
        <Route exact path={"/notFound"} component={ThemeNotFount}></Route>
      </Switch>
    </>
  );
};

render(<App />, document.querySelector("#fitShop-app"));
if (module.hot) {
  module.hot.accept();
}
