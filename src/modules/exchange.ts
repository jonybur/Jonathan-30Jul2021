import { eventChannel } from "redux-saga";

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
