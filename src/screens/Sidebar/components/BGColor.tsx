import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import DrawerScreens from '../../../DrawerScreens';
import { _Text, _View } from '../../../components';
import { Appstate } from '../../../reducers/Appstate';
import { UserImg } from '../../ThumbNail';
import { styles } from '../styles';

const BGColor = ({navigation}: any) => {
  // const navigation: any = useNavigation();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);

  const ProfileAvatar = useCallback(() => {
    return (
      <UserImg
        UserInfo={{
          FirstName: UserData.firstName,
          LastName: UserData.lastName,
          UserImage: UserData.userImag,
          UserImageColor: UserData.userColor,
        }}
        size={55}
      />
    );
  }, [UserData]);

  const goToProfile = useCallback(() => {
    navigation.navigate(DrawerScreens.profile.name);
  }, []);

  const getUserRole = useCallback(() => {
    return UserData?.roleName?.split(' ')[1];
  }, [UserData]);

  return (
    <_View style={styles.BGColorContainer}>
      <_View style={styles.subContainer}>
        <TouchableOpacity style={styles.touch} onPress={goToProfile}>
          <ProfileAvatar />
          <_View>
            <_Text numberOfLines={2} style={[styles.usernameText]}>
              {UserData?.fullName}
            </_Text>
            <_Text style={[styles.userRoleText]}>{getUserRole()}</_Text>
          </_View>
        </TouchableOpacity>
      </_View>
    </_View>
  );
};
export default BGColor;
