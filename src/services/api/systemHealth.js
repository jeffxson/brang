import axiosInstance from "services/config"
import * as API from "../url"

export const getSystemHealth = async () => {
  const res = await axiosInstance.get(API.SYSTEM_HEALTH)
  return res.data
}
