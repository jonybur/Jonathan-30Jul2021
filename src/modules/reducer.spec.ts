import { reducer } from "./reducer";
import { CFOrder, State } from "./types";
import {
  generateHashedOrders,
  updateOrders,
  XBT_GROUPS,
  XBT_PRODUCT_ID,
} from "./exchange";
import {
  ChangeGroup,
  CHANGE_GROUP,
  EmptyError,
  EMPTY_ERROR,
  ReceiveOrderbookDelta,
  ReceiveOrderbookSnapshot,
  RECEIVE_ORDERBOOK_DELTA,
  RECEIVE_ORDERBOOK_SNAPSHOT,
  StoreError,
  STORE_ERROR,
  ToggleFeedSuccess,
  TOGGLE_FEED_SUCCESS,
} from "./actions";

const INITIAL_STATE: State = {
  asks: {},
  bids: {},
  error: undefined,
  group: 0.5,
  groups: XBT_GROUPS,
  productID: XBT_PRODUCT_ID,
};

const CF_ORDER_TEST: CFOrder = [1337, 1338];
const CF_ORDER_TEST2: CFOrder = [1334, 5];
const ASKS_TEST = [CF_ORDER_TEST];
const BIDS_TEST = [CF_ORDER_TEST2];
const ERROR_MESSAGE_TEST = "Error Message";
const GROUP_TEST = 1337;

describe("Reducer", () => {
  describe("on an empty state", () => {
    it("should return the initial state", () => {
      expect(reducer(undefined, {} as any)).toEqual({
        asks: {},
        bids: {},
        error: undefined,
        group: 0.5,
        groups: XBT_GROUPS,
        productID: XBT_PRODUCT_ID,
      });
    });
  });

  describe("RECEIVE_ORDERBOOK_SNAPSHOT", () => {
    it("should handle RECEIVE_ORDERBOOK_SNAPSHOT", () => {
      const receiveOrderbookSnapshot: ReceiveOrderbookSnapshot = {
        type: RECEIVE_ORDERBOOK_SNAPSHOT,
        payload: {
          orderbookSnapshot: { asks: ASKS_TEST, bids: BIDS_TEST },
        },
      };
      expect(reducer(INITIAL_STATE, receiveOrderbookSnapshot)).toEqual({
        ...INITIAL_STATE,
        asks: generateHashedOrders(ASKS_TEST),
        bids: generateHashedOrders(BIDS_TEST),
      });
    });
  });

  describe("RECEIVE_ORDERBOOK_DELTA", () => {
    it("should handle RECEIVE_ORDERBOOK_DELTA", () => {
      const receiveOrderbookDelta: ReceiveOrderbookDelta = {
        type: RECEIVE_ORDERBOOK_DELTA,
        payload: {
          orderbookDelta: { asks: ASKS_TEST, bids: BIDS_TEST },
        },
      };

      const state = {
        ...INITIAL_STATE,
        asks: generateHashedOrders(ASKS_TEST),
        bids: generateHashedOrders(BIDS_TEST),
      };

      expect(reducer(state, receiveOrderbookDelta)).toEqual({
        ...state,
        asks: updateOrders(state.asks, ASKS_TEST),
        bids: updateOrders(state.bids, BIDS_TEST),
      });
    });
  });

  describe("STORE_ERROR", () => {
    it("should handle STORE_ERROR", () => {
      const storeError: StoreError = {
        type: STORE_ERROR,
        payload: {
          errorMessage: ERROR_MESSAGE_TEST,
        },
      };
      expect(reducer(INITIAL_STATE, storeError)).toEqual({
        ...INITIAL_STATE,
        error: ERROR_MESSAGE_TEST,
      });
    });
  });

  describe("EMPTY_ERROR", () => {
    it("should handle EMPTY_ERROR", () => {
      const storeError: EmptyError = {
        type: EMPTY_ERROR,
      };
      expect(
        reducer({ ...INITIAL_STATE, error: ERROR_MESSAGE_TEST }, storeError)
      ).toEqual({
        ...INITIAL_STATE,
        error: undefined,
      });
    });
  });

  describe("TOGGLE_FEED_SUCCESS", () => {
    it("should handle TOGGLE_FEED_SUCCESS", () => {
      const storeError: ToggleFeedSuccess = {
        type: TOGGLE_FEED_SUCCESS,
        payload: {
          newProductID: XBT_PRODUCT_ID,
        },
      };
      expect(reducer(INITIAL_STATE, storeError)).toEqual({
        ...INITIAL_STATE,
        productID: XBT_PRODUCT_ID,
        group: XBT_GROUPS[0],
        groups: XBT_GROUPS,
      });
    });
  });

  describe("CHANGE_GROUP", () => {
    it("should handle TOGGLE_FEED_SUCCESS", () => {
      const storeError: ChangeGroup = {
        type: CHANGE_GROUP,
        payload: {
          group: GROUP_TEST,
        },
      };
      expect(reducer(INITIAL_STATE, storeError)).toEqual({
        ...INITIAL_STATE,
        group: GROUP_TEST,
      });
    });
  });
});
