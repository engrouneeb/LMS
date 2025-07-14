import { endpoint } from 'components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import { error } from '../../actions/AsyncStorage';
export const setTodayAttend = (data: any, skip: number, take: number) => ({
  type: 'SET_TODAY_ATTENDENCE',
  data: data,
  skip: skip,
  take: take,
});
interface props {
  userID?: number | null;
}
const LoadStudentForAttendence: React.FC<props> = ({ userID }) => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  useEffect(() => {
    getStudentForAttendance();
  }, []);
  const getStudentForAttendance = () => {
    let url: endpoint = ApiEndpoints.GetClasses;
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    url.params = `?UserID=${userID}&SelectedDate=${date.toISOString()}&Skip=${0}&Take=${10}`;
    Get(url)
      .then((res: any) => {
        if (!res) {
          return dispatch(error(res || 'ERROR'));
        }
        return dispatch(setTodayAttend(res, 0, 10));
      })
      .catch(() => {
        return dispatch(error('ERROR'));
      });
  };
  return <></>;
};

export default React.memo(LoadStudentForAttendence);
