import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "../redux/reducers"

const initialState = {}

const middleware = [thunk]

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// import { createStore, applyMiddleware, compose } from "redux"
// import createSagaMiddleware from "redux-saga"

// import rootReducer from "./reducers"
// import rootSaga from "./sagas"

// const sagaMiddleware = createSagaMiddleware()
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// )
// sagaMiddleware.run(rootSaga)

// export default store
