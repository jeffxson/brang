import axiosInstance from "services/config"
import * as API from "../url"

export const registerUser = async body => {
  const res = await axiosInstance.post(API.REGISTER, body)
  return res.data
}

export const login = async body => {
  const res = await axiosInstance.post(API.LOGIN, body)
  return res.data
}

export const changePassword = async body => {
  const res = await axiosInstance.post(API.CHANGE_PASSWORD, body)
  return res.data
}

export const resetPassword = async body => {
  const res = await axiosInstance.post(API.RESET_PASSWORD, body)
  return res.data
}

export const sendOtp = async body => {
  const res = await axiosInstance.post(API.SEND_OTP, body)
  return res.data
}

export const verifyOtp = async body => {
  const res = await axiosInstance.post(API.VERIFY_OTP, body)
  return res.data
}
