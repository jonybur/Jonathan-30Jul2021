import { eventChannel } from "redux-saga";

// TODO: use !!raw-loader!
const blob = new Blob([
  `
  (function () {
    const XBT_PRODUCT_ID = "PI_XBTUSD";
    const ETH_PRODUCT_ID = "PI_ETHUSD";
    let xbtMode = true;
  
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
  
        if (action === "unsubscribe") {
          try {
            const unsubscriptionPackage = JSON.stringify({
              event: "unsubscribe",
              feed: "book_ui_1",
              product_ids: [xbtMode ? XBT_PRODUCT_ID : ETH_PRODUCT_ID],
            });
    
            const connectionPackage = JSON.stringify({
              event: "subscribe",
              feed: "book_ui_1",
              product_ids: [xbtMode ? ETH_PRODUCT_ID : XBT_PRODUCT_ID],
            });
    
            xbtMode = !xbtMode;
    
            // throw new Error("failure");

            await socket.send(unsubscriptionPackage);
            await socket.send(connectionPackage);
          } catch (error) {
            connectedPorts.forEach((port) => port.postMessage({type: "error", message: error}));
          }
        }
      });
  
      port.start();
    });
  })();
`,
]);

export const ORDERBOOK_SNAPSHOT = "book_ui_1_snapshot";
export const ORDERBOOK_DELTA = "book_ui_1";

const worker = new SharedWorker(URL.createObjectURL(blob));

worker.port.start();

const unloadWorker = () => {
  worker.port.postMessage({
    action: "unload",
    value: null,
  });
  worker.port.close();
};

export function orderbookChannel() {
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

export function errorChannel() {
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

export function unsubscribeFromDatafeed() {
  worker.port.postMessage({
    action: "unsubscribe",
  });
}

export const updateOrders = (orders: any, deltaOrders: any) => {
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
};

export const generateHashedOrders = (orders: any) => {
  const hashedOrders: any = {};
  orders.forEach((ask: any) => {
    const [price, size] = ask;
    hashedOrders[price] = { price, size };
  });
  return hashedOrders;
};

export const generateTotals = (orders: any, group: number) => {
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
};
