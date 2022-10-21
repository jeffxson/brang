import React from "react"
import axios from "axios"

const CancelToken = axios.CancelToken
/**
 * BrandProtection Server Call.
 *
 */

let baseURL = "http://150.230.48.46:8888/"
if (process.env.NODE_ENV !== "production") {
  baseURL = "http://150.230.48.46:8888/"
}
export const BP = axios.create({
  baseURL,
})

const useBPFetcher = () => {
  const fetcher = React.useCallback(function (type, url, config) {
    let cancel
    const res = BP(url, {
      timeout: 40000,
      timeoutErrorMessage: "custom timeout message",
      ...config,
      method: type,
      cancelToken: new CancelToken(c => {
        cancel = c
      }),
    })

    return {
      cancel,
      response: res
        .then(res => res)
        .catch(err => {
          return Promise.reject(err)
        }),
    }
  }, [])

  return { fetcher }
}

export default useBPFetcher
