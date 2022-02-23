import { AnyAction } from "redux";
import * as actionTypes from "@/store/action-types";
import { Slider } from "@/typings/slider";
import { Lesson } from "@/typings/lesson";

export interface Lessons {
  loading: boolean; //是否正在加载课程列表中....
  list: Lesson[]; //课程列表
  hasMore: boolean; //是否后面还有更多的数据
  offset: number; //当前的偏移量
  limit: number; //每页的条数
}
export interface HomeState {
  currentCategory: string;
  sliders: Slider[];
  lessons: Lessons;
}

const initialState: HomeState = {
  currentCategory: "all",
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5,
  },
};

function home(state: HomeState = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case actionTypes.GET_SLIDERS:
      return { ...state, sliders: action.payload.data };
    case actionTypes.SET_LESSONS_LOADING:
      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: action.payload,
        },
      };
    case actionTypes.SET_LESSONS:
      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: false, //当请求回来后，把返回的数据设置到仓库中后，loading=false
          list: [...state.lessons.list, ...action.payload.list],
          hasMore: action.payload.hasMore,
          offset: state.lessons.offset + action.payload.list.length,
        },
      };
    case actionTypes.REFRESH_LESSONS:
      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: false, //当请求回来后，把返回的数据设置到仓库中后，loading=false
          list: action.payload.list,
          hasMore: action.payload.hasMore,
          offset: action.payload.list.length,
        },
      };
    default:
      return state;
  }
}

export default home;
