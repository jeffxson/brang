import * as API from "../url"
import { rapidInstance } from "services/config"

export const detectLogo = async body => {
  const res = await rapidInstance.post(API.LOGO_DETECTON, body)
  return res.data
}

export const getVersion = async () => {
  const res = await rapidInstance.get(API.VERSION)
  return res.data
}

export const monitorDomain = async query => {
  const res = await rapidInstance.get(API.MONITOR_DOMAIN(query))
  return res.data
}

export const emotionCheck = async body => {
  const res = await rapidInstance.post(API.EMOTION, body)
  return res.data
}

export const checkScam = async query => {
  const res = await rapidInstance.get(API.SCAM(query))
  return res.data
}

export const getAllUrl = async () => {
  const res = await rapidInstance.get(API.RAPID_GET_ALL)
  return res.data
}

export const getStats = async () => {
  const res = await rapidInstance.get(API.RAPID_GET_STATS)
  return res.data
}

export const socialScan = async body => {
  const res = await rapidInstance.post(API.SOCIAL_SCANNER, body)
  return res.data
}

export const newSocialMedia = async body => {
  const res = await rapidInstance.get(
    `${API.NEW_SEARCH_SOCIAL_MEDIA}?query=${body?.query}`
  )

  return res.data?.data || res.data
}
