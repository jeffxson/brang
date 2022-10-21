import React from "react"
import { Route, Redirect } from "react-router-dom"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "../config"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (
        isAuthProtected &&
        !localStorage.getItem(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
      ) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return Layout ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Component {...props} />
      )
    }}
  />
)

export default Authmiddleware
