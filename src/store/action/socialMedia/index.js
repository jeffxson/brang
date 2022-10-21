import { API_INVOCATION, SOCIAL_MEDIA } from "../../actionType"
import * as constdata from "../../../utils/constants"
import * as consturl from "../../../utils/url"

/**
 *
 *  social media
 */
export const socialMedia = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }
  const payload = {
    action: SOCIAL_MEDIA,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    },
    url: consturl.SOCIAL_MEDIA,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}
