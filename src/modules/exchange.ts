import { eventChannel } from "redux-saga";

// TODO: use !!raw-loader!
const blob = new Blob([
  `
(function () {
  const connectedPorts = [];
  const socket = new WebSocket("wss://www.cryptofacilities.com/ws/v1");

  socket.addEventListener("open", () => {
    const connectionPackage = JSON.stringify({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: ["PI_XBTUSD"],
    });

    socket.send(connectionPackage);
  });

  socket.addEventListener('message', ({ data }) => {
    const package = JSON.parse(data);
    connectedPorts.forEach(port => port.postMessage(package));
  });

  self.addEventListener('connect', ({ ports }) => {
    const port = ports[0];
    connectedPorts.push(port);

    port.addEventListener('message', ({ data }) => {
      const { action, value } = data;

      if (action === 'send') {
        socket.send(JSON.stringify(value));
      } else if (action === 'unload') {
        const index = connectedPorts.indexOf(port);
        connectedPorts.splice(index, 1);
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

export function orderbookChannel() {
  return eventChannel((emit: any) => {
    worker.port.addEventListener("message", emit);

    return () => {
      worker.port.postMessage({
        action: "unload",
        value: null,
      });
      worker.port.close();
    };
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

export const generateTotals = (orders: any) => {
  const ordersWithTotal: any = [];
  for (let i = 0; i < orders.length; i++) {
    const currentOrder = orders[i];
    const previousOrder = ordersWithTotal[i - 1];
    ordersWithTotal[i] = {
      ...currentOrder,
      total: previousOrder
        ? previousOrder.total + currentOrder.size
        : currentOrder.size,
    };
  }
  return ordersWithTotal;
};
