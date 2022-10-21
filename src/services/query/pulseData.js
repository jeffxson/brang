import { useQuery } from "react-query"
import { getBbot, getPulseData } from "services/api/pulseData"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetPulseData = (query, options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    [queryKey.GET_PULSE_DATA, query],
    getPulseData,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}

export const useGetBbot = (
  query = "",
  type = "",
  pageSize = "10",
  page = "1",
  options = {}
) => {
  const { data, isLoading } = useQuery(
    [queryKey.GET_BBOT, query, type, pageSize, page],
    getBbot,
    { ...options }
  )

  return { data, isLoading }
}
