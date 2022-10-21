import axiosInstance from "services/config"
import * as API from "../url"

export const getDashboard = async () => {
  const res = await axiosInstance.get(API.DASHBOARD)
  return res.data?.data
}

export const getPdf = async () => {
  const res = await axiosInstance.get(API.SEND_PDF)
  return res.data?.data
}

export const getMonitoredKeywords = async () => {
  const res = await axiosInstance.get(API.GET_MONITORED_KEYWORDS)
  return res.data?.data || res.data
}

export const getSuggestedKeywords = async () => {
  const res = await axiosInstance.get(API.GET_SUGGESTED_KEYWORDS)
  return res.data?.data || res.data
}

export const deleteSuggestedKeywords = async query => {
  const res = await axiosInstance.delete(API.DELETE_SUGGESTED_KEYWORD(query))
  return res.data
}

export const getLatestKeywords = async () => {
  const res = await axiosInstance.get(API.GET_LATEST_KEYWORD_SEARCH)
  return res.data?.data || res.data
}

export const getTakedownMail = async ({ queryKey }) => {
  const [, case_study, status, priority, from_date, to_date] = queryKey
  const queryString = `?case_study=${case_study}&status=${status}&priority=${priority}&from_date=${from_date}&to_date=${to_date}`
  const res = await axiosInstance.get(
    `${API.FETCH_NAVIGATION_TAKEDOWN}${queryString}`
  )
  return res.data?.data || res.data
}

export const getRaiseIncident = async () => {
  const res = await axiosInstance.get(API.FETCH_NAVIGATION_TAKEDOWN)
  return res.data?.data || res.data
}

export const getRecentDataLeak = async () => {
  const res = await axiosInstance.get(API.RECENT_DATA_LEAK)
  return res.data?.data || res.data
}

export const getJobLists = async () => {
  const res = await axiosInstance.get(API.JOB_SEARCHES)
  return res.data?.data || res.data
}

export const getGoogleNews = async () => {
  const res = await axiosInstance.get(API.GET_GOOGLE_NEWS)
  return res.data?.data || res.data
}
export const getNews = async () => {
  const res = await axiosInstance.get(API.GET_NEWS)
  return res.data?.data || res.data
}

export const getDashboardStats = async () => {
  const res = await axiosInstance.get(API.GET_DASHBOARD_STATS)
  return res.data?.data || res.data
}

export const getPriorityGraph = async () => {
  const res = await axiosInstance.get(API.GET_PRIORITY_GRAPH)
  return res.data?.data || res.data
}

export const getDashboardTrends = async () => {
  const res = await axiosInstance.get(API.GET_TRENDS_DASHBOARD)
  return res.data?.data || res.data
}

export const getWebmonitoringDashboard = async () => {
  const res = await axiosInstance.get(API.GET_WEBMONITORING_DASHBOARD)
  return res.data?.data || res.data
}

export const addDomain = async body => {
  const res = await axiosInstance.post(API.ADD_DOMAINS, body)
  return res.data?.data || res.data
}

export const addNewKeyWords = async body => {
  const res = await axiosInstance.post(API.ADD_KEYWORDS, body)
  return res.data?.data || res.data
}
export const deleteNews = async body => {
  const res = await axiosInstance.post(API.DELETE_NEWS, body)
  return res.data?.data || res.data
}
