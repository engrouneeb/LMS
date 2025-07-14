import { SetupScreenRenderItemInterface } from 'interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import Switch from 'react-native-switch-pro';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import { UserImg } from '../../../../../../ThumbNail';
import CommonStyles from 'screens/CommonStyles';

export const RenderItem: React.FC<SetupScreenRenderItemInterface> = ({
  item,
  index,
  onSelectApproval,
}) => {
  return (
    <_View key={index + '-' + item.name} style={[styles.itemContainer]}>
      <_View style={styles.avatarContainer}>
        <UserImg
          UserInfo={{
            FirstName: item.name.split(' ')[0],
            LastName: item.name.split(' ')[1],
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
      </_View>
      <_View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <_View style={styles.nameContainer}>
          <_Text numberOfLines={1} style={styles.nameTxt}>
            {item.name}
          </_Text>
        </_View>
        <_View style={styles.switchContainer}>
          <Switch
            value={item.isSelected}
            height={23}
            backgroundActive={whiteThemeColors.assignClassIcons.checkIcon}
            backgroundInactive={whiteThemeColors.assignClassIcons.uncheckIcon}
            onSyncPress={() => onSelectApproval(item, index)}
          />
        </_View>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 3,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: whiteThemeColors.white + 90,
    borderRadius: 20,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    height: 80,
  },
  avatarContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  nameTxt: {
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    color: whiteThemeColors.black,
  },
  switchContainer: {
    flex: 0.5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  cardShadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
