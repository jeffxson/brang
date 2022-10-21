import axiosInstance from "services/config"
import { GET_DARKWEB_DATA } from "services/url"

export const getDarkWebData = async () => {
  const res = await axiosInstance.get(GET_DARKWEB_DATA)
  return res.data
}
