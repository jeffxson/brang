import * as API from "utils/url"
import {
  GET_RAISED_PDF_END,
  GET_RAISED_PDF_ERROR,
  GET_RAISED_PDF_START,
  GET_RAISED_PDF_SUCCESS,
  GET_DARK_WEB_PDF_END,
  GET_DARK_WEB_PDF_START,
  GET_WEBSITE_MONITORING_PDF_START,
  GET_WEBSITE_MONITORING_PDF_SUCCESS,
  GET_WEBSITE_MONITORING_PDF_ERROR,
  GET_WEBSITE_MONITORING_PDF_END,
  GET_TWISTED_DNS_PDF_SEND_END,
  GET_TWISTED_DNS_PDF_SEND_START,
  GET_TWISTED_DNS_PDF_SEND_ERROR,
  GET_TWISTED_DNS_PDF_SEND_SUCCESS,
  GET_TWISTED_DNS_END,
  GET_TWISTED_DNS_PDF_ERROR,
  GET_TWISTED_DNS_PDF_START,
  GET_TWISTED_DNS_PDF_SUCCESS,
  GET_DARK_WEB_PDF_SUCCESS,
  GET_DARK_WEB_PDF_ERROR,
} from "./types"
import { handleResponseError } from "utils/helpers"
import { keyy } from "utils/helpers"

export const getRaisedPdf = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_RAISED_PDF_START })
  fetcher("GET", API.RAISED_PDF, {
    responseType: "blob",
    headers: {
      "Content-type": "application/pdf",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({ type: GET_RAISED_PDF_SUCCESS })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Raised_Events.pdf")
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
      dispatch({ type: GET_RAISED_PDF_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_RAISED_PDF_END })
    })
}

export const getDarkWebPdf = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_DARK_WEB_PDF_START })
  fetcher("GET", API.DARKWEB_PDF, {
    responseType: "blob",
    headers: {
      "Content-type": "application/pdf",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({ type: GET_DARK_WEB_PDF_SUCCESS })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Dark_Web.pdf")
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
      dispatch({ type: GET_DARK_WEB_PDF_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_DARK_WEB_PDF_END })
    })
}

export const getTwistedDnsPdf = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_TWISTED_DNS_PDF_START })
  fetcher("GET", API.TWISTED_PDF, {
    responseType: "blob",
    headers: {
      "Content-type": "application/pdf",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({ type: GET_TWISTED_DNS_PDF_SUCCESS })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Twisted_DNS.pdf")
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
      dispatch({ type: GET_TWISTED_DNS_PDF_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_TWISTED_DNS_END })
    })
}

export const sendTwistedDnsPDF = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_TWISTED_DNS_PDF_SEND_START })
  fetcher("GET", API.TWISTED_PDF_MAIL, {
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
        type: GET_TWISTED_DNS_PDF_SEND_SUCCESS,
        payload: res?.data?.data,
      })
    })
    .catch(err => {
      dispatch({ type: GET_TWISTED_DNS_PDF_SEND_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_TWISTED_DNS_PDF_SEND_END })
    })
}

export const getWebsiteMonitoringPdf = (fetcher, toast) => dispatch => {
  dispatch({ type: GET_WEBSITE_MONITORING_PDF_START })
  fetcher("GET", API.WEBSITE_PDF, {
    responseType: "blob",
    headers: {
      "Content-type": "application/pdf",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({ type: GET_WEBSITE_MONITORING_PDF_SUCCESS })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Web_Monitoring.pdf")
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
      dispatch({ type: GET_WEBSITE_MONITORING_PDF_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: GET_WEBSITE_MONITORING_PDF_END })
    })
}
