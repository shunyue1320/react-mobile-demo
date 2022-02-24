import produce from 'immer';
import { combineReducers } from 'redux-immer';
import { RouterState } from 'redux-first-history';
import { routerReducer } from '@/history';

import home, { HomeState } from './home';
import cart from './cart';
import { CartState } from '@/typings/cart';
import profile, { ProfileState } from './profile';

const reducers = {
  router: routerReducer,
  home,
  cart,
  profile,
};

export type CombinedState = {
  router: RouterState,
  home: HomeState,
  cart: CartState,
  profile: ProfileState
}

const combinedReducer = combineReducers(produce, reducers);
export default combinedReducer;
