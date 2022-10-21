import {
  CHANGE_PASSWORD_END,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  FETCH_NOTIFICATIONS_SETTING_END,
  FETCH_NOTIFICATIONS_SETTING_ERROR,
  FETCH_NOTIFICATIONS_SETTING_START,
  FETCH_NOTIFICATIONS_SETTING_SUCCESS,
  LOG_OUT_AND_CLEAR,
  UPDATE_NOTIFICATIONS_SETTING_END,
  UPDATE_NOTIFICATIONS_SETTING_ERROR,
  UPDATE_NOTIFICATIONS_SETTING_START,
  UPDATE_NOTIFICATIONS_SETTING_SUCCESS,
} from "../actions/types"

const initialChangePassword = {
  changePasswordLoading: false,
  changePasswordError: false,
  changePasswordSuccess: false,
}

const initialChangeUserImage = {
  changeUserImageLoading: false,
  changeUserImageError: false,
  changeUserImageSuccess: false,
}

const initialFetchNotifications = {
  fetchNotificationsLoading: false,
  fetchNotificationsError: false,
  fetchNotificationsSuccess: false,
}

const initialUpdateNotifications = {
  updateNotificationsLoading: false,
  updateNotificationsError: false,
  updateNotificationsSuccess: false,
}

const initialState = {
  ...initialChangePassword,
  ...initialChangeUserImage,
  ...initialFetchNotifications,
  ...initialUpdateNotifications,
  notificationsSettings: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        ...initialChangePassword,
        changePasswordLoading: true,
      }

    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        ...initialChangePassword,
        changePasswordError: true,
      }

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...initialChangePassword,
        changePasswordSuccess: true,
      }

    case CHANGE_PASSWORD_END:
      return {
        ...state,
        ...initialChangePassword,
      }
    //fetch notifications settings
    case FETCH_NOTIFICATIONS_SETTING_START:
      return {
        ...state,
        ...initialFetchNotifications,
        fetchNotificationsLoading: true,
      }

    case FETCH_NOTIFICATIONS_SETTING_ERROR:
      return {
        ...state,
        ...initialFetchNotifications,
        fetchNotificationsError: true,
      }

    case FETCH_NOTIFICATIONS_SETTING_SUCCESS:
      return {
        ...state,
        ...initialFetchNotifications,
        fetchNotificationsSuccess: true,
        notificationsSettings: action.payload,
      }

    case FETCH_NOTIFICATIONS_SETTING_END:
      return {
        ...state,
        ...initialFetchNotifications,
      }

    //update notifications settings
    case UPDATE_NOTIFICATIONS_SETTING_START:
      return {
        ...state,
        ...initialUpdateNotifications,
        updateNotificationsLoading: true,
      }

    case UPDATE_NOTIFICATIONS_SETTING_ERROR:
      return {
        ...state,
        ...initialUpdateNotifications,
        updateNotificationsError: true,
      }

    case UPDATE_NOTIFICATIONS_SETTING_SUCCESS:
      return {
        ...state,
        ...initialUpdateNotifications,
        updateNotificationsSuccess: true,
      }

    case UPDATE_NOTIFICATIONS_SETTING_END:
      return {
        ...state,
        ...initialUpdateNotifications,
      }

    case LOG_OUT_AND_CLEAR:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
