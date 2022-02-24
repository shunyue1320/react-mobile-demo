import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import combinedReducer from "./reducers";
import { createReduxHistory, routerMiddleware } from "@/history";

//默认存储引擎是localStorage
const persistConfig = {
  key: "root", //向local里存的时候需要一个key
  storage, //存储引擎
  whitelist: ["cart"], //白名单
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = applyMiddleware(
  routerMiddleware,
  thunk,
  promise,
  logger
)(createStore)(persistedReducer);
export const persistor = persistStore(store);
export const history = createReduxHistory(store);
