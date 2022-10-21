import { useQuery, useMutation } from "react-query"
import { getAppData, deleteAppData } from "services/api/appSearch"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

// GET request
export const useGetAppData = (search = "", options = {}) => {
  const { errorToast } = useCustomToast()

  const { data, isLoading, refetch, isFetching } = useQuery(
    [queryKey.GET_APP_DATA, search],
    getAppData,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )
  return { data, isLoading, refetch, isFetching }
}

//DELETE Request
export const useDeleteAppData = (options = {}) => {
  const { mutate, isLoading, isSuccess } = useMutation(deleteAppData, {
    mutationKey: queryKey.DELETE_APP_DATA,
    ...options,
  })

  return { mutate, isLoading, isSuccess }
}
