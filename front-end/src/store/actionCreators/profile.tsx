
import * as actionTypes from "../action-types";
import { validate, register, login } from "@/api/profile";
import { RegisterPayload, RegisterResult, LoginPayload, LoginResult } from '@/typings/user';
import { message } from "antd";
import { push } from "redux-first-history";

const actions = {
  validate() {

  },
  register() {

  },
  login(values: LoginPayload) {
    
  },
  logout() {

  },
  changeAvatar(avatar: string) {

  }
}

export default actions;
