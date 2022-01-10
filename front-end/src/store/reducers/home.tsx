import { AnyAction } from "redux";
import * as actionTypes from "@/store/action-types";

export interface HomeState {
  currentCategory: string;
}
const initialState: HomeState = { currentCategory: "all" };

function home(state: HomeState = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    default:
      return state;
      break;
  }
}

export default home;
