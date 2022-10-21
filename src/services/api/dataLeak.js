import axiosInstance from "services/config"
import * as API from "../url"

export const getDataLeaks = async body => {
  const res = await axiosInstance.post(API.DATA_LEAK, body)
  return res.data?.data || res.data
}
