import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import { Orderbook } from "./components";
import { getConfiguredStore } from "./modules/store";

const store = getConfiguredStore();

ReactDOM.render(
  <Provider store={store}>
    <Orderbook />
  </Provider>,
  document.getElementById("root")
);
