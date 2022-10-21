const { useMutation } = require("react-query")
const { removeJobSearch } = require("services/api/jobSearch")
const { REMOVE_JOB_SEARCH_KEY } = require("utils/queryKey")

export const useRemoveJobSearch = (options = {}) => {
  const { mutate, isLoading, isSuccess } = useMutation(removeJobSearch, {
    mutationKey: REMOVE_JOB_SEARCH_KEY,
    ...options,
  })

  return { mutate, isLoading, isSuccess }
}
