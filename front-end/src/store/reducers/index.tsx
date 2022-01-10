import { combineReducers } from "redux";
import { RouterState } from "redux-first-history";
import { routerReducer } from "@/history";

import home, { HomeState } from "./home";
import cart, { CartState } from "./cart";
import profile, { ProfileState } from "./profile";

const reducers = {
  router: routerReducer,
  home,
  cart,
  profile,
};

export type CombinedState = {
  router: RouterState;
  home: HomeState;
  cart: CartState;
  profile: ProfileState;
};

const combinedReducer = combineReducers(reducers);

export default combinedReducer;
