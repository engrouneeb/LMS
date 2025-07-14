import { endpoint } from 'components';
import { useDispatch } from 'react-redux';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  coursePlayerFailed,
  coursePlayerSuccess,
} from '../../../actions/CoursePlayerAction';
export const useLoadCourses = () => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  const getCourse = () => {
    let url: endpoint = ApiEndpoints.GetCoursePlayerContent;
    url.params = `?Take=${10}&Skip=${0}`;
    Get(url)
      .then((res: any) => {
        if (res)
          return dispatch(
            coursePlayerSuccess({
              data: res.coursesDetail,
              hasMoreData: res?.isLoadMore,
            }),
          );
        return dispatch(coursePlayerFailed());
      })
      .catch(() => {
        return dispatch(coursePlayerFailed());
      });
  };
  return { getCourse };
};
