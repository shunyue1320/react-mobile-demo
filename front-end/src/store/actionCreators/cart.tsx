import { push } from "redux-first-history";
import { message } from "antd";

import { Lesson } from "@/typings/lesson";
import * as actionTypes from "../action-types";

const actions = {
  addCartItem(lesson: Lesson) {
    return function (dispatch: Function) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson,
      });
      message.info("添加课程成功");
    };
  },
  removeCartItem(id: string) {
    return {
      type: actionTypes.REMOVE_CART_ITEM,
      payload: id,
    };
  },
  clearCartItems() {
    return {
      type: actionTypes.CLEAR_CART_ITEMS,
    };
  },
  changeCartItemCount(id: string, count: number) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: {
        id,
        count,
      },
    };
  },
  changeCheckedCartItems(checkedIds: string[]) {
    return {
      type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
      payload: checkedIds,
    };
  },
  settle() {
    return function (dispatch: Function) {
      dispatch({
        type: actionTypes.SETTLE,
      });
      dispatch(push("/"));
    };
  },
};

export default actions;
