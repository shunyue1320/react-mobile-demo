import * as actionTypes from "../action-types";

const actions = {
  setCurrentCategory(currentCategory: string) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
};

export default actions;
