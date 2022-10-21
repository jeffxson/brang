import { combineReducers } from "redux"
import authReducer from "./authReducer"
import dashboardReducer from "./dashboardReducers"
import takedownReducer from "./takedownReducer"
import settingsReducer from "./settingsReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  takedown: takedownReducer,
  settings: settingsReducer,
})

export default rootReducer
