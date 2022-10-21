import { API_INVOCATION, DASHBOARD } from "../../actionType"
import * as constdata from "../../../utils/constants"
import * as consturl from "../../../utils/url"

/**
 *
 *  dashboard
 */
export const dashboard = (resolve, reject) => {
  const payload = {
    action: DASHBOARD,
    method: constdata.GET,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    },
    url: consturl.DASHBOARD,
    resolve,
    reject,
  }
  return { type: API_INVOCATION, payload }
}
