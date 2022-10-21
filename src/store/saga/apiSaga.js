import { actionChannel, take, fork, call, put } from "redux-saga/effects"
import getAxios from "./axiosAPI"
import { setStopLoader } from "../action/loader"

const pendingRequests = {}

const similarPendingRequestExist = (actionType, url) =>
  pendingRequests[actionType] && pendingRequests[actionType].url === url

function* invokeAPI(action) {
  const { payload } = action
  const {
    method,
    url,
    data,
    apiConfig,
    action: actionType,
    resolve,
    reject,
  } = payload
  try {
    let response = {}
    const api = getAxios()
    switch (method) {
      case "GET": {
        if (similarPendingRequestExist(actionType, url)) {
          throw new Error("Similar axios request detected!")
        } else {
          response = yield call([api, api.get], url, {
            ...apiConfig,
          })
        }
        break
      }
      case "POST":
        response = yield call([api, api.post], url, data, { ...apiConfig })
        break

      case "PUT":
        response = yield call([api, api.put], url, data, { ...apiConfig })
        break

      case "PATCH":
        response = yield call([api, api.patch], url, data, { ...apiConfig })
        break

      case "DELETE":
        response = yield call(
          [api, api.delete],
          url,
          { data },
          { ...apiConfig }
        )
        break

      default:
        throw new Error(`API method ${method} is not supported!`)
    }
    if (
      response.status === Number(200) ||
      response.status === Number(201) ||
      response.status === Number(202)
    ) {
      yield* dispatchFulfilled(action, response.data)
    }
    delete pendingRequests[actionType]
    if (resolve) {
      resolve(response.data)
    }
  } catch (error) {
    if (reject) {
      reject(error.response.data)
    }
  } finally {
    yield put(setStopLoader())
  }
}

function* dispatchFulfilled(action, response) {
  yield put({ type: `${action.payload.action}_SUCCESS`, payload: response })
}

function* apiSaga() {
  const actionQueue = yield actionChannel("API_INVOCATION")
  while (true) {
    const action = yield take(actionQueue)
    yield fork(invokeAPI, action)
  }
}

export { invokeAPI }
export default apiSaga
