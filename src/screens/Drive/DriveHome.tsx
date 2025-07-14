import React from 'react';
import { isStudent } from 'utilities';
import { DriveStudentList, Drive } from '.';
import { useSelector } from 'react-redux';
const DriveHome = (props: any) => {
  let { roleName, userID } = useSelector((state: any) => state.User.UserInfo);

  return isStudent(roleName) ? (
    <Drive props={props} stdId={userID} />
  ) : (
    <DriveStudentList props={props} />
  );
};

export { DriveHome };
