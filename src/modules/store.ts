import { applyMiddleware, compose, createStore } from "redux";
import createSagasMiddleware from "redux-saga";
import { initExchange } from "./exchange";

import { reducer } from "./reducer";
import { rootSaga } from "./sagas";

const isDev = process.env.NODE_ENV === "development";
const anyWindow = window as any;

const composeEnhancers =
  isDev && anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? anyWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagasMiddleware = createSagasMiddleware();

const middleware = applyMiddleware(sagasMiddleware);
const enhancer = composeEnhancers(middleware);

initExchange();

const getConfiguredStore = () => {
  const store = createStore(reducer, enhancer);
  sagasMiddleware.run(rootSaga);
  return store;
};

export type RootState = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof getConfiguredStore>;
export { getConfiguredStore };
