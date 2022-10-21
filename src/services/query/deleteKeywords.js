import { useMutation } from "react-query"
import { deleteKeyWords } from "services/api/deleteKeywords"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const usedeleteKeywords = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(deleteKeyWords, {
    mutationKey: queryKey.DELETE_KEYWORDS,
    ...options,
    onError: err => {
      errorToast(err.response?.data?.message)
    },
  })

  return { mutate, isLoading, data }
}
