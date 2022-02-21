import { AnyAction } from "redux";
import LOGIN_TYPES from "@/typings/login-types";
import * as actionTypes from "@/store/action-types";
import { User } from "@/typings/user";


export interface ProfileState {
  loginState: LOGIN_TYPES;
  user: User;
  error: string | null;
}

const initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
};

function profile(state: ProfileState = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.VALIDATE:
      
    default:
      return state;
  }
}

export default profile;
