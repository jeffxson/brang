import axiosInstance from "services/config"
import * as API from "../url"

export const postSocialMediaApi = async body => {
  const res = await axiosInstance.post(API.SOCIAL_MEDIA, body)

  return res.data?.data || res.data
}

export const searchSocialMedia = async body => {
  const res = await axiosInstance.get(
    `${API.SEARCH_SOCIAL_MEDIA}?twitter_handle=${body.twitter_handle}&query=${body?.query}`
  )

  return res.data?.data || res.data
}

export const getSocialMediaPercentage = async () => {
  const res = await axiosInstance.get(API.SOCIAL_MEDIA_PERCENTAGE)
  return res.data?.data || res.data
}
