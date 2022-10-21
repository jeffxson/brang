import {
  UPDATE_USER,
  GET_USER,
  ADD_COMPETITOR,
  GET_GOOOGLE_ID,
  UPDATE_COMPANY_CATEGORY,
  GET_COMPANY_CATEGORY,
} from "../../utils/queryKey"
import {
  updateProfile,
  getUserProfile,
  addCompetitor,
  getGoogleId,
  updateCompanyCategory,
  getCompanyCategory,
} from "../api/settings"
import { useMutation, useQuery } from "react-query"

export const useGetUserProfile = (options = {}) => {
  const { data, isLoading, refetch } = useQuery([GET_USER], getUserProfile, {
    ...options,
  })
  return { data, isLoading, refetch }
}

export const useGetCompanyCategory = (options = {}) => {
  const { data, isLoading } = useQuery(
    [GET_COMPANY_CATEGORY],
    getCompanyCategory,
    {
      ...options,
    }
  )
  return { data, isLoading }
}

export const useGetGoogleId = (location = "", options = {}) => {
  const { data, isLoading } = useQuery(
    [GET_GOOOGLE_ID, location],
    getGoogleId,
    {
      ...options,
    }
  )
  return { data, isLoading }
}

// PATCH request
export const useUpdateProfile = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateProfile, {
    mutationKey: UPDATE_USER,
    ...options,
  })
  return { mutate, isLoading }
}

export const useUpdateCompanyCategory = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateCompanyCategory, {
    mutationKey: UPDATE_COMPANY_CATEGORY,
    ...options,
  })
  return { mutate, isLoading }
}

export const useAddCompetitor = (options = {}) => {
  const { mutate, isLoading } = useMutation(addCompetitor, {
    mutationKey: ADD_COMPETITOR,
    ...options,
  })
  return { mutate, isLoading }
}
