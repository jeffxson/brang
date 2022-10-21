import { useQuery } from "react-query"
import { getDarkWebData } from "services/api/darkWebData"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetDarkWebData = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_DARKWEB_DATA,
    getDarkWebData,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}
