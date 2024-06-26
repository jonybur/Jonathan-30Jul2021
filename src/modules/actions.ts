import { action } from "typesafe-actions";
import { OrderbookSnapshot } from "./types";

export const RECEIVE_ORDERBOOK_SNAPSHOT = "Receive Orderbook Snapshot";
export const RECEIVE_ORDERBOOK_DELTA = "Receive Orderbook Delta";
export const CHANGE_GROUP = "Change Group";
export const KILL_FEED = "Kill Feed";
export const STORE_ERROR = "Store Error";
export const EMPTY_ERROR = "Empty Error";

export const TOGGLE_FEED_REQUEST = "Toggle Feed Request";
export const TOGGLE_FEED_SUCCESS = "Toggle Feed Success";
export const TOGGLE_FEED_FAILURE = "Toggle Feed Failure";

export const receiveOrderbookSnapshot = (
  orderbookSnapshot: OrderbookSnapshot
) => action(RECEIVE_ORDERBOOK_SNAPSHOT, { orderbookSnapshot });
export const receiveOrderbookDelta = (orderbookDelta: OrderbookSnapshot) =>
  action(RECEIVE_ORDERBOOK_DELTA, { orderbookDelta });
export const storeError = (errorMessage: string) =>
  action(STORE_ERROR, { errorMessage });
export const changeGroup = (group: number) => action(CHANGE_GROUP, { group });
export const emptyError = () => action(EMPTY_ERROR);
export const killFeed = () => action(KILL_FEED);

export const toggleFeedRequest = () => action(TOGGLE_FEED_REQUEST);
export const toggleFeedSuccess = (newProductID: string) =>
  action(TOGGLE_FEED_SUCCESS, { newProductID });
export const toggleFeedFailure = () => action(TOGGLE_FEED_FAILURE);

export type ToggleFeedRequest = ReturnType<typeof toggleFeedRequest>;
export type KillFeed = ReturnType<typeof killFeed>;
export type ChangeGroup = ReturnType<typeof changeGroup>;
export type ReceiveOrderbookSnapshot = ReturnType<
  typeof receiveOrderbookSnapshot
>;
export type ReceiveOrderbookDelta = ReturnType<typeof receiveOrderbookDelta>;
export type StoreError = ReturnType<typeof storeError>;
export type EmptyError = ReturnType<typeof emptyError>;
export type ToggleFeedSuccess = ReturnType<typeof toggleFeedSuccess>;
