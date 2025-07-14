import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View, _VectorIcons } from '../../../../../../components';
import { UserImg } from '../../../../../ThumbNail';
import CommonStyles from 'screens/CommonStyles';
interface props {
  item: any;
  hanleOnPress: (itm: any) => void;
}
const RenderItem: React.FC<props> = ({ item, hanleOnPress }) => {
  return (
    <Pressable
      onPress={() => hanleOnPress(item)}
      style={styles.itemContainerList}
    >
      <_View style={styles.avatarContainer}>
        <UserImg
          UserInfo={{
            FirstName: item?.name.split(' ')[0],
            LastName: item?.name.split(' ')[1],
            UserImage: item?.image != null && item?.image,
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
      </_View>
      <_View style={styles.nameContainer}>
        <_Text style={styles.nameText}>{item?.name}</_Text>
        <_Text style={styles.roleText}>@{item?.userName}</_Text>
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

export { RenderItem };

const styles = StyleSheet.create({
  itemContainerList: {
    width: '97%',
    height: 90,
    backgroundColor: whiteThemeColors.white + 90,
    marginVertical: 3,
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    alignSelf: 'center',
  },
  avatarContainer: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.white,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  nameContainer: {
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  nameText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 15,
  },
  roleText: {
    color: whiteThemeColors.greyDark,
    fontSize: 10,
    fontFamily: CommonStyles.fonts.regular,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.primary + 30,
    borderRadius: 10,
  },
});
