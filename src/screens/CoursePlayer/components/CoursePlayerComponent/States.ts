import { Dimensions } from 'react-native';
import { Orientation } from '../../../../Utilities';

export const stateConstant = {
  COURSES: 'courses',
  SELECTED_COURSE_INDEX: 'selectedCourseIndex',
  FILTERED_DATA: 'filteredData',
  IS_SEARCHING: 'isSearching',
  ORIENTATION: 'orienation',
  SKIPS: 'skips',
  WIDTH: 'width',
  POPUP_SHOWN: 'popUpShown',
  SELECTED_COURSE_ID: 'selectedCourseId',
  HAS_MORE_DATA: 'hasMoreData',
  IS_USER_SEARCHING: 'isUserSearching',
  LOAD_ALL_COURSES: 'loadAlllCourses',
  INTIAL_STATE: 'intialState',
};

export const intialState = {
  courses: [],
  selectedCourseIndex: 0,
  filteredData: [],
  isSearching: false,
  orienation: Orientation,
  skips: 0,
  width: Dimensions.get('screen').width,
  popUpShown: false,
  selectedCourseId: 0,
  hasMoreData: true,
  isUserSearching: false,
};

export const reducer = (state: any, payload?: any) => {
  switch (payload.type) {
    case stateConstant.COURSES:
      return { ...state, courses: payload.data };
    case stateConstant.LOAD_ALL_COURSES:
      const {
        isSearching,
        hasMoreData,
        isUserSearching,
        courses,
        filteredData,
      } = payload.data;
      return {
        ...state,
        isSearching,
        hasMoreData,
        isUserSearching,
        courses,
        filteredData,
      };
    case stateConstant.SELECTED_COURSE_INDEX:
      return { ...state, selectedCourseIndex: payload.data };
    case stateConstant.FILTERED_DATA:
      return { ...state, filteredData: payload.data };
    case stateConstant.IS_SEARCHING:
      return { ...state, isSearching: payload.data };
    case stateConstant.ORIENTATION:
      return { ...state, orienation: payload.data };
    case stateConstant.SKIPS:
      return { ...state, skips: payload.data };
    case stateConstant.WIDTH:
      return { ...state, width: payload.data };
    case stateConstant.POPUP_SHOWN:
      return { ...state, popUpShown: payload.data };
    case stateConstant.SELECTED_COURSE_ID:
      return { ...state, selectedCourseId: payload.data };
    case stateConstant.HAS_MORE_DATA:
      return { ...state, hasMoreData: payload.data };
    case stateConstant.IS_USER_SEARCHING:
      return { ...state, isUserSearching: payload.data };
    case stateConstant.INTIAL_STATE:
      return { ...intialState };
    default:
      return state;
  }
};
