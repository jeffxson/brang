import axiosInstance from "services/config"
import * as API from "../url"

export const deleteKeyWords = async body => {
  const res = await axiosInstance.delete(API.DELETE_KEYWORDS, { data: body })
  return res.data?.data || res.data
}
