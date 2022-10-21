import { useMutation, useQuery } from "react-query"
import {
  getSslStatus,
  getTwistedDns,
  getTwistedDnsData,
  getWebmonitoringData,
  getWebmonitoring,
  getWebMonitoringDetails,
  getAllWebMonitoringData,
  getWebmonitoringParams,
  deleteWebsite,
  getWhoIsData,
} from "services/api/websiteMonitoring"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetTwistedDnsData = (
  pageNo = "1",
  pageSize = "10",
  fuzzer = "",
  source_dns = "",
  options = {}
) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    [queryKey.GET_TWISTED_DNS, pageNo, pageSize, fuzzer, source_dns],
    getTwistedDnsData,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}
export const useGetTwistedDns = (options = {}) => {
  const { errorToast } = useCustomToast()

  const { data, isLoading } = useQuery(
    queryKey.GET_TWISTED_DNS,
    getTwistedDns,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}

export const useGetWebMonitoringData = (pageNo, options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    [queryKey.GET_WEBMONITORING, pageNo],
    getWebmonitoringData,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}
export const useGetWebMonitoring = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data } = useQuery(queryKey.GET_WEBMONITORING, getWebmonitoring, {
    ...options,
    onError: err => {
      errorToast(err.message)
    },
  })

  return { data }
}

export const useGetSslStatus = (domain, options = {}) => {
  const { data, isLoading, isSuccess } = useQuery(
    [queryKey.GET_SSL_STATUS, domain],
    getSslStatus,
    {
      ...options,
    }
  )
  return { data, isLoading, isSuccess }
}

export const useGetWhoIsData = (domain, options = {}) => {
  const { data, isLoading, isSuccess } = useQuery(
    [queryKey.GET_WHO_IS, domain],
    getWhoIsData,
    {
      ...options,
    }
  )
  return { data, isLoading, isSuccess }
}

export const useGetWebMonitoringDetails = (domain, options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, isSuccess } = useQuery(
    [queryKey.GET_WEB_MONITORING_DETAILS, domain],
    getWebMonitoringDetails,
    {
      ...options,
      onError: err => {
        errorToast(err?.response?.data?.detials)
      },
    }
  )
  return { data: data?.data, isLoading, isSuccess }
}

export const useGetAllWebMonitoringData = (options = {}) => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    [queryKey.GET_ALL_WEBMONITORING_DATA_],
    getAllWebMonitoringData,
    { ...options }
  )
  return { data, isLoading, refetch, isFetching }
}

export const useGetAllWebMonitoringParams = (options = {}) => {
  const { data, isLoading } = useQuery(
    [queryKey.GET_ALL_WEBMONITORING_PARAMS],
    getWebmonitoringParams,
    { ...options }
  )
  return { data, isLoading }
}

export const usedeleteWebsite = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data, refetch } = useMutation(deleteWebsite, {
    mutationKey: queryKey.DELETE_WEBSITE,
    ...options,
    onError: err => {
      errorToast(err.response?.data?.message)
    },
  })

  return { mutate, isLoading, data, refetch }
}
