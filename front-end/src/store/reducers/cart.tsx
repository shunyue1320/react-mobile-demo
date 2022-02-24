import { AnyAction } from "redux";
import { CartState } from "@/typings/cart";
import * as actionTypes from "@/store/action-types";

const initialState: CartState = [];

function cart(state: CartState = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      const oldIndex = state.findIndex(
        (item) => item.lesson.id === action.payload.id
      );
      if (oldIndex === -1) {
        state.push({ lesson: action.payload, count: 1, checked: false });
      } else {
        state[oldIndex].count += 1;
      }
      return state;

    case actionTypes.REMOVE_CART_ITEM:
      const removeIndex = state.findIndex(
        (item) => item.lesson.id === action.payload
      );
      if (removeIndex !== -1) {
        state.splice(removeIndex, 1);
      }
      return state;

    case actionTypes.CLEAR_CART_ITEMS:
      state.length = 0;
      return state;

    case actionTypes.CHANGE_CART_ITEM_COUNT:
      const editIndex = state.findIndex(
        (item) => item.lesson.id === action.payload.id
      );
      if (editIndex !== -1) {
        state[editIndex].count = action.payload.count;
      }
      return state;

    case actionTypes.CHANGE_CHECKED_CART_ITEMS:
      let checkedIds = action.payload;
      state.forEach((item) => {
        if (checkedIds.includes(item.lesson.id)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      return state;

    case actionTypes.SETTLE:
      state = state.filter((item) => !item.checked);
      return state;
    default:
      return state;
  }
}

export default cart;
