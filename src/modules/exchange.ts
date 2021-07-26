import { eventChannel } from "redux-saga";

const XBT_PRODUCT_ID = "PI_XBTUSD";
const ETH_PRODUCT_ID = "PI_ETHUSD";
const ORDERBOOK_SNAPSHOT = "book_ui_1_snapshot";
const ORDERBOOK_DELTA = "book_ui_1";
export const XBT_GROUPS = [0.5, 1, 2.5];
export const ETH_GROUPS = [0.05, 0.1, 0.25];
let worker: SharedWorker;

// TODO: use !!raw-loader!
const blob = new Blob([
  `
  (function () {
    const XBT_PRODUCT_ID = "PI_XBTUSD";
    const ETH_PRODUCT_ID = "PI_ETHUSD";
    let errored = false;

    const connectedPorts = [];
    const socket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
  
    socket.addEventListener("open", () => {
      const connectionPackage = JSON.stringify({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [XBT_PRODUCT_ID],
      });
  
      socket.send(connectionPackage);
    });
  
    socket.addEventListener("message", ({ data }) => {
      const package = JSON.parse(data);
      console.log({ package });
      connectedPorts.forEach((port) => port.postMessage(package));
    });
  
    self.addEventListener("connect", ({ ports }) => {
      const port = ports[0];
      connectedPorts.push(port);
  
      port.addEventListener("message", async ({ data }) => {
        const { action, value } = data;
  
        try { 
          const newProduct = value === XBT_PRODUCT_ID ? ETH_PRODUCT_ID : XBT_PRODUCT_ID;

          switch (action) {
            case "toggleFeed": {
              const unsubscriptionPackage = JSON.stringify({
                event: "unsubscribe",
                feed: "book_ui_1",
                product_ids: [value],
              });
              const connectionPackage = JSON.stringify({
                event: "subscribe",
                feed: "book_ui_1",
                product_ids: [newProduct],
              });

              await socket.send(unsubscriptionPackage);

              await socket.send(connectionPackage);

              break;
            }

            case "simulateError": {

              const unsubscriptionPackage = JSON.stringify({
                event: errored ? "subscribe" : "unsubscribe",
                feed: "book_ui_1",
                product_ids: [value],
              });

              await socket.send(unsubscriptionPackage);

              errored = !errored;

              if (errored) {
                throw new Error("Simulated Error");
              }

            }

          }

        } catch (error) {
          connectedPorts.forEach((port) => port.postMessage({type: "error", message: error}));
        }
      });
  
      port.start();
    });
  })();
`,
]);

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
  return eventChannel((emit: any) => {
    worker.port.addEventListener("message", (payload: any) => {
      if (payload.data.type === "error") {
        return;
      }
      emit(payload);
    });
    return unloadWorker;
  });
}

function errorChannel() {
  return eventChannel((emit: any) => {
    worker.port.addEventListener("message", (payload: any) => {
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

function simulateOrderbookError(productID: string) {
  worker.port.postMessage({
    action: "simulateError",
    value: productID,
  });
}

function updateOrders(orders: any, deltaOrders: any) {
  if (!deltaOrders) {
    return orders;
  }

  const updatedOrders = { ...orders };
  deltaOrders.forEach((deltaOrder: any) => {
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

function generateHashedOrders(orders: any) {
  const hashedOrders: any = {};
  orders.forEach((ask: any) => {
    const [price, size] = ask;
    hashedOrders[price] = { price, size };
  });
  return hashedOrders;
}

function generateTotals(orders: any, group: number) {
  const ordersWithTotal: any = [];
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
        total: lastOrder.total + currentOrder.size,
      };
    } else {
      ordersWithTotal[ordersWithTotal.length] = {
        ...currentOrder,
        total: lastOrder
          ? lastOrder.total + currentOrder.size
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
