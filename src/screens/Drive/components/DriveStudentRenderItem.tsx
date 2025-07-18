import React from 'react';
import { _Text, _VectorIcons, _View } from '../../../components';
import DrawerScreens from '../../../navigation/Drawer/DrawerScreenNames';
import { Pressable } from 'react-native';
import { UserImg } from '../../ThumbNail';
import { whiteThemeColors } from '../../../Utilities';
import { styles } from '../styles';
import { DriveStudentRenderItemInterface } from '../../../interfaces';

export const DriveStudentRenderItem: React.FC<
  DriveStudentRenderItemInterface
> = ({ item, props,header }) => {
  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate(DrawerScreens.drive.name, {
          studentId: item.studentId,
          header:header
        })
      }
      style={styles.itemContainerList}
    >
      <_View style={styles.avatarContainer}>
        <UserImg
          UserInfo={{
            FirstName: item?.studentName.split(' ')[0][0] || 'Null',
            LastName: item?.studentName.split(' ')[1][0] || 'Null',
            UserImage: item.imageURL,
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
      </_View>
      <_View style={styles.nameContainer}>
        <_Text style={styles.nameText}>{item?.studentName}</_Text>
        <_Text style={styles.roleText}>{item?.role || 'Student'}</_Text>
      </_View>
      <_View style={styles.iconContainer}>
        <_VectorIcons
          type={'MaterialIcons'}
          name={'keyboard-arrow-right'}
          size={25}
          color={whiteThemeColors.white}
        />
      </_View>
    </Pressable>
  );
};
