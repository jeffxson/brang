import axiosInstance from "services/config"
import * as API from "../url"

export const getYoutubeSearch = async () => {
  const res = await axiosInstance.get(API.YOUTUBE)
  return res.data
}

export const deleteYoutubeData = async query => {
  const res = await axiosInstance.delete(API.DELETE_YOUTUBE(query))
  return res.data
}
