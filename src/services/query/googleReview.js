import { GET_REVIEW, UPDATE_GOOGLE_ID } from "../../utils/queryKey"
import { getReview, updateGoogleId } from "../api/googleReview"
import { useQuery, useMutation } from "react-query"

export const useGetReview = (placeId = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_REVIEW, placeId],
    getReview,
    {
      ...options,
    }
  )
  return { data, isLoading, refetch }
}

export const useUpdateGoogleId = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateGoogleId, {
    mutationKey: UPDATE_GOOGLE_ID,
    ...options,
  })
  return { mutate, isLoading }
}
