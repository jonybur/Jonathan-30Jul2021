import { RECEIVE_ORDERBOOK_INFORMATION } from "./actions";

export const INITIAL_STATE: any = {
  asks: [],
  bids: [],
};

export const reducer = (state: any = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case RECEIVE_ORDERBOOK_INFORMATION: {
      const { orderbookInfo } = action.payload;
      const { asks, bids } = orderbookInfo;
      return {
        ...state,
        asks: asks ? [...state.asks, ...asks] : state.asks,
        bids: bids ? [...state.bids, ...bids] : state.bids,
      };
    }
    default:
      return state;
  }
};
