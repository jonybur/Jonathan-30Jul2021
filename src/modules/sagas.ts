import { EventChannel } from "redux-saga";
import {
  put,
  call,
  take,
  fork,
  takeEvery,
  select,
  CallEffectDescriptor,
  SimpleEffect,
  SagaReturnType,
} from "redux-saga/effects";
import {
  receiveOrderbookSnapshot,
  receiveOrderbookDelta,
  storeError,
  TOGGLE_FEED_REQUEST,
  KILL_FEED,
  toggleFeedFailure,
  toggleFeedSuccess,
} from "./actions";
import {
  ORDERBOOK_SNAPSHOT,
  ORDERBOOK_DELTA,
  errorChannel,
  orderbookChannel,
  toggleOrderbook,
  simulateOrderbookError,
} from "./exchange";
import { getCurrentProductID } from "./selectors";

export function* rootSaga() {
  yield takeEvery(TOGGLE_FEED_REQUEST, toggleFeed);
  yield takeEvery(KILL_FEED, simulateError);
  yield fork(watchForOrderbookUpdates);
  yield fork(watchForOrderbookErrors);
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

export function* watchForOrderbookErrors(): any {
  const eventChannel = yield call(errorChannel);
  while (true) {
    try {
      const { data } = yield take(eventChannel);
      const { message } = data;
      yield put(storeError(message));
    } catch (err) {
      console.error("socket error:", err);
    }
  }
}

export function* simulateError(): any {
  const productID = yield select(getCurrentProductID);
  yield call(simulateOrderbookError, productID);
}

export function* toggleFeed(): any {
  try {
    const productID = yield select(getCurrentProductID);
    const newProduct = yield call(toggleOrderbook, productID);
    yield put(toggleFeedSuccess(newProduct));
  } catch (error) {
    yield put(toggleFeedFailure());
  }
}
