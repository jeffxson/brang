import axiosInstance from "services/config"
import * as API from "../url"

export const getAppData = async ({ queryKey }) => {
  const [, search] = queryKey
  const res = await axiosInstance.get(`${API.GET_APP}?search=${search}`)
  return res.data
}

export const deleteAppData = async query => {
  const res = await axiosInstance.delete(API.DELETE_APP(query))
  return res.data
}
