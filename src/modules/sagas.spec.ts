import { expectSaga, SagaType } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { select } from "redux-saga/effects";

import { simulateOrderbookError, toggleOrderbook } from "./exchange";
import { simulateError } from "./sagas";
import { getCurrentProductID } from "./selectors";

const PRODUCT_ID = "product_id";

describe("Sagas", () => {
  describe("simulateError", () => {
    it("should get current product id, then simulate orderbook error", () => {
      return expectSaga(simulateError as SagaType)
        .provide([
          [select(getCurrentProductID), PRODUCT_ID],
          [matchers.call.fn(simulateOrderbookError), "ERROR"],
        ])
        .silentRun();
    });
  });

  describe("toggleFeed", () => {
    it("should", () => {
      return expectSaga(simulateError as SagaType)
        .provide([
          [select(getCurrentProductID), PRODUCT_ID],
          [matchers.call.fn(toggleOrderbook), PRODUCT_ID],
        ])
        .silentRun();
    });
  });
});
