import { useMutation } from "react-query"

import { searchDarkWeb } from "services/api/darkWeb"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useSearchDarkWeb = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(searchDarkWeb, {
    mutationKey: queryKey.GET_DARK_WEB,
    ...options,
    onError: err => {
      err.response.statusText === "Not found"
      errorToast(
        err.response?.data?.details || "Please try again after some time"
      )
    },
  })
  return { mutate, isLoading, data }
}
