import axiosInstance from "services/config"
import * as API from "../url"

export const removeJobSearch = async data => {
  const res = await axiosInstance.post(API.REMOVE_JOB_SEARCH, data)
  return res.data?.data || res.data
}
