import { SetupScreenRenderItem } from '../../../../../interfaces';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';
import { _Text, _View } from '../../../../../components';
import { UserImg } from '../../../../ThumbNail';
import CommonStyles from '../../../../../screens/CommonStyles';

export const RenderList: React.FC<SetupScreenRenderItem> = ({
  user,
  index,
  setSelectedUser,
  AddOrEditRef,
}) => {
  let counterOfApprovals = user.userApprovers
    .split(',')
    .filter((item) => item.trim() != '').length;

  const onPressButton = (_selectedUser: any) => {
    AddOrEditRef.current.changeVisibleState();
    setSelectedUser(_selectedUser);
  };
  return (
    <TouchableOpacity
      style={[styles.listContainer]}
      key={index}
      onPress={() => onPressButton(index)}
    >
      <_View style={styles.avatarContainer}>
        <UserImg
          UserInfo={{
            FirstName: user.firstName,
            LastName: user.lastName,
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
      </_View>
      <_View style={styles.listDetailContainer}>
        <_View style={styles.detailTopContainer}>
          <_Text numberOfLines={1} style={styles.userNameTxt}>
            {user.firstName + ' ' + user.lastName}
          </_Text>
          <_Text numberOfLines={1} style={styles.roleTxt}>
            {user.role}
          </_Text>
        </_View>
        <_View style={styles.listBottomContainer}>
          <_Text numberOfLines={1} style={styles.approvalsTxt}>
            {counterOfApprovals == 0
              ? 'No approvals'
              : counterOfApprovals <= 2
              ? `${user.userApprovers}`
              : `${user.userApprovers.split(',')[0]},${
                  user.userApprovers.split(',')[1]
                }`}
            {counterOfApprovals > 2 && (
              <_Text
                style={[
                  styles.approvalsTxt,
                  { color: whiteThemeColors.primary },
                ]}
              >
                ,more...
              </_Text>
            )}
          </_Text>
        </_View>
      </_View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '95%',
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    paddingHorizontal: 5,
    alignSelf: 'center',
    marginVertical: 3,
    borderRadius: 20,
    height: 100,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  listDetailContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  detailTopContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  userNameTxt: {
    color: whiteThemeColors.primaryTextColor,
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  roleTxt: {
    fontSize: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
  },
  listBottomContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  approvalsTxt: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
