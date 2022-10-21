import { SET_CURRENT_USER, LOG_OUT_AND_CLEAR } from "./types"

export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  }
}

export const logoutAndClear = () => dispatch => {
  dispatch({ type: LOG_OUT_AND_CLEAR })
}
