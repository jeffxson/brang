import axiosInstance from "services/config"
import * as API from "../url"

export const getTwistedDnsData = async ({ queryKey }) => {
  const [, pageNo, pageSize, fuzzer, source_dns] = queryKey
  const res = await axiosInstance.get(
    `${API.TWISTED_DNS}?page=${pageNo}&fuzzer=${fuzzer}&source_dns=${source_dns}&page_size=${pageSize}`
  )
  return res.data
}

export const getTwistedDns = async () => {
  const res = await axiosInstance.get(API.TWISTED_DNS)
  return res.data
}

export const getWebmonitoringData = async ({ queryKey }) => {
  const [, pageNo] = queryKey
  const res = await axiosInstance.get(
    `${API.WEBSITE_MONITORING}?page=${pageNo}`
  )
  return res.data
}

export const getWebmonitoring = async () => {
  const res = await axiosInstance.get(API.WEBSITE_MONITORING)
  return res.data
}

export const getSslStatus = async ({ queryKey }) => {
  const [, domain] = queryKey
  const res = await axiosInstance.get(`${API.GET_SSL_STATUS}?domain=${domain}`)
  return res.data
}

export const getWhoIsData = async ({ queryKey }) => {
  const [, domain] = queryKey
  const res = await axiosInstance.get(`${API.GET_WHO_IS}?domain=${domain}`)
  return res.data
}

export const deleteWebsite = async body => {
  const res = await axiosInstance.delete(API.DELETE_WEBSITE, { data: body })
  return res.data?.data || res.data
}

export const getWebMonitoringDetails = async ({ queryKey }) => {
  const [, domain] = queryKey
  const res = await axiosInstance.get(
    `${API.GET_WEBSITE_DATA}?domain=${domain}`
  )
  return res.data
}

export const getAllWebMonitoringData = async () => {
  const res = await axiosInstance.get(API.GET_ALL_WEBMONITORING_DATA)
  return res.data?.data || res.data
}

export const getWebmonitoringParams = async () => {
  const res = await axiosInstance.get(API.GET_ALL_WEBMONITORING_PARAMS)
  return res.data
}

export const getSourceDns = async () => {
  const res = await axiosInstance.get(API.GET_SOURCE_DNS)
  return res.data
}
