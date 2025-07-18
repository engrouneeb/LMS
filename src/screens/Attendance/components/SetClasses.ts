import { endpoint } from '../../../components';
import { useDispatch } from 'react-redux';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { error } from '../../../actions/AsyncStorage';
export const getClass = (classes: any) => ({
  type: 'SET_CLASSES',
  classes,
});
export const setPlaneCourses = (data: any) => ({
  type: 'SET_PLANE_COURSES',
  data: data,
});
export const SetAllClasses = () => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  async function getClasses() {
    try {
      var EndPoint: endpoint = ApiEndpoints.Classes;
      let response = await Get(EndPoint);
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
            ...new Set(response.map((x: any) => x.subscriptionName)),
          ];
          Classes.courseClasses = Classes.courseClasses.filter(
            (a: any) => a.length > 0,
          );
          response = Classes;
        }
        return dispatch(getClass(response));
      }
    } catch (err) {
      dispatch(error('Something Went Wrong' || 'ERROR'));
      return err;
    }
  }
  const getCourses = async () => {
    try {
      var EndPoint: endpoint = ApiEndpoints.Courses;
      EndPoint.params = `?searchKeyword=''&skip=0&take=100`;
      let response = await Get(EndPoint);
      let flateResponse = response;
      if (response.error || response.message == 'Network request failed') {
        response.error_description = response.message;
        return dispatch(error(response || 'ERROR'));
      } else {
        if (response.length > 0)
          return dispatch(setPlaneCourses(flateResponse));
        return;
      }
    } catch (err) {
      dispatch(error('Something Went Wrong' || 'ERROR'));
      return err;
    }
  };
  return { getCourses, getClasses };
};
