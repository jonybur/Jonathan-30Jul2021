import { eventChannel } from "redux-saga";
import { CFOrder, HashedOrders, Order } from "./types";
// @ts-ignore
/* eslint-disable import/no-webpack-loader-syntax */ import WorkerSource from "!!raw-loader!./worker";

const XBT_PRODUCT_ID = "PI_XBTUSD";
const ETH_PRODUCT_ID = "PI_ETHUSD";
const ORDERBOOK_SNAPSHOT = "book_ui_1_snapshot";
const ORDERBOOK_DELTA = "book_ui_1";
export const XBT_GROUPS = [0.5, 1, 2.5];
export const ETH_GROUPS = [0.05, 0.1, 0.25];
let worker: SharedWorker;

const blob = new Blob([WorkerSource]);

function initExchange() {
  worker = new SharedWorker(URL.createObjectURL(blob));
  worker.port.start();
}

function unloadWorker() {
  worker.port.postMessage({
    action: "unload",
  });
  worker.port.close();
}

function orderbookChannel() {
  return eventChannel((emit) => {
    worker.port.addEventListener("message", (payload) => {
      if (payload.data.type === "error") {
        return;
      }
      emit(payload);
    });
    return unloadWorker;
  });
}

function errorChannel() {
  return eventChannel((emit) => {
    worker.port.addEventListener("message", (payload) => {
      if (payload.data.type !== "error") {
        return;
      }
      emit(payload);
    });
    return unloadWorker;
  });
}

function toggleOrderbook(productID: string) {
  worker.port.postMessage({
    action: "toggleFeed",
    value: productID,
  });

  return productID === XBT_PRODUCT_ID ? ETH_PRODUCT_ID : XBT_PRODUCT_ID;
}

function simulateOrderbookError(productID: string): void {
  worker.port.postMessage({
    action: "simulateError",
    value: productID,
  });
}

function updateOrders(orders: HashedOrders, deltaOrders: CFOrder[]) {
  if (!deltaOrders) {
    return orders;
  }

  const updatedOrders = { ...orders };
  deltaOrders.forEach((deltaOrder: CFOrder) => {
    const [price, size] = deltaOrder;
    if (updatedOrders[price] && size === 0) {
      delete updatedOrders[price];
    }

    if (size > 0) {
      // adds or updates value
      updatedOrders[price] = { price, size };
    }
  });

  return updatedOrders;
}

function generateHashedOrders(orders: CFOrder[]): HashedOrders {
  const hashedOrders: HashedOrders = {};
  orders.forEach((order: CFOrder) => {
    const [price, size] = order;
    hashedOrders[price] = { price, size };
  });
  return hashedOrders;
}

function generateTotals(orders: Order[], group: number): Order[] {
  const ordersWithTotal: Order[] = [];
  for (let i = 0; i < orders.length; i++) {
    const currentOrder = orders[i];
    const lastOrder = ordersWithTotal[ordersWithTotal.length - 1];

    if (Number(group) === 1) {
      currentOrder.price = Number(currentOrder.price.toFixed(0));
    }

    if (
      i > 0 &&
      lastOrder &&
      Math.abs(lastOrder.price - currentOrder.price) < group
    ) {
      ordersWithTotal[ordersWithTotal.length - 1] = {
        ...lastOrder,
        total: (lastOrder.total as number) + currentOrder.size,
      };
    } else {
      ordersWithTotal[ordersWithTotal.length] = {
        ...currentOrder,
        total: lastOrder
          ? (lastOrder.total as number) + currentOrder.size
          : currentOrder.size,
      };
    }
  }
  return ordersWithTotal;
}

export {
  initExchange,
  orderbookChannel,
  errorChannel,
  toggleOrderbook,
  simulateOrderbookError,
  updateOrders,
  generateHashedOrders,
  generateTotals,
  XBT_PRODUCT_ID,
  ETH_PRODUCT_ID,
  ORDERBOOK_SNAPSHOT,
  ORDERBOOK_DELTA,
};
