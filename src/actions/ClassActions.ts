import { DataAccess } from '../../data/DAL';
import ApiEndPoint from '../../data/ApiEndpoints/index';
import { error, loading } from './AsyncStorage';
import { endpoint } from '../components';
const { Get, PostSecured } = DataAccess();
export const getClasses = (classes: any) => ({
  type: 'SET_CLASSES',
  classes,
});

export const updateClasses = (index: any, CancelClassId: any) => ({
  type: 'UPDATE_CANCEL_CLASSES',
  index,
  CancelClassId,
});

export const setAllClasses = (
  searchKeyword: any,
  skip: any,
  take: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.Classes;
    EndPoint.params =
      searchKeyword != ''
        ? `?searchKeyword=${searchKeyword}&skip=${skip}&take=${take}`
        : `?searchKeyword&skip=${skip}&take=${take}`;
    let response = await Get(EndPoint);

    dispatch(loading(false));
    if (response.error || response.message == 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      if (response.length > 0) {
        var Classes: any = {
          courseClasses: [],
          courseLevels: [],
        };
        Classes.courseClasses = [
          ...new Set(response.map((x: any) => x.courseClasses)),
        ];
        Classes.courseClasses = Classes.courseClasses.filter(
          (a: any) => a.length > 0,
        );
        Classes.courseLevels = [
          ...new Set(response.map((x: any) => x.courseLevels)),
        ];
        Classes.courseLevels = Classes.courseLevels.filter(
          (a: any) => a.length > 0,
        );
        response = Classes;
      }

      return dispatch(getClasses(response));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const doCancelClass = (
  classorBatchId: any,
  isBatch: any,
  timeId: any,
  date: any,
  makeUpClassId: any,
  index: any,
) => async (dispatch: any) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.DoCanel;
    EndPoint.params = `?ClassorBatchId=${classorBatchId}&isBatch=${isBatch}&TimeId=${timeId}&Date=${date}&MakeUpClassId=${makeUpClassId}`;

    let response = await Get(EndPoint);
    if (response.error || response.message === 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(updateClasses(index, response.cancelClassId));
    }
  } catch (err) {
    dispatch(loading(false));
    return dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
export const RequestMakeupOrCancelClass = (
  classId: string | number,
  timeId: string | number,
  date: string | number,
  dayId: number | undefined,
  reqType: number,
  makeupClassID: number | undefined,
) => async (dispatch: any) => {
  try {
    let params = {
      classId: classId,
      timeId: timeId,
      date: date,
      dayId: dayId,
      type: reqType,
      makeupClassID: Boolean(makeupClassID) ? makeupClassID : 0,
    };
    let response = await PostSecured(
      ApiEndPoint.RequestMakeupOrCancelClass,
      params,
    );
    if (response.error) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    dispatch(loading(false));
    return dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};

export const UndoCancelClass = (CancelID: any, index: any) => async (
  dispatch: any,
) => {
  try {
    var EndPoint: endpoint = ApiEndPoint.UndoCanel;
    EndPoint.params = `?cancelID=${CancelID}`;

    let response = await Get(EndPoint);

    if (response.error || response.message === 'Network request failed') {
      response.error_description = response.message;
      return dispatch(error(response || 'ERROR'));
    } else {
      return dispatch(updateClasses(index, 0));
    }
  } catch (err) {
    dispatch(loading(false));
    dispatch(error('Something Went Wrong' || 'ERROR'));
  }
};
