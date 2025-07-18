import { TimeSheetUserInfoInterface } from '../../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../../components';
import { UserImg } from '../../../../../../../ThumbNail';
import CommonStyles from '../../../../../../../../screens/CommonStyles';

export const UserInfo: React.FC<TimeSheetUserInfoInterface> = ({ Obj }) => {
  return (
    <_View style={styles.userDataContainer}>
      <UserImg
        UserInfo={{
          FirstName: Obj.userName,
          LastName: Obj.userName,
          UserImage: Obj.image,
          UserImageColor: whiteThemeColors.primary,
        }}
        size={45}
      />
      <_View style={styles.userNameInfoContainer}>
        <_Text numberOfLines={1} style={[styles.userName]}>
          {Obj.userName}
        </_Text>
        <_Text
          numberOfLines={1}
          style={[styles.textSizeWeight, styles.userRoleTxt]}
        >
          {Obj.roleName}
        </_Text>
      </_View>
    </_View>
  );
};
const styles = StyleSheet.create({
  userDataContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  userNameInfoContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.primaryTextColor,
  },
  textSizeWeight: {
    fontSize: 12,

    fontFamily: CommonStyles.fonts.regular,
  },
  userRoleTxt: {
    width: 140,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.greyDark,
  },
});
