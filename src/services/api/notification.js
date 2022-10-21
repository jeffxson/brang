import axiosInstance from "services/config"
import { DELETE_NOTIFICATION, UNREADNOTIFICATIONS } from "services/url"

export const deleteAllNotifications = async () => {
  const res = await axiosInstance.get(DELETE_NOTIFICATION)
  return res
}

export const getUnreadNotifications = async () => {
  const res = await axiosInstance.get(UNREADNOTIFICATIONS)
  return res.data
}
