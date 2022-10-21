import {
  GET_DASHBOARD_START,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_END,
  ADD_KEYWORDS_SUCCESS,
  ADD_KEYWORDS_END,
  ADD_KEYWORDS_ERROR,
  ADD_KEYWORDS_START,
  ADD_DOMAINS_SUCCESS,
  ADD_DOMAINS_END,
  ADD_DOMAINS_ERROR,
  ADD_DOMAINS_START,
  GET_DASHBOARD_PDF_START,
  GET_DASHBOARD_PDF_ERROR,
  GET_DASHBOARD_PDF_SUCCESS,
  GET_DASHBOARD_PDF_END,
  GET_LATEST_KEYWORDS_ERROR,
  GET_LATEST_KEYWORDS_START,
  GET_LATEST_KEYWORDS_SUCCESS,
  GET_LATEST_KEYWORDS_END,
  GET_MONITORED_KEYWORDS_START,
  GET_MONITORED_KEYWORDS_ERROR,
  GET_MONITORED_KEYWORDS_SUCCESS,
  GET_MONITORED_KEYWORDS_END,
  LOG_OUT_AND_CLEAR,
} from "../actions/types"

const initialDashboardState = {
  dashboardDataLoading: false,
  dashboardDataSuccess: false,
  dashboardDataError: false,
  addKeywordLoading: false,
  addKeywordSuccess: false,
  addKeywordError: false,
  addDomainLoading: false,
  addDomainSuccess: false,
  addDomainError: false,
}

const initialGetDashboardPDF = {
  getDashboardPDFLoading: false,
  getDashboardPDFSuccess: false,
  getDashboardPDFError: false,
}

const initialLatestKeyWordsState = {
  latestKeywordsDataLoading: false,
  getLatestKeywordsError: false,
  getLatestKeywordsSuccess: false,
  addDomainError: false,
}

const initialMonitoredKeyWordsState = {
  monitoredKeywordsLoading: false,
  monitoredKeywordsError: false,
  monitoredKeywordsSuccess: false,
}

const initialState = {
  ...initialDashboardState,
  ...initialGetDashboardPDF,
  ...initialMonitoredKeyWordsState,
  monitoredKeywords: [],
  latestKeywordsSearch: [],
  dashboardFields: {},
  keywords: {},
  domains: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_START:
      return {
        ...state,
        dashboardDataLoading: true,
      }

    case GET_DASHBOARD_ERROR:
      return {
        ...state,
        ...initialDashboardState,
        dashboardDataError: true,
      }

    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        ...initialDashboardState,
        dashboardDataSuccess: true,
        dashboardFields: action.payload,
      }

    case GET_DASHBOARD_END:
      return {
        ...state,
        ...initialDashboardState,
      }

    case ADD_KEYWORDS_START:
      return {
        ...state,
        addKeywordLoading: true,
      }

    case ADD_KEYWORDS_ERROR:
      return {
        ...state,
        ...initialDashboardState,
        addKeywordError: true,
      }

    case ADD_KEYWORDS_SUCCESS:
      return {
        ...state,
        ...initialDashboardState,
        addKeywordSuccess: true,
        keywords: action.payload,
      }

    case ADD_KEYWORDS_END:
      return {
        ...state,
        ...initialDashboardState,
      }

    case ADD_DOMAINS_START:
      return {
        ...state,
        addDomainLoading: true,
      }

    case ADD_DOMAINS_ERROR:
      return {
        ...state,
        ...initialDashboardState,
        addDomainError: true,
      }

    case ADD_DOMAINS_SUCCESS:
      return {
        ...state,
        ...initialDashboardState,
        addDomainSuccess: true,
        domains: action.payload,
      }

    case ADD_DOMAINS_END:
      return {
        ...state,
        ...initialDashboardState,
      }

    case GET_DASHBOARD_PDF_START:
      return {
        ...state,
        ...initialGetDashboardPDF,
        getDashboardPDFLoading: true,
      }

    case GET_DASHBOARD_PDF_ERROR:
      return {
        ...state,
        ...initialGetDashboardPDF,
        getDashboardPDFError: true,
      }

    case GET_DASHBOARD_PDF_SUCCESS:
      return {
        ...state,
        ...initialGetDashboardPDF,
        getDashboardPDFSuccess: true,
      }

    case GET_DASHBOARD_PDF_END:
      return {
        ...state,
        ...initialGetDashboardPDF,
      }

    case GET_LATEST_KEYWORDS_START:
      return {
        ...state,
        latestKeywordsDataLoading: true,
      }

    case GET_LATEST_KEYWORDS_ERROR:
      return {
        ...state,
        ...initialLatestKeyWordsState,
        getLatestKeywordsError: true,
      }

    case GET_LATEST_KEYWORDS_SUCCESS:
      return {
        ...state,
        ...initialLatestKeyWordsState,
        getLatestKeywordsSuccess: true,
        latestKeywordsSearch: action.payload,
      }

    case GET_LATEST_KEYWORDS_END:
      return {
        ...state,
        ...initialLatestKeyWordsState,
      }

    //monitored keywords
    case GET_MONITORED_KEYWORDS_START:
      return {
        ...state,
        monitoredKeywordsLoading: true,
      }

    case GET_MONITORED_KEYWORDS_ERROR:
      return {
        ...state,
        ...initialMonitoredKeyWordsState,
        monitoredKeywordsError: true,
      }

    case GET_MONITORED_KEYWORDS_SUCCESS:
      return {
        ...state,
        ...initialMonitoredKeyWordsState,
        monitoredKeywordsSuccess: true,
        monitoredKeywords: action.payload,
      }

    case GET_MONITORED_KEYWORDS_END:
      return {
        ...state,
        ...initialLatestKeyWordsState,
      }

    case LOG_OUT_AND_CLEAR:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
