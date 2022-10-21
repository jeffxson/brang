import { useMutation } from "react-query"
import {
  changePassword,
  login,
  registerUser,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "services/api/auth"
import { SEND_OTP, VERIFY_OTP } from "services/url"
import {
  CHANGE_PASSWORD,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_PASSWORD,
} from "utils/queryKey"

// POST request
export const useRegisterNewUser = (options = {}) => {
  const { mutate, isLoading } = useMutation(registerUser, {
    mutationKey: REGISTER_USER,
    ...options,
  })

  return { mutate, isLoading }
}

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: LOGIN_USER,
    ...options,
  })

  return { mutate, isLoading }
}

export const useChangePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(changePassword, {
    mutationKey: CHANGE_PASSWORD,
    ...options,
  })

  return { mutate, isLoading }
}

export const useResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(resetPassword, {
    mutationKey: UPDATE_PASSWORD,
    ...options,
  })

  return { mutate, isLoading }
}

export const useSendOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(sendOtp, {
    mutationKey: SEND_OTP,
    ...options,
  })

  return { mutate, isLoading }
}

export const useVerifyOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyOtp, {
    mutationKey: VERIFY_OTP,
    ...options,
  })

  return { mutate, isLoading }
}
