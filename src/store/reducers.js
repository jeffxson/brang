import { combineReducers } from "redux"

import User from "./reducer/User"

const rootReducer = combineReducers({
  // public
  User,
})

export default rootReducer
