import { getSliders, getLessons } from "@/api/home";
import * as actionTypes from "../action-types";

const actions = {
  setCurrentCategory(currentCategory: string) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
  },
  getSliders() {
    return {
      type: actionTypes.GET_SLIDERS,
      payload: getSliders()
    }
  },
  getLessons() {
    return function (dispatch: Function, getState: Function) {
      (async function () {
        let { currentCategory, lessons: { hasMore, offset, limit, loading } } = getState().home;
        if (hasMore && !loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          const result = await getLessons(currentCategory, offset, limit);
          dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
        }
      })
    }
  },
  refreshLesson() {
    return function (dispatch: Function, getState: Function) {
      (async function () {
        let { currentCategory, lessons: { hasMore, offset, loading } } = getState().home;
        if (hasMore && !loading) {
          dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
          const result = await getLessons(currentCategory, 0, offset);
          dispatch({ type: actionTypes.REFRESH_LESSONS, payload: result.data });
        }
      })
    }
  }
};

export default actions;
