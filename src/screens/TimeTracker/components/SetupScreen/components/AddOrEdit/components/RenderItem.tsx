import { SetupScreenRenderItemInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet, Switch } from 'react-native';
// REMOVED: import Switch from 'react-native-switch-pro';
// REPLACED WITH: React Native's built-in Switch component
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _View } from '../../../../../../../components';
import { UserImg } from '../../../../../../ThumbNail';
import CommonStyles from '../../../../../../CommonStyles';

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
            // REMOVED: height, backgroundActive, backgroundInactive (react-native-switch-pro specific props)
            // REPLACED WITH: React Native Switch standard props
            onValueChange={() => onSelectApproval(item, index)}
            trackColor={{ 
              false: whiteThemeColors.assignClassIcons.uncheckIcon, 
              true: whiteThemeColors.assignClassIcons.checkIcon 
            }}
            thumbColor={item.isSelected ? whiteThemeColors.white : whiteThemeColors.greyDark}
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
