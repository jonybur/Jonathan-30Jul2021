import { action } from "typesafe-actions";

export const RECEIVE_ORDERBOOK_INFORMATION = "Receive Orderbook Information";

export const receiveOrderbookInformation = (orderbookInfo: any) =>
  action(RECEIVE_ORDERBOOK_INFORMATION, { orderbookInfo });
