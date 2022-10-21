import { USER_PROFILE_SUCCESS } from "../actionType"

const INITIAL_STATE = {
  user: null,
}
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}
export default user
