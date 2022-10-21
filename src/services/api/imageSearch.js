import axiosInstance from "services/config"
import * as API from "../url"

export const getImageSearch = async query => {
  const res = await axiosInstance.get(`${API.GOOGLE_VISION}/${query}`)
  return res.data
}

export const deleteImageData = async query => {
  const res = await axiosInstance.delete(API.DELETE_IMAGE(query))
  return res.data
}
