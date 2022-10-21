import axiosInstance from "services/config"
import * as API from "../url"

export const searchDarkWeb = async body => {
  const res = await axiosInstance.post(API.SEARCH_DARKWEB_DATA, body)
  return res.data?.data || res.data
}
