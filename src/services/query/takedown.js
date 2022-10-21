import { useMutation, useQuery } from "react-query"
import {
  filterTheftEmail,
  getCompanyDetails,
  getTakedownChart,
  getTakedownChartByCategory,
  sendDataLeakTakedownEmail,
  sendYoutubeTakedownEmail,
  sendJobTakedown,
  sendImageTakedownEmail,
  sendTakedownEmail,
  sendAppTakedownEmail,
  updateTakedownEmail,
  sendDarkwebTakedownEmail,
} from "services/api/takedown"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetTakedownChart = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    queryKey.GET_TAKEDOWN_CHART,
    getTakedownChart,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}

export const useTakedownChartByCategory = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    queryKey.GET_CATEGORY_TAKEDOWN_CHART,
    getTakedownChartByCategory,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}

export const useUpdateTakedownEmail = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading } = useMutation(updateTakedownEmail, {
    mutationKey: queryKey.UPDATE_TAKEDOWN_MAIL,
    ...options,
    onError: err => errorToast(err.message),
  })

  return { mutate, isLoading }
}

export const useUpdateTakedownPriority = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading } = useMutation(updateTakedownEmail, {
    mutationKey: queryKey.UPDATE_TAKEDOWN_MAIL,
    ...options,
    onError: err => errorToast(err.message),
  })

  return { mutate, isLoading }
}

export const useGetCompanyDetails = (options = {}) => {
  const { errorToast } = useCustomToast()

  const { data, isLoading } = useQuery(
    queryKey.GET_COMPANY_DETAILS,
    getCompanyDetails,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}

export const useSendTakedownEmail = (options = {}) => {
  const { errorToast, successToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(sendTakedownEmail, {
    mutationKey: queryKey.SEND_TAKEDOWN_MAIL,
    ...options,
    onSuccess: () => successToast("Email has been sent"),
    onError: err =>
      errorToast(err?.response?.data?.details || "Something went wrong"),
  })

  return { mutate, isLoading, data }
}

export const useSendAppTakedownEmail = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendAppTakedownEmail, {
    mutationKey: queryKey.SEND_APP_TAKEDOWN_MAIL,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useSendDarkwebTakedownEmail = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendDarkwebTakedownEmail, {
    mutationKey: queryKey.SEND_DARKWEB_TAKEDOWN_MAIL,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useSendYoutubeTakedownEmail = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendYoutubeTakedownEmail, {
    mutationKey: queryKey.SEND_YOUTUBE_TAKEDOWN_MAIL,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useSendImageTakedownEmail = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendImageTakedownEmail, {
    mutationKey: queryKey.SEND_IMAGE_TAKEDOWN_MAIL,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useSendDataLeakTakedownEmail = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(sendDataLeakTakedownEmail, {
    mutationKey: queryKey.SEND_DATA_LEAK_TAKEDOWN_MAIL,
    ...options,
    onError: err =>
      errorToast(err?.response?.data?.details || "Something went wrong"),
  })

  return { mutate, isLoading, data }
}

export const useSendJobTakedown = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(sendJobTakedown, {
    mutationKey: queryKey.SEND_JOB_TAKEDOWN,
    ...options,
    onError: err =>
      errorToast(err?.response?.data?.details || "Something went wrong"),
  })

  return { mutate, isLoading, data }
}

export const useFetchTheftUrl = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(filterTheftEmail, {
    mutationKey: queryKey.FILTER_THEFT_EMAIL,
    ...options,
    onError: err =>
      errorToast(err?.response?.data?.details || "Something went wrong"),
  })

  return { mutate, isLoading, data }
}
