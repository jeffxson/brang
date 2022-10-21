import { all } from "redux-saga/effects"

import apiSaga from "./saga/apiSaga"

export default function* rootSaga() {
  yield all([apiSaga()])
}
