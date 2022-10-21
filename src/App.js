import React from "react"

import {
  Switch,
  BrowserRouter as Router,
  Redirect,
  useLocation,
} from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { authProtectedRoutes, publicRoutes } from "./routes"
import Authmiddleware from "./routes/route"
import NonAuthLayout from "./components/Layouts/PageLayout/NonAuthLayout"
import AuthLayout from "./components/Layouts/PageLayout/AuthLayout"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "./config"
import { getLocalStorage } from "./utils/helpers"
import { store } from "./store"
import { setCurrentUser } from "./redux/actions/authActions"

if (
  localStorage.getItem(BRAND_PROTECTION_TOKEN_STORAGE_KEY) &&
  JSON.parse(localStorage.getItem(BRAND_PROTECTION_TOKEN_STORAGE_KEY) || "") !==
    ""
) {
  const { ...data } = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
  store.dispatch(setCurrentUser(data))
}

const App = () => {
  const location = useLocation()
  const { isAuthenticated } = useSelector(state => state.auth)
  const publicRoute = [
    "/",
    "/logout",
    "/login",
    "/forgot-password",
    "/register-step1",
    "/register-step2",
    "/register-step3",
    "/forgot-password",
    "/verify-otp",
    "/change-forgot-password",
  ]

  if (publicRoute.includes(location.pathname) && isAuthenticated) {
    return <Redirect to={{ pathname: "/dashboard" }} />
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              {...{ isAuthenticated }}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={AuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
