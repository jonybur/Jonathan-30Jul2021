import {
  CHANGE_GROUP,
  RECEIVE_ORDERBOOK_DELTA,
  RECEIVE_ORDERBOOK_SNAPSHOT,
} from "./actions";
import { generateHashedOrders, updateOrders } from "./exchange";

export const INITIAL_STATE: any = {
  asks: [],
  bids: [],
  group: 0.5,
};

export const reducer = (state: any = INITIAL_STATE, action: any): any => {
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

    case CHANGE_GROUP: {
      const { group } = action.payload;
      return { ...state, group };
    }

    default:
      return state;
  }
};
