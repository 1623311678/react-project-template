import React, { FC, useEffect } from "react"
import { createRoot } from "react-dom/client"
import LayoutRouter from "@src/router"
import { BrowserRouter } from "react-router-dom"
import LayoutMenu from "./menu"
import LayoutHeader from "@src/components/Header"
import store from "./store"
import { Provider, useSelector } from "react-redux"
import Login from "./pages/Login"
import "normalize.css"
import "./app.less"
import "hundun-ui-library-react/dist/hundun-ui-library-react.css"

const App: FC = () => {
  const token = useSelector((state: any) => {
    return state.userInfo.token
  })
  if (token) {
    return (
      <BrowserRouter>
        <LayoutHeader />
        <div style={{ display: "flex" }}>
          <LayoutMenu />
          <LayoutRouter></LayoutRouter>
        </div>
      </BrowserRouter>
    )
  }
  return <Login></Login>
}
const rootDom = document.getElementById("root")
const root = createRoot(rootDom)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
