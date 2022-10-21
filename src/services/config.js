import axios from "axios"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "../config"
import { getLocalStorage, saveTokenLocalstorage } from "utils/helpers"
import { BP } from "../utils/fetcher"

export const rapidInstance = axios.create({
  headers: {
    "X-RapidAPI-Key": "70c4b13130msh4d63f58ab58200ep168686jsnbe8e7bfdbd29",
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
})

let baseURL = "http://150.230.48.46:8888/"
if (process.env.NODE_ENV !== "production") {
  baseURL = "http://150.230.48.46:8888/"
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
})

const onRequest = request => {
  const key = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
  request.headers.Authorization = `token ${key}` || ""
  return request
}

const onRequestError = error => {
  return Promise.reject(error)
}

const onResponse = response => {
  return response
}

const onResponseError = error => {
  const statusCode = error?.response?.status
  if (statusCode === 401) {
    saveTokenLocalstorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY, "")
    setAuthToken("")
    window.location.href = "/login"
  }
  return Promise.reject(error)
}

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosInstance

// come back here
export const setAuthToken = token => {
  if (token) {
    // apply to every  request
    BP.defaults.headers.common["Authorization"] = `token ${token}`
    // BP.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  } else {
    // Delete auth header
    delete BP.defaults.headers.common["Authorization"]
  }
}

export const getToken = () => {
  let allcookies = document.cookie.split(";")
  let token = ""
  for (let i = 0; i < allcookies.length; i++) {
    if (allcookies[i].split("=")[0].trim() === "kees_customer_access_token") {
      token = allcookies[i].split("=")[1]
    }
  }

  return token
}
