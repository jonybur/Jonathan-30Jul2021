import { action } from "typesafe-actions";

export const RECEIVE_ORDERBOOK_SNAPSHOT = "Receive Orderbook Snapshot";
export const RECEIVE_ORDERBOOK_DELTA = "Receive Orderbook Delta";

export const receiveOrderbookSnapshot = (orderbookSnapshot: any) =>
  action(RECEIVE_ORDERBOOK_SNAPSHOT, { orderbookSnapshot });
export const receiveOrderbookDelta = (orderbookDelta: any) =>
  action(RECEIVE_ORDERBOOK_DELTA, { orderbookDelta });
