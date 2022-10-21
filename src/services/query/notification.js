import { useQuery } from "react-query"
import { getUnreadNotifications } from "services/api/notification"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetUnreadNotifications = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_UNREAD_NOTIFICATIONS,
    getUnreadNotifications,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}
