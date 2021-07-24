import { put, call, take, fork } from "redux-saga/effects";
import { receiveOrderbookInformation } from "./actions";
import { orderbookChannel } from "./exchange";

export function* rootSaga() {
  yield fork(watchForOrderbookUpdates);
}

export function* watchForOrderbookUpdates(): any {
  const eventChannel = yield call(orderbookChannel);
  while (true) {
    try {
      const { data } = yield take(eventChannel);
      yield put(receiveOrderbookInformation(data));
    } catch (err) {
      console.error("socket error:", err);
    }
  }
}
