import { useQuery } from "react-query"
import {
  getDashboard,
  getGoogleNews,
  getJobLists,
  getLatestKeywords,
  getNews,
  getMonitoredKeywords,
  getRecentDataLeak,
  deleteSuggestedKeywords,
  getTakedownMail,
  getSuggestedKeywords,
  getDashboardStats,
  getWebmonitoringDashboard,
  addNewKeyWords,
  getDashboardTrends,
  getPdf,
  deleteNews,
  addDomain,
  getRaiseIncident,
  getPriorityGraph,
} from "services/api/dashboard"
import { useMutation } from "react-query"
import useCustomToast from "utils/notifications"
import * as queryKey from "utils/queryKey"

export const useGetAllDashboard = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(queryKey.GET_DASHBOARD, getDashboard, {
    ...options,
    onError: err => {
      errorToast(err.message)
    },
  })

  return { data, isLoading }
}

export const useGetPdf = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(queryKey.GET_PDF, getPdf, {
    ...options,
    onError: err => {
      errorToast(err.message)
    },
  })

  return { data, isLoading }
}

export const useGetAllMonitoredKeywords = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_MONITORED_KEYWORDS,
    getMonitoredKeywords,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}

export const useGetAllSuggestedKeywords = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch, isFetching } = useQuery(
    queryKey.GET_SUGGESTED_KEYWORDS,
    getSuggestedKeywords,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch, isFetching }
}

export const useDeleteSuggestedKeyword = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading } = useMutation(deleteSuggestedKeywords, {
    mutationKey: queryKey.DELETE_SUGGESTED_KEYWORD,
    ...options,
    onError: err => errorToast(err.message),
  })

  return { mutate, isLoading }
}

export const useAddNewKeywords = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(addNewKeyWords, {
    mutationKey: queryKey.ADD_NEW_KEYWORDS,
    ...options,
    onError: err => {
      errorToast(err.response?.data?.message)
    },
  })
  return { mutate, isLoading, data }
}

export const useAddDomain = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading, data } = useMutation(addDomain, {
    mutationKey: queryKey.ADD_DOMAIN,
    ...options,
    onError: err => {
      errorToast(err.response?.data?.message)
    },
  })
  return { mutate, isLoading, data }
}

export const useDeleteNews = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { mutate, isLoading } = useMutation(deleteNews, {
    mutationKey: queryKey.DELETE_NEWS,
    ...options,
    onError: err => {
      errorToast(err.response?.data?.message)
    },
  })
  return { mutate, isLoading }
}

export const useGetAllLastestKeywords = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading } = useQuery(
    queryKey.GET_LATEST_KEYWORDS,
    getLatestKeywords,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading }
}
export const useGetTakedownEmail = (
  case_study = "",
  status = "",
  priority = "",
  from_date = "",
  to_date = "",
  options = {}
) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      queryKey.GET_TAKEDOWN_MAIL,
      case_study,
      status,
      priority,
      from_date,
      to_date,
    ],
    getTakedownMail,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, isFetching, refetch }
}

export const useGetRecentDataLeaks = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_RECENT_DATA_LEAK,
    getRecentDataLeak,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}

export const useGetJobSearches = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch, isFetching } = useQuery(
    queryKey.GET_JOB_SEARCHS,
    getJobLists,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch, isFetching }
}

export const useGetGoogleNews = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch, isFetching } = useQuery(
    queryKey.GET_GOOGLE_NEWS,
    getGoogleNews,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch, isFetching }
}

export const useGetNews = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(queryKey.GET_NEWS, getNews, {
    ...options,
    onError: err => {
      errorToast(err.message)
    },
  })

  return { data, isLoading, refetch }
}

export const useGetraisedIncident = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { refetch } = useQuery(queryKey.GET_RAISED_INCIDENT, getRaiseIncident, {
    ...options,
    onError: err => {
      errorToast(err.message)
    },
  })

  return { refetch }
}

export const useGetDashboardStats = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_DASHBOARD_STATS,
    getDashboardStats,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}

export const useGetPriorityGraph = (options = {}) => {
  const { errorToast } = useCustomToast()
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_PRIORITY_GRAPH,
    getPriorityGraph,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )

  return { data, isLoading, refetch }
}

export const useGetWebmonitoringDashboard = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_DASHBOARD_WEBMONITORING,
    getWebmonitoringDashboard,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )
  return { data, isLoading, refetch }
}

export const useGetDashboardTrends = (options = {}) => {
  const { data, isLoading } = useQuery(
    queryKey.GET_TRENDS_DASHBOARD,
    getDashboardTrends,
    {
      ...options,
      onError: err => {
        errorToast(err.message)
      },
    }
  )
  return { data, isLoading }
}
