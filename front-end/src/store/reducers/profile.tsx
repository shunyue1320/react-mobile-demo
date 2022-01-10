import { AnyAction } from "redux";
export interface ProfileState {}
const initialState: ProfileState = {};

function profile(state: ProfileState = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default profile;
