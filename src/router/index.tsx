import React, { Fragment } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import Home from "@src/pages/Home"
import About from "@src/pages/About"
import Users from "@src/pages/Users"
import Users1 from "@src/pages/Users1"
import Users2 from "@src/pages/Users2"
import NotFound from "@src/pages/404"

const routes = [
  { path: "/", compoment: Home },
  { path: "/404", compoment: NotFound },
  { path: "/about", compoment: About },
  { path: "/users", compoment: Users },
  { path: "/users/app1", compoment: Users1 },
  { path: "/users/app2", compoment: Users2 }
]
function AppRouter() {
  return (
    <Fragment>
      <Switch>
        {routes.map((item, index) => (
          <Route
            path={item.path}
            component={item.compoment}
            key={index}
            exact
          />
        ))}
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default AppRouter
