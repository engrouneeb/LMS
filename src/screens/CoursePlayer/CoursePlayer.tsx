import React from 'react';
import { _View } from '../../components';
import { useSelector } from 'react-redux';
import { CoursePlayerComponent } from '../index';
import { useNavigation } from '@react-navigation/native';
import { Appstate } from '../../reducers/Appstate';

const CoursePlayer = () => {
  const userData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const navigation = useNavigation();
  return (
    <_View style={{ flex: 1 }}>
      <CoursePlayerComponent
        navigation={navigation}
        role={userData.roleName}
        userID={userData.userID}
      />
    </_View>
  );
};
export { CoursePlayer };
