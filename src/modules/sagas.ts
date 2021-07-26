import { put, call, take, fork, takeEvery } from "redux-saga/effects";
import {
  receiveOrderbookSnapshot,
  receiveOrderbookDelta,
  TOGGLE_FEED,
} from "./actions";
import {
  orderbookChannel,
  ORDERBOOK_DELTA,
  ORDERBOOK_SNAPSHOT,
  unsubscribeFromDatafeed,
} from "./exchange";

export function* rootSaga() {
  yield takeEvery(TOGGLE_FEED, toggleFeed);
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

export function* toggleFeed(): any {
  try {
    yield call(unsubscribeFromDatafeed);
  } catch (error) {}
}
