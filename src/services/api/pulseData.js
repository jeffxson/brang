import axiosInstance from "services/config"
import { GET_BBOT, GET_PULSE_DATA } from "services/url"

export const getPulseData = async ({ queryKey }) => {
  const [, query] = queryKey
  const res = await axiosInstance.get(`${GET_PULSE_DATA}?domain=${query}`)
  return res.data?.data || res.data
}

export const getBbot = async ({ queryKey }) => {
  const [, query, type, pageSize, page] = queryKey
  const res = await axiosInstance.get(
    `${GET_BBOT}?domain_name=${query}&type_name=${type}&page_size=${pageSize}&page=${page}`
  )
  return res.data?.data || res.data
}
