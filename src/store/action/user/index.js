import {
  API_INVOCATION,
  LOGOUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  REGISTER_USER_STEP2,
  REGISTER_USER_STEP3,
} from "../../actionType"
import * as constdata from "../../../utils/constants"
import * as consturl from "../../../utils/url"

/**
 *
 *  get activity details
 */
export const loginUser = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }

  const payload = {
    action: LOGIN_USER,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
      },
    },
    url: consturl.LOGIN,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}

export const logOutUser = (resolve, reject) => {
  const payload = {
    action: LOGOUT_USER,
    method: constdata.GET,
    apiConfig: {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    },
    url: consturl.LOGOUT,
    resolve,
    reject,
  }
  return { type: API_INVOCATION, payload }
}

/**
 *  register user
 */
export const registerUser = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }
  const payload = {
    action: REGISTER_USER,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
      },
    },
    url: consturl.SIGNUP,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}

/**
 *  register user step2
 */
export const registerUserStep2 = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }
  const payload = {
    action: REGISTER_USER_STEP2,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
      },
    },
    url: consturl.SIGNUPTWO,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}

/**
 *  register user step3
 */
export const registerUserStep3 = (_payload, resolve, reject) => {
  const data = _payload.data
  const formData = new FormData()
  const dataKey = Object.keys(data)
  for (let i = 0; i < dataKey.length; i++) {
    formData.append(dataKey[i], data[dataKey[i]])
  }
  const payload = {
    action: REGISTER_USER_STEP3,
    method: constdata.POST,
    apiConfig: {
      headers: {
        "Content-type": "application/json",
      },
    },
    url: consturl.SIGNUPTHREE,
    resolve,
    reject,
    data: formData,
  }
  return { type: API_INVOCATION, payload }
}
