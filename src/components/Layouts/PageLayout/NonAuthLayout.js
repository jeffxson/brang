import React from "react"
import { withRouter } from "react-router-dom"
import NonAuthHeader from "../Header/NonAuthHeader"
import NonAuthFooter from "../Footer"

const NonAuthLayout = props => {
  return (
    <React.Fragment>
      <NonAuthHeader />
      {props.children}
      <NonAuthFooter />
    </React.Fragment>
  )
}

export default withRouter(NonAuthLayout)
