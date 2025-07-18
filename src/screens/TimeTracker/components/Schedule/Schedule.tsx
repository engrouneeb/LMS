import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../reducers/Appstate';
import { isInstructor } from '../../../../Utilities';
import { getWages } from '../../../../actions/TimeTrackerActions';
import { _Screen } from '../../../../components';
import Screens from '../../../../screenNames';
import { ScheduleUserListView } from './components';
export const Schedule = () => {
  const dispatch = useDispatch();
  const { roleName, userID }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  const navigation: any = useNavigation();

  const checkRoles = (role: any) =>
   !isInstructor(role);
  useEffect(() => {
    dispatch(getWages(userID));
  }, []);
  return (
    <_Screen flex={1} hideTopSafeArea hideBottomSafeArea>
      {checkRoles(roleName) ? (
        <ScheduleUserListView />
      ) : (
        navigation.navigate(Screens.scheduleWeekView.name, {
          userID: userID,
          weekDays: moment.weekdaysShort(),
          date: moment().startOf('week'),
        })
      )}
    </_Screen>
  );
};
