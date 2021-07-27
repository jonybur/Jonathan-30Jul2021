import {
  CHANGE_GROUP,
  STORE_ERROR,
  RECEIVE_ORDERBOOK_DELTA,
  RECEIVE_ORDERBOOK_SNAPSHOT,
  EMPTY_ERROR,
  TOGGLE_FEED_SUCCESS,
  ReceiveOrderbookSnapshot,
  ReceiveOrderbookDelta,
  ChangeGroup,
  EmptyError,
  StoreError,
  ToggleFeedSuccess,
} from "./actions";
import {
  ETH_GROUPS,
  generateHashedOrders,
  updateOrders,
  XBT_GROUPS,
  XBT_PRODUCT_ID,
} from "./exchange";
import { State } from "./types";

export const INITIAL_STATE: State = {
  asks: {},
  bids: {},
  error: undefined,
  group: 0.5,
  groups: XBT_GROUPS,
  productID: XBT_PRODUCT_ID,
};

type ReducerAction =
  | ReceiveOrderbookSnapshot
  | ReceiveOrderbookDelta
  | StoreError
  | EmptyError
  | ToggleFeedSuccess
  | ChangeGroup;

export const reducer = (
  state: State = INITIAL_STATE,
  action: ReducerAction
): State => {
  switch (action.type) {
    case RECEIVE_ORDERBOOK_SNAPSHOT: {
      const { orderbookSnapshot } = action.payload;
      const { asks, bids } = orderbookSnapshot;

      return {
        ...state,
        asks: generateHashedOrders(asks),
        bids: generateHashedOrders(bids),
      };
    }

    case RECEIVE_ORDERBOOK_DELTA: {
      const { orderbookDelta } = action.payload;
      const { asks, bids } = orderbookDelta;

      return {
        ...state,
        asks: updateOrders(state.asks, asks),
        bids: updateOrders(state.bids, bids),
      };
    }

    case STORE_ERROR: {
      const { errorMessage } = action.payload;
      return { ...state, error: errorMessage };
    }

    case EMPTY_ERROR: {
      return { ...state, error: undefined };
    }

    case TOGGLE_FEED_SUCCESS: {
      const { newProductID } = action.payload;

      const groups = newProductID === XBT_PRODUCT_ID ? XBT_GROUPS : ETH_GROUPS;

      return {
        ...state,
        productID: newProductID,
        group: groups[0],
        groups: groups,
      };
    }

    case CHANGE_GROUP: {
      const { group } = action.payload;
      return { ...state, group };
    }

    default:
      return state;
  }
};
