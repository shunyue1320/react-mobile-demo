import { AnyAction } from "redux";
export interface CartState {}
const initialState: CartState = {};

function cart(state: CartState = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      break;
  }
}

export default cart;