import {
  API_INVOCATION,
  TWISTED_DNS,
  WEBSITE_MONITORING,
} from "../../actionType"
import * as constdata from "../../../utils/constants"
import * as consturl from "../../../utils/url"

export const getWebsiteMonitoringData = (resolve, reject) => {
  const payload = {
    action: WEBSITE_MONITORING,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    },
    url: consturl.WEBSITE_MONITORING,
    resolve,
    reject,
  }
  return { type: API_INVOCATION, payload }
}

/**
 *
 *  twisted DNS
 */
export const getTwistedDNSData = (resolve, reject) => {
  const payload = {
    action: TWISTED_DNS,
    method: constdata.GET,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    },
    url: consturl.TWISTED_DNS,
    resolve,
    reject,
  }
  return { type: API_INVOCATION, payload }
}
