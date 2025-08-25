import { WagesInterface } from '../../../../interfaces';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../reducers/Appstate';
import { isInstructor } from '../../../../Utilities';
import { _View } from '../../../../components';
import { WagesAdmin, WagesInstructor } from './components';

export const Wages: FC<WagesInterface> = ({ route }) => {
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  return (
    <_View flex={1}>
      {isInstructor(UserData.roleName) ? (
        <WagesInstructor route={route} role={UserData.roleName} />
      ) : (
        <WagesAdmin />
      )}
    </_View>
  );
};
