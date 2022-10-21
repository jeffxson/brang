import { API_INVOCATION, DATA_LEAK } from "../../actionType"
import * as constdata from "../../../utils/constants"
import * as consturl from "../../../utils/url"

/**
 *
 *  data leak
 */
export const dataLeak = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }
  const payload = {
    action: DATA_LEAK,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    },
    url: consturl.DATA_LEAK,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}
