import { useQuery, useMutation } from "react-query"
import {
  createSocialAcc,
  deleteSocialAcc,
  getSocialAccounts,
  getTwitterTimelines,
  updateSocialAcc,
} from "services/api/socialAccounts"
import * as queryKey from "utils/queryKey"

export const useGetSocialAcc = (options = {}) => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    queryKey.GET_SOCIAL_ACC,
    getSocialAccounts,
    { ...options }
  )
  return { data, isLoading, refetch, isFetching }
}

export const useGetTwitterTimeline = (options = {}) => {
  const { data, isLoading } = useQuery(
    queryKey.GET_TWITTER_TIMELINE,
    getTwitterTimelines,
    { ...options }
  )
  return { data, isLoading }
}

export const useCreateSocialAcc = (options = {}) => {
  const { mutate, isLoading, data, refetch } = useMutation(createSocialAcc, {
    mutationKey: queryKey.CREATE_SOCIAL_ACC,
    ...options,
  })
  return { mutate, isLoading, data, refetch }
}

export const useDeleteSocialAcc = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteSocialAcc, {
    mutationKey: queryKey.DELETE_SOCIAL_ACC,
    ...options,
  })
  return { mutate, isLoading }
}

export const useUpdateSocialAcc = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateSocialAcc, {
    mutationKey: queryKey.UPDATE_SOCIAL_ACC,
    ...options,
  })

  return { mutate, isLoading }
}
