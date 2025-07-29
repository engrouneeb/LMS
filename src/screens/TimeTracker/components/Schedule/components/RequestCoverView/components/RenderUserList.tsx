import {RequestCoverUserRenderListInterface} from '../../../../../../../interfaces';
import React from 'react';
import {Pressable, StyleSheet, Switch} from 'react-native';
import {whiteThemeColors} from '../../../../../../../Utilities';
import {_Text, _View} from '../../../../../../../components';
import {UserImg} from '../../../../../../ThumbNail';

const RenderUserList: React.FC<RequestCoverUserRenderListInterface> = ({
  user,
  index,
  onSelectUser,
}) => {
  return (
    <_View key={index} style={styles.listStyle}>
      <Pressable
        style={styles.userBtn}
        onPress={() => onSelectUser(user?.isSelected, index)}>
        <_View style={{flex: 0.25}}>
          <_View style={styles.listLeftUserIcon}>
            <UserImg
              UserInfo={{
                FirstName: user.fName,
                LastName: user.lName,
                UserImage: '',
                UserImageColor: whiteThemeColors.primary,
              }}
              size={50}
            />
          </_View>
        </_View>
        <_View style={{flex: 1}}>
          <_View style={styles.userBody}>
            <_View style={styles.listBodyTextView}>
              <_Text style={styles.userName}>
                {`${user.fName} ${user.lName}`}
              </_Text>
              <_Text style={styles.userRole}>{user.role}</_Text>
            </_View>

            <Switch
              trackColor={{
                false: whiteThemeColors.assignClassIcons.uncheckIcon,
                true: whiteThemeColors.assignClassIcons.checkIcon,
              }}
              thumbColor={whiteThemeColors.white}
              value={user.isSelected}
              style={{
                alignSelf: 'center',
                transform: [{scaleX: 0.8}, {scaleY: 0.8}],
              }}
              onValueChange={() => onSelectUser(user?.isSelected, index)}
            />
          </_View>
        </_View>
      </Pressable>
    </_View>
  );
};
export {RenderUserList};
const styles = StyleSheet.create({
  listStyle: {
    height: 80,
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.white,
    borderBottomColor: whiteThemeColors.purple,
    marginTop: 5,
    width: '96%',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 2,
  },
  listLeftUserIcon: {
    backgroundColor: whiteThemeColors.greyLite,
    width: 51,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBtn: {
    borderBottomWidth: 0,
    height: '100%',
    width: '90%',
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBody: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.8,
    justifyContent: 'space-between',
  },
  listBodyTextView: {
    flex: 0.9,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    color: whiteThemeColors.textColor.primaryText,
  },
  userRole: {
    color: whiteThemeColors.textColor.themeColorText,
  },
});
