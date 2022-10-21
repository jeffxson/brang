import * as API from "../../utils/url"
import {
  GET_DASHBOARD_START,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_END,
  ADD_KEYWORDS_START,
  ADD_KEYWORDS_ERROR,
  ADD_KEYWORDS_SUCCESS,
  ADD_KEYWORDS_END,
  GET_DASHBOARD_PDF_START,
  GET_DASHBOARD_PDF_SUCCESS,
  GET_DASHBOARD_PDF_END,
  GET_DASHBOARD_PDF_ERROR,
  GET_LATEST_KEYWORDS_SUCCESS,
  GET_LATEST_KEYWORDS_ERROR,
  GET_LATEST_KEYWORDS_END,
  GET_LATEST_KEYWORDS_START,
  GET_MONITORED_KEYWORDS_START,
  GET_MONITORED_KEYWORDS_SUCCESS,
  GET_MONITORED_KEYWORDS_END,
  GET_MONITORED_KEYWORDS_ERROR,
  GET_DASHBOARD_PDF_SEND_START,
  GET_DASHBOARD_PDF_SEND_SUCCESS,
  GET_DASHBOARD_PDF_SEND_ERROR,
  GET_DASHBOARD_PDF_SEND_END,
} from "./types"
import * as consturl from "../../utils/url"
import { getLocalStorage, handleResponseError } from "../../utils/helpers"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "../../config"
import { keyy } from "../../utils/helpers"

export const getDashboard = (fetcher, toast) => dispatch => {
  const { key } = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
  dispatch({ type: GET_DASHBOARD_START })
  fetcher("GET", consturl.DASHBOARD, {
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${key}`,
    },
  })
    .response.then(res => {
      toast({
        title: `${
          res?.data?.message || "Loaded Dashboard Details Successfully."
        }`,
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      dispatch({ type: GET_DASHBOARD_SUCCESS, payload: res?.data?.data })
    })
    .catch(err => {
      dispatch({ type: GET_DASHBOARD_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_DASHBOARD_END })
    })
}

export const addNewKeyWords = (keywords, fetcher, toast) => dispatch => {
  const keywordsToPost =
    keywords.keyword.length === 1
      ? keywords.keyword[0]
      : keywords.keyword.join(", ")
  dispatch({ type: ADD_KEYWORDS_START })
  fetcher("POST", API.ADD_KEYWORDS, {
    data: { keyword: keywordsToPost },
    headers: {
      "Content-type": "application/json",
    },
  })
    .response.then(res => {
      dispatch({ type: ADD_KEYWORDS_SUCCESS })
      toast({
        title: `${res.data.details}`,
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    })
    .catch(err => {
      dispatch({ type: ADD_KEYWORDS_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: ADD_KEYWORDS_END })
    })
}

export const getPDF = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_DASHBOARD_PDF_START })
  fetcher("GET", API.GET_PDF, {
    responseType: "blob",
    headers: {
      "Content-type": "application/pdf",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({ type: GET_DASHBOARD_PDF_SUCCESS })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Brand_Protection.pdf")
      document.body.appendChild(link)
      link.click()

      toast({
        title: "Downloading PDF",
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    })
    .catch(err => {
      dispatch({ type: GET_DASHBOARD_PDF_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_DASHBOARD_PDF_END })
    })
}

export const sendPDF = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_DASHBOARD_PDF_SEND_START })
  fetcher("GET", API.SEND_PDF, {
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      toast({
        title: `${res?.data?.message || "Sent succesfully"}`,
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      dispatch({
        type: GET_DASHBOARD_PDF_SEND_SUCCESS,
        payload: res?.data?.data,
      })
    })
    .catch(err => {
      dispatch({ type: GET_DASHBOARD_PDF_SEND_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_DASHBOARD_PDF_SEND_END })
    })
}

export const getLatestKeywords = (fetcher, toast) => dispatch => {
  const { key } = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
  dispatch({ type: GET_LATEST_KEYWORDS_START })
  fetcher("GET", consturl.GET_LATEST_KEYWORD_SEARCH, {
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${key}`,
    },
  })
    .response.then(res => {
      toast({
        title: `${
          res?.data?.message || "Latest Keyword Details fetched Successfully."
        }`,
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      dispatch({ type: GET_LATEST_KEYWORDS_SUCCESS, payload: res?.data })
    })
    .catch(err => {
      dispatch({ type: GET_LATEST_KEYWORDS_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_LATEST_KEYWORDS_END })
    })
}

export const getMonitoredKeywords = (fetcher, toast) => dispatch => {
  const { key } = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
  dispatch({ type: GET_MONITORED_KEYWORDS_START })
  fetcher("GET", consturl.GET_MONITORED_KEYWORDS, {
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${key}`,
    },
  })
    .response.then(res => {
      toast({
        title: `${
          res?.data?.message || "Latest Keyword Details fetched Successfully."
        }`,
        position: "top-right",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      dispatch({
        type: GET_MONITORED_KEYWORDS_SUCCESS,
        payload: res?.data?.data,
      })
    })
    .catch(err => {
      dispatch({ type: GET_MONITORED_KEYWORDS_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_MONITORED_KEYWORDS_END })
    })
}
