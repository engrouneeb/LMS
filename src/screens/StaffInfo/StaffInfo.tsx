import React from 'react';
import { useSelector } from 'react-redux';
import { isInstructor } from 'utilities';
import { StaffDetails, StaffList } from '.';
import { Appstate } from '../../reducers/Appstate';

const StaffInfo = () => {
  const { roleName, companyID: franchiseId }: any = useSelector(
    (state: Appstate) => state.User.UserInfo,
  );
  return isInstructor(roleName) ? (
    <StaffDetails />
  ) : (
    <StaffList franchiseId={franchiseId} />
  );
};

export { StaffInfo };
