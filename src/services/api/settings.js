import axiosInstance from "services/config"
import axios from "axios"
import {
  CHANGE_USER_DETAILS,
  GET_USER,
  ADD_COMPETITOR,
  GOOGLE_ID,
  COMPANY_CATEOGORY_SETTINGS,
  GET_COMPANY_CATEGORY,
} from "services/url"

let BASE_URL = "http://150.230.48.46:8888/"
if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://150.230.48.46:8888/"
}
export const getUserProfile = async () => {
  const res = await axiosInstance.get(GET_USER)
  return res.data
}

export const getCompanyCategory = async () => {
  const res = await axiosInstance.get(GET_COMPANY_CATEGORY)
  return res.data
}

export const getGoogleId = async ({ queryKey }) => {
  const [, location] = queryKey
  const res = await axios.get(
    `${BASE_URL}${GOOGLE_ID}?location_name=${location}`
  )
  return res.data
}

export const updateProfile = async body => {
  const res = await axiosInstance.patch(`${CHANGE_USER_DETAILS}`, body)
  return res.data
}

export const updateCompanyCategory = async body => {
  const res = await axiosInstance.post(`${COMPANY_CATEOGORY_SETTINGS}`, body)
  return res.data
}

export const addCompetitor = async body => {
  const res = await axiosInstance.post(`${ADD_COMPETITOR}`, body)
  return res.data
}
