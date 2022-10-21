import { useMutation, useQuery } from "react-query"
import {
  getSocialMediaPercentage,
  postSocialMediaApi,
  searchSocialMedia,
} from "services/api/socialMedia"
import { newSocialMedia } from "services/api/featured"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const usePostDataLeaks = (options = {}) => {
  const { errorToast, infoToast, successToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(postSocialMediaApi, {
    mutationKey: queryKey.POST_SOCIAL_MEDIA,
    ...options,
    onError: err => {
      if (err?.response?.data?.message === "Data not found") {
        infoToast(err?.response?.data?.message)
      } else {
        errorToast(err?.response?.data?.message)
      }
    },
    onSuccess: () => successToast(),
  })

  return { mutate, isLoading, data }
}

export const useSearchSocialMedia = (options = {}) => {
  const { errorToast, infoToast, successToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(searchSocialMedia, {
    mutationKey: queryKey.SEARCH_SOCIAL_MEDIA,
    ...options,
    onError: err => {
      if (err?.response?.data?.message === "Data not found") {
        infoToast(err?.response?.data?.message)
      } else {
        errorToast(err?.response?.data?.message)
      }
    },
    onSuccess: () => successToast(),
  })

  return { mutate, isLoading, data }
}
export const newSearchSocialMedia = (options = {}) => {
  const { successToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(newSocialMedia, {
    mutationKey: queryKey.NEWPAGES_QUARY,
    ...options,
    onError: err => {
      console.log(err)
    },
    onSuccess: () => successToast(),
  })

  return { mutate, isLoading, data }
}

export const useGetSocialMediaPercentages = (options = {}) => {
  const { errorToast, successToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    [queryKey.SOCIAL_MEDIA_PERCENTAGE],
    getSocialMediaPercentage,
    ...options,
    {
      onError: err => {
        errorToast(err.message)
      },
      onSuccess: () => successToast(),
    }
  )

  return { data, isLoading }
}
