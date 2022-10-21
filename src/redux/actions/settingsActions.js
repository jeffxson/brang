import {
  CHANGE_PASSWORD_END,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  FETCH_NOTIFICATIONS_SETTING_END,
  FETCH_NOTIFICATIONS_SETTING_ERROR,
  FETCH_NOTIFICATIONS_SETTING_START,
  FETCH_NOTIFICATIONS_SETTING_SUCCESS,
  UPDATE_NOTIFICATIONS_SETTING_END,
  UPDATE_NOTIFICATIONS_SETTING_ERROR,
  UPDATE_NOTIFICATIONS_SETTING_START,
  UPDATE_NOTIFICATIONS_SETTING_SUCCESS,
} from "./types"
import * as consturl from "../../utils/url"
import { handleResponseError } from "utils/helpers"
import { keyy } from "utils/helpers"

export const changePassword = (data, fetcher, toast) => dispatch => {
  dispatch({ type: CHANGE_PASSWORD_START })
  fetcher("PATCH", consturl.CHANGE_PASSWORD, {
    data,
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      toast({
        title: `${res?.data?.message || "Password changed successfully."}`,
        position: "top-right",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res?.data?.data })
    })
    .catch(err => {
      dispatch({ type: CHANGE_PASSWORD_ERROR, payload: err })
      handleResponseError(err, null, toast)
    })
    .finally(() => {
      dispatch({ type: CHANGE_PASSWORD_END })
    })
}

export const fetchNotificationsSettings = fetcher => dispatch => {
  dispatch({ type: FETCH_NOTIFICATIONS_SETTING_START })
  fetcher("GET", consturl.FETCH_NOTIFICATIONS_SETTINGS, {
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${keyy}`,
    },
  })
    .response.then(res => {
      dispatch({
        type: FETCH_NOTIFICATIONS_SETTING_SUCCESS,
        payload: res?.data,
      })
    })
    .catch(err => {
      dispatch({ type: FETCH_NOTIFICATIONS_SETTING_ERROR, payload: err })
    })
    .finally(() => {
      dispatch({ type: FETCH_NOTIFICATIONS_SETTING_END })
    })
}

export const updateNotificationsSettings =
  (data, fetcher, toast) => dispatch => {
    dispatch({ type: UPDATE_NOTIFICATIONS_SETTING_START })
    fetcher("POST", consturl.FETCH_NOTIFICATIONS_SETTINGS, {
      data,
      headers: {
        "Content-type": "application/json",
        Authorization: `token ${keyy}`,
      },
    })
      .response.then(res => {
        toast({
          title: `${res?.data?.message || "Updated Successfully"}`,
          position: "top-right",
          status: "success",
          duration: 4000,
          isClosable: true,
        })
        dispatch(fetchNotificationsSettings(fetcher))
        dispatch({
          type: UPDATE_NOTIFICATIONS_SETTING_SUCCESS,
          payload: res?.data,
        })
      })
      .catch(err => {
        dispatch({ type: UPDATE_NOTIFICATIONS_SETTING_ERROR, payload: err })
        handleResponseError(err, null, toast)
      })
      .finally(() => {
        dispatch({ type: UPDATE_NOTIFICATIONS_SETTING_END })
      })
  }
