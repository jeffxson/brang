import { useMutation } from "react-query"
import { deleteImageData, getImageSearch } from "services/api/imageSearch"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetImageSearch = (options = {}) => {
  const { errorToast } = useCustomToast()

  const { mutate, isLoading, data } = useMutation(getImageSearch, {
    mutationKey: queryKey.GET_IMAGE_SEARCH,
    ...options,
    onError: err => errorToast(err?.response?.data?.message),
  })
  return { mutate, data, isLoading }
}

export const useDeleteImageData = (options = {}) => {
  const { mutate, isLoading, isSuccess } = useMutation(deleteImageData, {
    mutationKey: queryKey.DELETE_IMAGE_DATA,
    ...options,
  })

  return { mutate, isLoading, isSuccess }
}
