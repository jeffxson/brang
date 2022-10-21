import axiosInstance from "services/config"
import * as API from "../url"

export const getAdminList = async ({ queryKey }) => {
  const [, query] = queryKey
  const res = await axiosInstance.get(`${API.ADMIN_LIST}?search=${query}`)

  return res.data?.data || res.data
}

export const getSuperUser = async () => {
  const res = await axiosInstance.get(API.GET_SUPERUSER)
  return res.data?.data || res.data
}

export const updateAdminUser = async body => {
  const res = await axiosInstance.patch(`${API.UPDATE_ADMIN_MONITOR}`, body)
  return res.data
}
