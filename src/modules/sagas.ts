import { put, call, take, fork } from "redux-saga/effects";
import { receiveOrderbookSnapshot, receiveOrderbookDelta } from "./actions";
import {
  orderbookChannel,
  ORDERBOOK_DELTA,
  ORDERBOOK_SNAPSHOT,
} from "./exchange";

export function* rootSaga() {
  yield fork(watchForOrderbookUpdates);
}

export function* watchForOrderbookUpdates(): any {
  const eventChannel = yield call(orderbookChannel);
  while (true) {
    try {
      const { data } = yield take(eventChannel);
      const isSnapshot = !data.event && data.feed === ORDERBOOK_SNAPSHOT;
      const isDelta = !data.event && data.feed === ORDERBOOK_DELTA;
      if (isSnapshot) {
        yield put(receiveOrderbookSnapshot(data));
      } else if (isDelta) {
        yield put(receiveOrderbookDelta(data));
      }
    } catch (err) {
      console.error("socket error:", err);
    }
  }
}
