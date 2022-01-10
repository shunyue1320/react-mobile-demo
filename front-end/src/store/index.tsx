import { applyMiddleware, createStore } from "redux";
import combinedReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createReduxHistory, routerMiddleware } from "@/history";

export const store = applyMiddleware(
  routerMiddleware,
  thunk,
  promise,
  logger
)(createStore)(combinedReducer);
export const history = createReduxHistory(store);
