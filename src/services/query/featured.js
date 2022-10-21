import { useMutation, useQuery } from "react-query"
import {
  checkScam,
  detectLogo,
  emotionCheck,
  getAllUrl,
  getStats,
  getVersion,
  monitorDomain,
  socialScan,
} from "services/api/featured"
import * as queryKey from "utils/queryKey"

export const useDetectLogo = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(detectLogo, {
    mutationKey: queryKey.DETECT_LOGO,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useEmotionCheck = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(emotionCheck, {
    mutationKey: queryKey.EMOTION,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useSocialScan = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(socialScan, {
    mutationKey: queryKey.SOCIAL_SCAN,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useGetVersion = (options = {}) => {
  const { data } = useQuery(queryKey.VERSION, getVersion, { ...options })
  return { data }
}

export const useCheckScam = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(checkScam, {
    mutationKey: queryKey.GET_SCAM,
    ...options,
  })
  return { mutate, data, isLoading }
}

export const useGetAllUrl = (options = {}) => {
  const { data, isLoading } = useQuery(
    queryKey.GET_ALL_SECURITY_URL,
    getAllUrl,
    {
      ...options,
    }
  )
  return { data, isLoading }
}

export const useGetStats = (options = {}) => {
  const { data } = useQuery(queryKey.GET_ALL_SECURITY_STATS, getStats, {
    ...options,
  })
  return { data }
}

export const useMonitorDomain = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(monitorDomain, {
    mutationKey: queryKey.MONITOR_DOMAIN,
    ...options,
  })
  return { mutate, data, isLoading }
}
