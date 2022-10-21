import { useQuery, useMutation } from "react-query"
import {
  getAdminList,
  getSuperUser,
  updateAdminUser,
} from "services/api/superuser"
import * as queryKey from "utils/queryKey"
import { UPDATE_ADMIN_USER } from "utils/queryKey"

export const useGetAdminList = (query, options = {}) => {
  const { data, isLoading } = useQuery(
    [queryKey.GET_ADMIN_LIST, query],
    getAdminList,
    { ...options }
  )

  return { data, isLoading }
}

export const useGetSuperUser = (options = {}) => {
  const { data, isLoading } = useQuery([queryKey.GET_SUPERUSER], getSuperUser, {
    ...options,
  })

  return { data, isLoading }
}

export const useUpdateAdminUser = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateAdminUser, {
    mutationKey: UPDATE_ADMIN_USER,
    ...options,
  })
  return { mutate, isLoading }
}
