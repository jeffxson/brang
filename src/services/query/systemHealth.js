import { useQuery } from "react-query"
import { getSystemHealth } from "services/api/systemHealth"
import * as queryKey from "utils/queryKey"

export const useGetSystemHealth = (options = {}) => {
  const { data, isLoading } = useQuery(queryKey.GET_APP_DATA, getSystemHealth, {
    ...options,
  })
  return { data, isLoading }
}
