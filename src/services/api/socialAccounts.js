import axiosInstance from "services/config"
import * as API from "../url"

export const getSocialAccounts = async () => {
  const res = await axiosInstance.get(API.GET_SOCIAL_ACC)
  return res.data
}

export const createSocialAcc = async body => {
  const res = await axiosInstance.post(API.GET_SOCIAL_ACC, body)
  return res.data
}

export const getTwitterTimelines = async () => {
  const res = await axiosInstance.get(API.TWITTER_TIMELINE)
  return res.data
}

export const updateSocialAcc = async query => {
  const res = await axiosInstance.put(API.UPDATE_SOCIAL_ACC(query?.id), {
    handle: query?.handle,
    social_media: query?.social_media,
  })
  return res.data
}

export const deleteSocialAcc = async query => {
  const res = await axiosInstance.delete(API.UPDATE_SOCIAL_ACC(query))
  return res.data
}
