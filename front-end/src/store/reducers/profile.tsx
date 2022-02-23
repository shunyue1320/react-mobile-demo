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
  error: null,
};

function profile(state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGIN_ED, //状态改为成功态
          user: action.payload.data, //用户设置为返回的用户
          error: null,
        };
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UN_LOGIN_ED,
          error: action.payload.errors,
          user: null,
        };
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        loginState: LOGIN_TYPES.UN_LOGIN_ED,
        error: null,
        user: null,
      };
    case actionTypes.CHANGE_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    default:
      return state;
  }
}

export default profile;
