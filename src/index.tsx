import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import { App } from "./App";
import { getConfiguredStore } from "./modules/store";

const store = getConfiguredStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
