import { useMutation } from "react-query"
import { getDataLeaks } from "services/api/dataLeak"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetDataLeak = (options = {}) => {
  const { errorToast, infoToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(getDataLeaks, {
    mutationKey: queryKey.GET_DATA_LEAKS,
    ...options,
    onError: err => {
      err.response.statusText === "Not Found"
        ? infoToast(err.response?.data?.message)
        : errorToast(err.response?.data?.message)
    },
    // onSuccess: () => successToast("Data Found"),
  })

  return { mutate, isLoading, data }
}
