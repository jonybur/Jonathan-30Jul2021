export const WorkerScript = `(function () {
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
    const dataPackage = JSON.parse(data);
    console.log({ package: dataPackage });
    connectedPorts.forEach((port) => port.postMessage(dataPackage));
  });

  /* eslint-disable no-restricted-globals */ self.addEventListener(
    "connect",
    ({ ports }) => {
      const port = ports[0];
      connectedPorts.push(port);

      port.addEventListener("message", ({ data }) => {
        const { action, value } = data;

        try {
          const newProduct =
            value === XBT_PRODUCT_ID ? ETH_PRODUCT_ID : XBT_PRODUCT_ID;

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

              socket.send(unsubscriptionPackage);

              socket.send(connectionPackage);

              break;
            }

            case "simulateError": {
              const unsubscriptionPackage = JSON.stringify({
                event: errored ? "subscribe" : "unsubscribe",
                feed: "book_ui_1",
                product_ids: [value],
              });

              socket.send(unsubscriptionPackage);

              errored = !errored;

              if (errored) {
                throw new Error("Simulated Error");
              }
              break;
            }

            default: {
              throw new Error("Bad action");
            }
          }
        } catch (error) {
          connectedPorts.forEach((port) =>
            port.postMessage({ type: "error", message: error })
          );
        }
      });

      port.start();
    }
  );
})();`;
