import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

const { routerMiddleware, routerReducer, createReduxHistory } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export { routerMiddleware, routerReducer, createReduxHistory };
