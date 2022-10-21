import { useMutation, useQuery } from "react-query"
import { getYoutubeSearch, deleteYoutubeData } from "services/api/youtube"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetYoutubeSearch = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch, isFetching } = useQuery(
    queryKey.GET_YOUTUBE_SEARCH,
    getYoutubeSearch,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )
  return { data, isLoading, refetch, isFetching }
}

export const useDeleteYoutubeData = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteYoutubeData, {
    mutationKey: queryKey.DELETE_YOUTUBE_DATA,
    ...options,
  })

  return { mutate, isLoading }
}
