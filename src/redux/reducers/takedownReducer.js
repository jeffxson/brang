import {
  FETCH_TAKEDOWN_MAIL_START,
  FETCH_TAKEDOWN_MAIL_SUCCESS,
  FETCH_TAKEDOWN_MAIL_ERROR,
  FETCH_TAKEDOWN_MAIL_END,
  SEND_TAKEDOWN_MAIL_END,
  SEND_TAKEDOWN_MAIL_ERROR,
  SEND_TAKEDOWN_MAIL_START,
  SEND_TAKEDOWN_MAIL_SUCCESS,
  UPDATE_TAKEDOWN_MAIL_END,
  UPDATE_TAKEDOWN_MAIL_ERROR,
  UPDATE_TAKEDOWN_MAIL_START,
  UPDATE_TAKEDOWN_MAIL_SUCCESS,
  UPDATE_TAKEDOWN_STATUS_END,
  UPDATE_TAKEDOWN_STATUS_ERROR,
  UPDATE_TAKEDOWN_STATUS_START,
  UPDATE_TAKEDOWN_STATUS_SUCCESS,
  FETCH_TAKEDOWN_CHARTDATA_START,
  FETCH_TAKEDOWN_CHARTDATA_END,
  FETCH_TAKEDOWN_CHARTDATA_ERROR,
  FETCH_TAKEDOWN_CHARTDATA_SUCCESS,
  LOG_OUT_AND_CLEAR,
} from "../actions/types"

const initialSendTakedownEmail = {
  sendTakedownEmailLoading: false,
  sendTakedownEmailSuccess: false,
  sendTakedownEmailError: false,
}

const initialFetchTakedownEmail = {
  fetchTakedownEmailLoading: false,
  fetchTakedownEmailError: false,
  fetchTakedownEmailSuccess: false,
}

const initialUpdateTakedownEmail = {
  updateTakedownEmailLoading: false,
  updateTakedownEmailError: false,
  updateTakedownEmailSuccess: false,
}

const initialUpdateTakedownStatus = {
  updateTakedownStatusLoading: false,
  updateTakedownStatusError: false,
  updateTakedownStatusSuccess: false,
}

const initialFetchTakedownChartdata = {
  fetchTakedownChartdataLoading: false,
  fetchTakedownChartdataError: false,
  fetchTakedownChartdataSuccess: false,
}

const initialState = {
  ...initialSendTakedownEmail,
  ...initialFetchTakedownEmail,
  ...initialUpdateTakedownEmail,
  ...initialUpdateTakedownStatus,
  takedowns: [],
  takedownsChartdata: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    //Send takedown email
    case SEND_TAKEDOWN_MAIL_START:
      return {
        ...state,
        ...initialSendTakedownEmail,
        sendTakedownEmailLoading: true,
      }

    case SEND_TAKEDOWN_MAIL_ERROR:
      return {
        ...state,
        ...initialSendTakedownEmail,
        sendTakedownEmailError: true,
      }

    case SEND_TAKEDOWN_MAIL_SUCCESS:
      return {
        ...state,
        ...initialSendTakedownEmail,
        sendTakedownEmailSuccess: true,
      }

    case SEND_TAKEDOWN_MAIL_END:
      return {
        ...state,
        ...initialSendTakedownEmail,
      }

    //Fetch takedown party
    case FETCH_TAKEDOWN_MAIL_START:
      return {
        ...state,
        ...initialFetchTakedownEmail,
        fetchTakedownEmailLoading: true,
      }

    case FETCH_TAKEDOWN_MAIL_ERROR:
      return {
        ...state,
        ...initialFetchTakedownEmail,
        fetchTakedownEmailError: true,
      }

    case FETCH_TAKEDOWN_MAIL_SUCCESS:
      return {
        ...state,
        ...initialFetchTakedownEmail,
        fetchTakedownEmailSuccess: true,
        takedowns: action.payload,
      }

    case FETCH_TAKEDOWN_MAIL_END:
      return {
        ...state,
        ...initialFetchTakedownEmail,
      }

    //Update takedown email
    case UPDATE_TAKEDOWN_MAIL_START:
      return {
        ...state,
        ...initialUpdateTakedownEmail,
        updateTakedownEmailLoading: true,
      }

    case UPDATE_TAKEDOWN_MAIL_ERROR:
      return {
        ...state,
        ...initialUpdateTakedownEmail,
        updateTakedownEmailError: true,
      }

    case UPDATE_TAKEDOWN_MAIL_SUCCESS:
      return {
        ...state,
        ...initialUpdateTakedownEmail,
        updateTakedownEmailSuccess: true,
      }

    case UPDATE_TAKEDOWN_MAIL_END:
      return {
        ...state,
        ...initialUpdateTakedownEmail,
      }

    //Update takedown status
    case UPDATE_TAKEDOWN_STATUS_START:
      return {
        ...state,
        ...initialUpdateTakedownStatus,
        updateTakedownStatusLoading: true,
      }

    case UPDATE_TAKEDOWN_STATUS_ERROR:
      return {
        ...state,
        ...initialUpdateTakedownStatus,
        updateTakedownStatusError: true,
      }

    case UPDATE_TAKEDOWN_STATUS_SUCCESS:
      return {
        ...state,
        ...initialUpdateTakedownStatus,
        updateTakedownStatusSuccess: true,
      }

    case UPDATE_TAKEDOWN_STATUS_END:
      return {
        ...state,
        ...initialUpdateTakedownStatus,
      }

    //Fetch takedown chartdata
    case FETCH_TAKEDOWN_CHARTDATA_START:
      return {
        ...state,
        ...initialFetchTakedownChartdata,
        fetchTakedownChartdataLoading: true,
      }

    case FETCH_TAKEDOWN_CHARTDATA_ERROR:
      return {
        ...state,
        ...initialFetchTakedownChartdata,
        fetchTakedownChartdataError: true,
      }

    case FETCH_TAKEDOWN_CHARTDATA_SUCCESS:
      return {
        ...state,
        ...initialFetchTakedownChartdata,
        fetchTakedownChartdataSuccess: true,
        takedownsChartdata: action.payload,
      }

    case FETCH_TAKEDOWN_CHARTDATA_END:
      return {
        ...state,
        ...initialFetchTakedownChartdata,
      }

    case LOG_OUT_AND_CLEAR:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
