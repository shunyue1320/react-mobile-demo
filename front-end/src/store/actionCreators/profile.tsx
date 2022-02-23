import * as actionTypes from "../action-types";
import { validate, register, login } from "@/api/profile";
import {
  RegisterPayload,
  RegisterResult,
  LoginPayload,
  LoginResult,
} from "@/typings/user";
import { message } from "antd";
import { push } from "redux-first-history";

const actions = {
  validate() {
    return {
      type: actionTypes.VALIDATE,
      payload: validate(),
    };
  },
  register(values: RegisterPayload) {
    //因为用了redux-thunk中间件，它可以接收函数并执行函数
    return function (dispatch: Function) {
      (async function () {
        try {
          const result = await register<RegisterResult>(values);
          if (result.success) {
            dispatch(push("/login"));
          } else {
            message.error(result.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      })();
    };
  },
  login(values: LoginPayload) {
    return function (dispatch: Function) {
      (async function () {
        try {
          const result = await login<LoginResult>(values);
          if (result.success) {
            sessionStorage.setItem("access_token", result.data.token);
            dispatch(push("/profile"));
          } else {
            message.error(result.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      })();
    };
  },
  logout() {
    return function (dispatch: Function) {
      sessionStorage.removeItem("access_token");
      dispatch({ type: actionTypes.LOGOUT });
      dispatch(push("/login"));
    };
  },
  changeAvatar(avatar: string) {
    return {
      type: actionTypes.CHANGE_AVATAR,
      payload: avatar,
    };
  },
};

export default actions;
